import { Navigation } from '../../../src/navigation';
import Modal from '../../../src/Modal';

describe('navigation', () => {
  it('should has a navigators as an empty object', () => {
    const navigation = new Navigation();
    expect(navigation.navigators).toEqual({});
  });

  it('should has static EVENTS list', () => {
    expect(Navigation.EVENTS).toEqual({
      LOCK: 'lock',
      UNLOCK: 'unlock',
      WILL_BLUR: 'will_blur',
      BLUR: 'blur',
      WILL_FOCUS: 'will_focus',
      FOCUS: 'focus',
      ANDROID_BACK: 'android_back',
    });
  });

  describe('.addNavigators', () => {
    it('should add navigators by their names', () => {
      const navigation = new Navigation();

      const first = new Modal.Navigator('first');
      const second = new Modal.Navigator('second');

      navigation.addNavigators(first, second);

      expect(navigation.navigators).toEqual({
        first,
        second,
      });
    });
  });

  describe('.lock', () => {
    it('should set locked to true', () => {
      const navigation = new Navigation();
      expect(navigation.locked).toBeFalsy();
      navigation.lock();
      expect(navigation.locked).toBeTruthy();
    });

    it('should set increment lock counter', () => {
      const navigation = new Navigation();
      expect(navigation.lockCounter).toBe(0);
      navigation.lock();
      navigation.lock();
      navigation.lock();
      expect(navigation.lockCounter).toBe(3);
    });

    it('should emit lock event', () => {
      const navigation = new Navigation();
      const handler = jest.fn();
      navigation.on('lock', handler);
      navigation.lock();
      navigation.lock();
      navigation.lock();
      expect(handler).toHaveBeenCalledTimes(3);
    });
  });

  describe('.unlock', () => {
    it('should set decrement locked counter', () => {
      const navigation = new Navigation();
      navigation.lockCounter = 3;
      navigation.unlock();
      expect(navigation.lockCounter).toBe(2);
      navigation.unlock();
      expect(navigation.lockCounter).toBe(1);
    });

    it('should set locked to false if counter is 0', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      navigation.lockCounter = 3;
      navigation.unlock();
      expect(navigation.locked).toBeTruthy();
      navigation.unlock();
      expect(navigation.locked).toBeTruthy();
      navigation.unlock();
      expect(navigation.locked).toBeFalsy();
    });

    it('should emit unlock event if counter is 0', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      navigation.lockCounter = 3;

      const handler = jest.fn();
      navigation.on('unlock', handler);

      navigation.unlock();
      navigation.unlock();
      navigation.unlock();

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('.go', () => {
    it('should resolve immediately if navigation is locked', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      expect(navigation.go()).resolves.toBeUndefined();
    });

    it('should lock navigation immediately and unlock at the end', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);

      expect(navigation.locked).toBeFalsy();
      const promise = navigation.go('navigator', 'scene');
      expect(navigation.locked).toBeTruthy();
      await promise;
      expect(navigation.locked).toBeFalsy();
    });

    it('should reject if there is no such navigator', async () => {
      expect.assertions(1);
      try {
        const navigation = new Navigation();
        await navigation.go('anything', 'scene');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should add navigator to history', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      expect(navigation.history).toEqual(['navigator']);
    });

    it('should move navigator to the end in history if it is already exist', async () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const navigator2 = new Modal.Navigator('navigator2');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator1.addScenes(scene1);
      navigator2.addScenes(scene2);
      navigation.addNavigators(navigator1, navigator2);
      await navigation.go('navigator1', 'scene1');
      await navigation.go('navigator2', 'scene2');
      await navigation.go('navigator1', 'scene1');
      expect(navigation.history).toEqual(['navigator2', 'navigator1']);
    });

    it('should run go on the navigator', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      navigator.go = jest.fn();
      await navigation.go('navigator', 'scene');
      expect(navigator.go).toHaveBeenCalledTimes(1);
    });

    it('should push navigator to history after go is completed', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      const promise = navigation.go('navigator', 'scene');
      expect(navigation.history).toEqual([]);
      await promise;
      expect(navigation.history).toEqual(['navigator']);
    });

    it('should emit blur and focus events after go is resolved', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);

      await navigation.go('navigator', 'scene1');

      expect.assertions(10);

      const willBlur = jest.fn();
      const willFocus = jest.fn();

      const promiseWillBlur = new Promise(resolve => {
        navigation.on('will_blur:navigator/scene1', () => {
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1']);
          willBlur();
          resolve();
        });
      });

      const promiseWillFocus = new Promise(resolve => {
        navigation.on('will_focus:navigator/scene2', () => {
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1']);
          willFocus();
          resolve();
        });
      });

      const promiseBlur = new Promise(resolve => {
        navigation.on('blur:navigator/scene1', () => {
          expect(willBlur).toBeCalled();
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1', 'scene2']);
          resolve();
        });
      });

      const promiseFocus = new Promise(resolve => {
        navigation.on('focus:navigator/scene2', () => {
          expect(willFocus).toBeCalled();
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1', 'scene2']);
          resolve();
        });
      });

      await navigation.go('navigator', 'scene2');

      await Promise.all([
        promiseWillBlur,
        promiseWillFocus,
        promiseBlur,
        promiseFocus,
      ]);
    });

    it('should emit events before navigation is unlocked', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);

      await navigation.go('navigator', 'scene1');

      expect.assertions(8);

      const promiseWillBlur = new Promise(resolve => {
        navigation.on('will_blur:navigator/scene1', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseWillFocus = new Promise(resolve => {
        navigation.on('will_focus:navigator/scene2', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseBlur = new Promise(resolve => {
        navigation.on('blur:navigator/scene1', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseFocus = new Promise(resolve => {
        navigation.on('focus:navigator/scene2', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      await navigation.go('navigator', 'scene2');

      await Promise.all([
        promiseWillBlur,
        promiseWillFocus,
        promiseBlur,
        promiseFocus,
      ]);
    });
  });

  describe('.push', () => {
    it('should reject if no such navigator', () => {
      expect.assertions(1);
      try {
        const navigation = new Navigation();
        navigation.push('anything', 'scene');
      } catch (e) {
        expect(e).toBeNull();
      }
    });
    it('should add navigator to the end', () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const navigator2 = new Modal.Navigator('navigator2');
      navigation.addNavigators(navigator1, navigator2);
      navigation.push('navigator1');
      expect(navigation.history).toEqual(['navigator1']);
      navigation.push('navigator2');
      expect(navigation.history).toEqual(['navigator1', 'navigator2']);
    });

    it('should remove navigator from history if it was included', () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const navigator2 = new Modal.Navigator('navigator2');
      navigation.addNavigators(navigator1, navigator2);
      navigation.push('navigator1');
      navigation.push('navigator2');
      navigation.push('navigator1');
      expect(navigation.history).toEqual(['navigator2', 'navigator1']);
    });
  });

  describe('.wait', () => {
    it('should resolves when navigation is unlocked', async () => {
      const navigation = new Navigation();
      expect.assertions(3);
      expect(navigation.wait()).resolves.toBeUndefined();
      navigation.lock();
      const promise = navigation.wait();
      expect(promise).resolves.not.toBeUndefined();
      navigation.unlock();
      expect(promise).resolves.toBeUndefined();
    });
  });

  describe('.back', () => {
    it('should resolve immediately if navigation is locked', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      expect(navigation.back()).resolves.toBeUndefined();
    });

    it('should lock navigation immediately and unlock at the end', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      expect(navigation.locked).toBeFalsy();
      const promise = navigation.back();
      expect(navigation.locked).toBeTruthy();
      await promise;
      expect(navigation.locked).toBeFalsy();
    });

    it('should resolve if history is empty', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      navigation.addNavigators(navigator);
      expect.assertions(1);
      expect(navigation.history).toEqual([]);
      try {
        await navigation.back('navigator');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should call back on the navigator', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      navigator.back = jest.fn();
      await navigation.back('navigator');
      expect(navigator.back).toHaveBeenCalledTimes(1);
    });

    it('should push navigator name if it was provided', async () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const navigator2 = new Modal.Navigator('navigator2');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      const scene3 = new Modal.Scene('scene3');
      navigator1.addScenes(scene1, scene2);
      navigator2.addScenes(scene3);
      navigation.addNavigators(navigator1, navigator2);
      await navigation.go('navigator1', 'scene1');
      await navigation.go('navigator1', 'scene2');
      await navigation.go('navigator2', 'scene3');
      expect(navigation.history).toEqual(['navigator1', 'navigator2']);
      await navigation.back('navigator1');
      expect(navigation.history).toEqual(['navigator2', 'navigator1']);
      expect(navigator1.history).toEqual(['scene1']);
    });

    it('should remove navigator from history if navigator history is empty', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene1');
      await navigation.go('navigator', 'scene2');
      expect(navigation.history).toEqual(['navigator']);
      await navigation.back('navigator');
      expect(navigation.history).toEqual(['navigator']);
      await navigation.back('navigator');
      expect(navigation.history).toEqual([]);
    });

    it('should emit will_blur, will_focus, blur and focus events', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);

      await navigation.go('navigator', 'scene1');
      await navigation.go('navigator', 'scene2');

      expect.assertions(10);

      const willBlur = jest.fn();
      const willFocus = jest.fn();

      const promiseWillBlur = new Promise(resolve => {
        navigation.on('will_blur:navigator/scene2', () => {
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1', 'scene2']);
          willBlur();
          resolve();
        });
      });

      const promiseWillFocus = new Promise(resolve => {
        navigation.on('will_focus:navigator/scene1', () => {
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1', 'scene2']);
          willFocus();
          resolve();
        });
      });

      const promiseBlur = new Promise(resolve => {
        navigation.on('blur:navigator/scene2', () => {
          expect(willBlur).toBeCalled();
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1']);
          resolve();
        });
      });

      const promiseFocus = new Promise(resolve => {
        navigation.on('focus:navigator/scene1', () => {
          expect(willFocus).toBeCalled();
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene1']);
          resolve();
        });
      });

      await navigation.back();

      await Promise.all([
        promiseWillBlur,
        promiseWillFocus,
        promiseBlur,
        promiseFocus,
      ]);
    });

    it('should emit will_blur and blur events', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);

      await navigation.go('navigator', 'scene');

      expect.assertions(5);

      const willBlur = jest.fn();

      const promiseWillBlur = new Promise(resolve => {
        navigation.on('will_blur:navigator/scene', () => {
          expect(navigation.history).toEqual(['navigator']);
          expect(navigator.history).toEqual(['scene']);
          willBlur();
          resolve();
        });
      });

      const promiseBlur = new Promise(resolve => {
        navigation.on('blur:navigator/scene', () => {
          expect(willBlur).toBeCalled();
          expect(navigation.history).toEqual([]);
          expect(navigator.history).toEqual([]);
          resolve();
        });
      });

      await navigation.back();

      await Promise.all([promiseWillBlur, promiseBlur]);
    });

    it('should emit events before navigation is unlocked', async () => {
      const navigation = new Navigation();
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);

      await navigation.go('navigator', 'scene1');
      await navigation.go('navigator', 'scene2');

      expect.assertions(8);

      const promiseWillBlur = new Promise(resolve => {
        navigation.on('will_blur:navigator/scene2', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseWillFocus = new Promise(resolve => {
        navigation.on('will_focus:navigator/scene1', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseBlur = new Promise(resolve => {
        navigation.on('blur:navigator/scene2', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      const promiseFocus = new Promise(resolve => {
        navigation.on('focus:navigator/scene1', async () => {
          expect(navigation.locked).toBe(true);
          await navigation.wait();
          expect(navigation.locked).toBe(false);
          resolve();
        });
      });

      await navigation.back();

      await Promise.all([
        promiseWillBlur,
        promiseWillFocus,
        promiseBlur,
        promiseFocus,
      ]);
    });
  });

  describe('.reset', () => {
    it('should clean history', async () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const scene1 = new Modal.Scene('scene1');
      const navigator2 = new Modal.Navigator('navigator2');
      const scene2 = new Modal.Scene('scene2');
      navigator1.addScenes(scene1);
      navigator2.addScenes(scene2);
      navigation.addNavigators(navigator1, navigator2);
      await navigation.go('navigator1', 'scene1');
      await navigation.go('navigator2', 'scene2');
      expect(navigation.history).toEqual(['navigator1', 'navigator2']);
      await navigation.reset();
      expect(navigation.history).toEqual([]);
    });

    it('should invoke reset on each navigator', async () => {
      const navigation = new Navigation();
      const navigator1 = new Modal.Navigator('navigator1');
      const scene1 = new Modal.Scene('scene1');
      const navigator2 = new Modal.Navigator('navigator2');
      const scene2 = new Modal.Scene('scene2');
      navigator1.addScenes(scene1);
      navigator2.addScenes(scene2);
      navigation.addNavigators(navigator1, navigator2);
      await navigation.go('navigator1', 'scene1');
      await navigation.go('navigator2', 'scene2');
      navigator1.reset = jest.fn();
      navigator2.reset = jest.fn();
      await navigation.reset();
      expect(navigator1.reset).toBeCalled();
      expect(navigator2.reset).toBeCalled();
    });
  });
});
