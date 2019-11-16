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

    const index = this.history.findIndex(it => it === name);
    if (index >= 0) this.history.splice(index, 1);

    const promises = [];
    Object.values(this.scenes).forEach(it => {
      promises.push(it.name === name ? it.show(duration) : it.hide(duration));
    });
    await Promise.all(promises);
    this.history.push(name);
  };

  current = () => this.history[this.history.length - 1];

  back = async duration => {
    if (this.history.length === 0) return Promise.resolve();
    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const promises = [];
    promises.push(scene.hide(duration));
    const newSceneName = this.history[this.history.length - 2];
    const newScene = this.scenes[newSceneName];
    if (!newScene) return Promise.reject();
    promises.push(newScene.show(duration));
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
