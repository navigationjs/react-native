import Navigator from '../../src/Modal/Navigator';
import Scene from '../../src/Modal/Scene';

describe('Modal Navigator', () => {
  it('should has a name', () => {
    const navigator = new Navigator('modals');
    expect(navigator.name).toBe('modals');
  });

  it('should has an empty scenes object', () => {
    const navigator = new Navigator('modals');
    expect(navigator.scenes).toEqual({});
  });

  it('should has an empty history array', () => {
    const navigator = new Navigator('modals');
    expect(navigator.history).toEqual([]);
  });

  describe('.addScenes', () => {
    it('should add scenes', () => {
      const navigator = new Navigator('modals');
      const first = new Scene('first');
      const second = new Scene('second');
      navigator.addScenes(first, second);
      expect(navigator.scenes).toEqual({ first, second });
    });
  });

  describe('.current', () => {
    it('should return last item from history', () => {
      const navigator = new Navigator('modals');
      navigator.history = ['first', 'second'];
      expect(navigator.current()).toBe('second');
    });
  });

  describe('.go', () => {
    it('should reject if no scene exists', async () => {
      const navigator = new Navigator('modals');
      navigator.addScenes(new Scene('menu'));

      expect.assertions(1);
      try {
        await navigator.go('anything');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should not add scene if it is already in history', async () => {
      const navigator = new Navigator('modals');
      navigator.addScenes(new Scene('menu'));
      expect(navigator.history).toEqual([]);
      await navigator.go('menu');
      expect(navigator.history).toEqual(['menu']);
      await navigator.go('menu');
      expect(navigator.history).toEqual(['menu']);
    });

    it('should add scene into history', async () => {
      const navigator = new Navigator('modals');
      navigator.addScenes(new Scene('menu'));
      expect(navigator.history).toEqual([]);
      await navigator.go('menu');
      expect(navigator.history).toEqual(['menu']);
    });

    it('should invoke show on scene', async () => {
      const navigator = new Navigator('modals');
      const scene = new Scene('menu');
      navigator.addScenes(scene);
      scene.show = jest.fn();
      await navigator.go('menu');
      expect(scene.show).toBeCalled();
    });
  });
});
