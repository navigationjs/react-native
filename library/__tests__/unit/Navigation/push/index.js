import { Navigation } from '../../../../src/Navigation';
import Modal from '../../../../src/Modal';

describe('Navigation', () => {
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
});
