import Scene from '../../../src/Modal/Scene';
import Value from '../../../src/Value';

describe('Modal Scene', () => {
  it('should has a name', () => {
    const scene = new Scene('main');
    expect(scene.name).toBe('main');
  });

  it('should has value active', () => {
    const scene = new Scene('main');
    expect(scene.active instanceof Value).toBeTruthy();
    expect(scene.active.name).toBe('active');
  });

  describe('.show', () => {
    it('should change active value', async () => {
      const scene = new Scene('main');
      expect(scene.active._value).toBe(0);
      await scene.show();
      expect(scene.active._value).toBe(1);
    });

    it('should invoke .to method on value with provided duration', async () => {
      const scene = new Scene('main');
      scene.active.to = jest.fn();
      await scene.show(123);
      expect(scene.active.to).toBeCalledWith(1, 123);
    });
  });

  describe('.hide', () => {
    it('should change active value', async () => {
      const scene = new Scene('main');
      await scene.active.to(1);
      expect(scene.active._value).toBe(1);
      await scene.hide();
      expect(scene.active._value).toBe(0);
    });

    it('should invoke .to method on value with provided duration', async () => {
      const scene = new Scene('main');
      scene.active.to = jest.fn();
      await scene.hide(123);
      expect(scene.active.to).toBeCalledWith(0, 123);
    });
  });
});
