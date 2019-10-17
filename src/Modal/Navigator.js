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

    const alreadyInChain = this.chain.includes(name);
    if (alreadyInChain) return Promise.resolve();

    this.chain.push(name);
    return scene.show(duration);
  };

  back = async duration => {
    const name = this.chain[this.chain.length - 1];
    if (!name) return Promise.resolve();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    for (let index = scene.navigators.length - 1; index >= 0; index--) {
      const navigator = navigation.navigators[scene.navigators[index]];
      if (navigator.inTheBeginning()) continue;
      return navigator.back();
    }

    this.chain.pop();
    return scene.hide(duration);
  };

  inTheBeginning = () => this.chain.length === 0;

  reset = () => {
    this.chain = [];
    return Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
  };
}
