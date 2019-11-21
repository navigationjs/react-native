import { Navigation } from '../../../../src/Navigation';

describe('Navigation', () => {
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
});
