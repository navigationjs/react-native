export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.history = [];
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  go = (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    const alreadyInHistory = this.history.includes(name);
    if (alreadyInHistory) return Promise.resolve();

    const promises = this.history.map(sceneName => {
      const scene = this.scenes[sceneName];
      return scene.backward(duration);
    });

    this.history.push(name);
    promises.push(scene.show(duration));

    return Promise.all(promises);
  };

  canBack = () => this.history.length > 1;

  back = async duration => {
    if (!this.canBack()) return Promise.resolve();

    const promises = [];

    const name = this.history[this.history.length - 1];
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    this.history.pop();
    promises.push(scene.hide(duration));

    this.history.forEach(sceneName => {
      const scene = this.scenes[sceneName];
      promises.push(scene.forward(duration));
    });

    return Promise.all(promises);
  };

  reset = () => {
    this.history = [];
    return Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
  };
}
