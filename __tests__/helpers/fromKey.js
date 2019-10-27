import { fromKey } from '../../src/helpers';

describe('helpers', () => {
  describe('fromKey', () => {
    it('should parsse key into array of navigator and scene', () => {
      const key = '["login","pin"]';
      const [navigator, scene] = fromKey(key);
      expect(navigator).toBe('login');
      expect(scene).toBe('pin');
    });
  });
});
