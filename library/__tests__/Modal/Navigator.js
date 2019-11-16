import Modal from '../../src/Modal';

describe('Modal.Navigator', () => {
  it('should has a name', () => {
    const navigator = new Modal.Navigator('navigator');
    expect(navigator.name).toBe('navigator');
  });

  it('should has an empty scenes object', () => {
    const navigator = new Modal.Navigator('navigator');
    expect(navigator.scenes).toEqual({});
  });

  it('should has an empty history array', () => {
    const navigator = new Modal.Navigator('navigator');
    expect(navigator.history).toEqual([]);
  });

  describe('.addScenes', () => {
    it('should add scenes by names', () => {
      const navigator = new Modal.Navigator('navigator');
      const first = new Modal.Scene('first');
      const second = new Modal.Scene('second');
      navigator.addScenes(first, second);
      expect(navigator.scenes).toEqual({ first, second });
    });
  });

  describe('.current', () => {
    it('should return last item from history', () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.history = ['first', 'second'];
      expect(navigator.current()).toBe('second');
    });
  });

  describe('.go', () => {
    it('should reject if no scene exists', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.addScenes(new Modal.Scene('scene'));

      expect.assertions(1);
      try {
        await navigator.go('anything');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should not add scene if it is already in history', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.addScenes(new Modal.Scene('scene'));
      expect(navigator.history).toEqual([]);
      await navigator.go('scene');
      expect(navigator.history).toEqual(['scene']);
      await navigator.go('scene');
      expect(navigator.history).toEqual(['scene']);
    });

    it('should invoke show on scene with provided duration', async () => {
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      scene.show = jest.fn();
      await navigator.go('scene', 100);
      expect(scene.show).toBeCalledWith(100);
    });

    it('should add scene into history', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.addScenes(new Modal.Scene('scene'));
      expect(navigator.history).toEqual([]);
      await navigator.go('scene');
      expect(navigator.history).toEqual(['scene']);
    });

    it('should add scene after animation is done', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.addScenes(new Modal.Scene('scene'));
      expect.assertions(2);
      const promise = navigator.go('scene');
      expect(navigator.history).toEqual([]);
      await promise;
      expect(navigator.history).toEqual(['scene']);
    });
  });

  describe('.back', () => {
    it('should resolve if history is empty', async () => {
      const navigator = new Modal.Navigator('navigator');
      expect.assertions(1);
      expect(navigator.history).toEqual([]);
      try {
        await navigator.back();
      } catch (e) {
        expect(e).toEqual(expect.anything());
      }
    });

    it('should reject if no such scene exists', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.history = ['anything'];
      expect.assertions(1);

      try {
        await navigator.back();
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should invoke scene hide with provided duration', async () => {
      const navigator = new Modal.Navigator('navigator');
      const scene = new Modal.Scene('scene');
      navigator.addScenes(scene);
      await navigator.go('scene');
      scene.hide = jest.fn();
      expect.assertions(1);
      await navigator.back(123);
      expect(scene.hide).toBeCalledWith(123);
    });

    it('should remove scene after animation is done', async () => {
      const navigator = new Modal.Navigator('navigator');
      navigator.addScenes(new Modal.Scene('scene'));
      await navigator.go('scene');
      expect.assertions(2);
      const promise = navigator.back();
      expect(navigator.history).toEqual(['scene']);
      await promise;
      expect(navigator.history).toEqual([]);
    });
  });

  describe('.reset', () => {
    it('should call hide for all scenes with duration 0', async () => {
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
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
      const navigator = new Modal.Navigator('navigator');
      const scene1 = new Modal.Scene('scene1');
      const scene2 = new Modal.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      await navigator.go('scene1');
      await navigator.go('scene2');
      const promise = navigator.reset();
      expect(navigator.history).toEqual(['scene1', 'scene2']);
      await promise;
      expect(navigator.history).toEqual([]);
    });
  });
});
