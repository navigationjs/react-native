import { Navigation } from '../../../../src/Navigation';
import Modal from '../../../../src/Modal';

describe('Navigation', () => {
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
});
