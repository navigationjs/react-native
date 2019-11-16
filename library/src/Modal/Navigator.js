export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.history = [];
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  current = () => this.history[this.history.length - 1];

  go = async (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const alreadyInHistory = this.history.includes(name);
    if (alreadyInHistory) return Promise.resolve();
    await scene.show(duration);
    this.history.push(name);
  };

  back = async duration => {
    if (this.history.length === 0) return Promise.resolve();
    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    await scene.hide(duration);
    this.history.pop();
  };

  reset = async () => {
    await Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
    this.history = [];
  };
}
