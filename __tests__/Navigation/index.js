import { Navigation } from '../../src/navigation';
import Modal from '../../src/Modal';
import Stack from '../../src/Stack';

describe('navigation', () => {
  it('should has a navigators as an empty object', () => {
    const navigation = new Navigation();
    expect(navigation.navigators).toEqual({});
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

  describe('.go', () => {
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
      expect(navigator.go.mock.calls.length).toBe(1);
    });
  });

  describe('.back', () => {
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
      expect(navigator.back.mock.calls.length).toBe(1);
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
  });
});
