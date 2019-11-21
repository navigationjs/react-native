import { Navigation } from '../../../../src/Navigation';
import Modal from '../../../../src/Modal';

describe('Navigation', () => {
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
});
