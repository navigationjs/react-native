import { fromId } from '../../src/helpers';

describe('helpers', () => {
  describe('fromId', () => {
    it('should parse id into array of navigator and scene', () => {
      const id = 'login/pin';
      const [navigator, scene] = fromId(id);
      expect(navigator).toBe('login');
      expect(scene).toBe('pin');
    });
  });
});
