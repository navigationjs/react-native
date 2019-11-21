import { Navigation } from '../../../../src/Navigation';
import Modal from '../../../../src/Modal';

describe('Navigation', () => {
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
});
