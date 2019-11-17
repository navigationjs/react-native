import { toId } from '../../../src/helpers';

describe('helpers', () => {
  describe('toId', () => {
    const navigatorName = 'login';
    const sceneName = 'pin';

    it('should stringify navigator and scene names', () => {
      const id = toId(navigatorName, sceneName);
      expect(id).toBe('login/pin');
    });
  });
});
