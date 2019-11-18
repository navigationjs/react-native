export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.history = [];
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  go = async (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    const alreadyInHistory = this.history.includes(name);
    if (alreadyInHistory) return Promise.resolve();

    const promises = this.history.map((sceneName, index) => {
      const scene = this.scenes[sceneName];
      const level = this.history.length - index - 1;
      return scene.dive(level + 1, duration);
    });

    promises.push(scene.show(duration));

    await Promise.all(promises);
    this.history.push(name);
  };

  current = () => this.history[this.history.length - 1];

  back = async duration => {
    if (this.history.length === 0) return Promise.resolve();

    const promises = [];

    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    promises.push(scene.hide(duration));

    this.history.forEach((sceneName, index) => {
      const scene = this.scenes[sceneName];
      const level = this.history.length - index - 1;
      promises.push(scene.dive(level - 1, duration));
    });

    await Promise.all(promises);
    this.history.pop();
  };

  reset = async () => {
    await Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
    this.history = [];
  };
}
