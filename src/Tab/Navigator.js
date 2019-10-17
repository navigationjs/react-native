import navigation from '../Navigation';

export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.chain = [];
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  go = (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    this.chain = this.chain.filter(it => it !== name);
    this.chain.push(name);

    const promises = [];
    Object.values(this.scenes).forEach(it => {
      promises.push(it.name === name ? it.show(duration) : it.hide(duration));
    });
    return Promise.all(promises);
  };

  canBack = () => this.chain.length > 1;

  back = async duration => {
    if (!this.canBack()) return Promise.resolve();
    const name = this.chain[this.chain.length - 1];
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const promises = [];
    this.chain.pop();
    promises.push(scene.hide(duration));
    const newSceneName = this.chain[this.chain.length - 1];
    const newScene = this.scenes[newSceneName];
    if (!newScene) return Promise.reject();
    promises.push(newScene.show(duration));
    return Promise.all(promises);
  };

  reset = () =>
    Promise.all(Object.keys(this.scenes).map(key => this.scenes[key].hide(0)));
}
