import { Navigation } from '../../../../src/Navigation';
import Modal from '../../../../src/Modal';

describe('Navigation', () => {
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
