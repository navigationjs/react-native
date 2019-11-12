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

  current = () => this.history[this.history.length - 1];

  back = async duration => {
    if (this.history.length === 0) return Promise.resolve();
    const name = this.current();
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