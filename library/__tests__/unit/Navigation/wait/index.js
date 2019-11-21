import { Navigation } from '../../../../src/Navigation';

describe('Navigation', () => {
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
});
