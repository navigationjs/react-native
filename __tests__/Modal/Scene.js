import Scene from '../../src/Modal/Scene';
import Param from '../../src/Param';

describe('Modal Scene', () => {
  const scene = new Scene('main');

  it('should has a name', () => {
    expect(scene.name).toBe('main');
  });

  it('should has param active', () => {
    expect(scene.active instanceof Param).toBeTruthy();
  });

  it('should has a method `show` that changes active param', async () => {
    expect(scene.active._value).toBe(0);
    await scene.show();
    expect(scene.active._value).toBe(1);
  });

  it('should has a method `hide` that changes active param', async () => {
    scene.active.to(1);
    expect(scene.active._value).toBe(1);
    await scene.hide();
    expect(scene.active._value).toBe(0);
  });
});
