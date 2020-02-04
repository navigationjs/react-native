import Stack from '../../../src/Stack';

describe('Stack.Navigator', () => {
  it('should has a name', () => {
    const navigator = new Stack.Navigator('navigator');
    expect(navigator.name).toBe('navigator');
  });

  it('should has an empty scenes object', () => {
    const navigator = new Stack.Navigator('navigator');
    expect(navigator.scenes).toEqual({});
  });

  it('should has an empty history array', () => {
    const navigator = new Stack.Navigator('navigator');
    expect(navigator.history.isEmpty()).toBeTruthy();
  });

  describe('.addScenes', () => {
    it('should add scenes by names', () => {
      const navigator = new Stack.Navigator('navigator');
      const first = new Stack.Scene('first');
      const second = new Stack.Scene('second');
      navigator.addScenes(first, second);
      expect(navigator.scenes).toEqual({ first, second });
    });
  });

  describe('.removeScenes', () => {
    it('should remove scenes by names', () => {
      const navigator = new Stack.Navigator('navigator');
      const first = new Stack.Scene('first');
      const second = new Stack.Scene('second');
      const third = new Stack.Scene('third');
      navigator.addScenes(first, second, third);
      expect(navigator.scenes).toEqual({ first, second, third });
      navigator.removeScenes('first');
      expect(navigator.scenes).toEqual({ second, third });
      navigator.removeScenes('second', 'third');
      expect(navigator.scenes).toEqual({});
    });
  });

  describe('.current', () => {
    it('should call current from history', () => {
      const navigator = new Stack.Navigator('navigator');
      navigator.history.current = jest.fn();
      navigator.current();
      expect(navigator.history.current).toHaveBeenCalledTimes(1);
    });
  });

  describe('.go', () => {
    it('should reject if no scene exists', async () => {
      const navigator = new Stack.Navigator('navigator');
      navigator.addScenes(new Stack.Scene('scene'));

      expect.assertions(1);
      try {
        await navigator.go('anything');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should dive all scenes in history on one level', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene1 = new Stack.Scene('scene1');
      const scene2 = new Stack.Scene('scene2');
      const scene3 = new Stack.Scene('scene3');
      navigator.addScenes(scene1, scene2, scene3);
      await navigator.go('scene1');
      await navigator.go('scene2');
      scene1.dive = jest.fn();
      scene2.dive = jest.fn();
      await navigator.go('scene3', 123);
      expect(scene1.dive).toBeCalledWith(2, 123);
      expect(scene2.dive).toBeCalledWith(1, 123);
    });

    it('should invoke show on scene with provided duration', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene = new Stack.Scene('scene');
      navigator.addScenes(scene);
      scene.show = jest.fn();
      await navigator.go('scene', 100);
      expect(scene.show).toBeCalledWith(100);
    });

    it('should add scene into history', async () => {
      const navigator = new Stack.Navigator('navigator');
      navigator.addScenes(new Stack.Scene('scene'));
      expect(navigator.history.isEmpty()).toBeTruthy();
      await navigator.go('scene');
      expect(navigator.history.chain).toEqual(['scene']);
    });

    it('should add scene after animation is done', async () => {
      const navigator = new Stack.Navigator('navigator');
      navigator.addScenes(new Stack.Scene('scene'));
      expect.assertions(2);
      const promise = navigator.go('scene');
      expect(navigator.history.isEmpty()).toBeTruthy();
      await promise;
      expect(navigator.history.chain).toEqual(['scene']);
    });
  });

  describe('.back', () => {
    it('should resolve if history is empty', async () => {
      const navigator = new Stack.Navigator('navigator');
      expect.assertions(1);
      expect(navigator.history.isEmpty()).toBeTruthy();
      try {
        await navigator.back();
      } catch (e) {
        expect(e).toEqual(expect.anything());
      }
    });

    it('should invoke scene hide with provided duration', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene = new Stack.Scene('scene');
      navigator.addScenes(scene);
      await navigator.go('scene');
      scene.hide = jest.fn();
      expect.assertions(1);
      await navigator.back(123);
      expect(scene.hide).toBeCalledWith(123);
    });

    it('should dive all scenes in history on one level', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene1 = new Stack.Scene('scene1');
      const scene2 = new Stack.Scene('scene2');
      const scene3 = new Stack.Scene('scene3');
      navigator.addScenes(scene1, scene2, scene3);
      await navigator.go('scene1');
      await navigator.go('scene2');
      await navigator.go('scene3');
      scene1.dive = jest.fn();
      scene2.dive = jest.fn();
      await navigator.back(123);
      expect(scene2.dive).toBeCalledWith(0, 123);
      expect(scene1.dive).toBeCalledWith(1, 123);
    });

    it('should remove scene after animation is done', async () => {
      const navigator = new Stack.Navigator('navigator');
      navigator.addScenes(new Stack.Scene('scene'));
      await navigator.go('scene');
      expect.assertions(2);
      const promise = navigator.back();
      expect(navigator.history.chain).toEqual(['scene']);
      await promise;
      expect(navigator.history.isEmpty()).toBeTruthy();
    });
  });

  describe('.reset', () => {
    it('should call hide for all scenes with duration 0', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene1 = new Stack.Scene('scene1');
      const scene2 = new Stack.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      await navigator.go('scene1');
      await navigator.go('scene2');
      scene1.hide = jest.fn();
      scene2.hide = jest.fn();
      await navigator.reset();
      expect(scene1.hide).toBeCalledWith(0);
      expect(scene2.hide).toBeCalledWith(0);
    });

    it('should clean up history after all scenes are hidden', async () => {
      const navigator = new Stack.Navigator('navigator');
      const scene1 = new Stack.Scene('scene1');
      const scene2 = new Stack.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      await navigator.go('scene1');
      await navigator.go('scene2');
      const promise = navigator.reset();
      expect(navigator.history.chain).toEqual(['scene1', 'scene2']);
      await promise;
      expect(navigator.history.isEmpty()).toBeTruthy();
    });
  });
});
