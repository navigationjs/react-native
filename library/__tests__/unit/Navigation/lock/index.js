import { Navigation } from '../../../../src/Navigation';

describe('Navigation', () => {
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
});
