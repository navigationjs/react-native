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

  back = async duration => {
    if (this.chain.length <= 1) return Promise.resolve();

    const name = this.chain[this.chain.length - 1];
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    for (let index = scene.navigators.length - 1; index >= 0; index--) {
      const navigator = navigation.navigators[scene.navigators[index]];
      if (navigator.inTheBeginning()) continue;
      return navigator.back();
    }

    const promises = [];
    this.chain.pop();
    promises.push(scene.hide(duration));
    const newSceneName = this.chain[this.chain.length - 1];
    const newScene = this.scenes[newSceneName];
    if (!newScene) return Promise.reject();
    promises.push(newScene.show(duration));
    return Promise.all(promises);
  };

  inTheBeginning = () => this.chain.length <= 1;

  reset = () =>
    Promise.all(Object.keys(this.scenes).map(key => this.scenes[key].hide(0)));
}
