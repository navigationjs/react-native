import { toKey } from '../../src/helpers';

describe('helpers', () => {
  describe('toKey', () => {
    const navigatorName = 'login';
    const sceneName = 'pin';

    it('should stringify navigator and scene names', () => {
      const key = toKey(navigatorName, sceneName);
      expect(key).toBe('["login","pin"]');
    });
  });
});
