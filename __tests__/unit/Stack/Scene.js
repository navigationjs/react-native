import Scene from '../../../src/Stack/Scene';
import Value from '../../../src/Value';

describe('Stack Scene', () => {
  it('should has a name', () => {
    const scene = new Scene('main');
    expect(scene.name).toBe('main');
  });

  it('should has value active and depth', () => {
    const scene = new Scene('main');
    expect(scene.active instanceof Value).toBeTruthy();
    expect(scene.active.name).toBe('active');
    expect(scene.depth instanceof Value).toBeTruthy();
    expect(scene.depth.name).toBe('depth');
  });

  describe('.show', () => {
    it('should invoke .to method on value with provided duration', async () => {
      const scene = new Scene('main');
      scene.active.to = jest.fn();
      scene.depth.to = jest.fn();
      await scene.show(123);
      expect(scene.active.to).toBeCalledWith(1, 123);
      expect(scene.depth.to).toBeCalledWith(0, 123);
    });

    it('should change active and depth values', async () => {
      const scene = new Scene('main');
      await scene.depth.to(1);
      expect(scene.active._value).toBe(0);
      expect(scene.depth._value).toBe(1);
      await scene.show();
      expect(scene.active._value).toBe(1);
      expect(scene.depth._value).toBe(0);
    });
  });

  describe('.hide', () => {
    it('should invoke .to method on value with provided duration', async () => {
      const scene = new Scene('main');
      scene.active.to = jest.fn();
      scene.depth.to = jest.fn();
      await scene.hide(123);
      expect(scene.active.to).toBeCalledWith(0, 123);
      expect(scene.depth.to).toBeCalledWith(0, 123);
    });

    it('should change active and depth values', async () => {
      const scene = new Scene('main');
      await scene.depth.to(1);
      await scene.active.to(1);
      expect(scene.active._value).toBe(1);
      expect(scene.depth._value).toBe(1);
      await scene.hide();
      expect(scene.active._value).toBe(0);
      expect(scene.depth._value).toBe(0);
    });
  });

  describe('.dive', () => {
    it('should change depth value', async () => {
      const scene = new Scene('main');
      scene.depth.to = jest.fn();
      await scene.dive(5, 300);
      expect(scene.depth.to).toBeCalledWith(5, 300);
    });
  });
});
