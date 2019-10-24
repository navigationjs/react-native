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

    this.history.push(name);
    return scene.show(duration);
  };

  canBack = () => this.history.length > 0;

  back = async duration => {
    if (!this.canBack()) return Promise.resolve();
    const name = this.history[this.history.length - 1];
    if (!name) return Promise.resolve();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    this.history.pop();
    return scene.hide(duration);
  };

  reset = () => {
    this.history = [];
    return Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
  };
}
