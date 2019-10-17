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

    const promises = this.chain.map(sceneName => {
      const scene = this.scenes[sceneName];
      return scene.backward(duration);
    });

    this.chain.push(name);
    promises.push(scene.show(duration));

    return Promise.all(promises);
  };

  back = async duration => {
    if (this.chain.length <= 1) return Promise.resolve();

    const promises = [];

    const name = this.chain[this.chain.length - 1];
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    for (let index = scene.navigators.length - 1; index >= 0; index--) {
      const navigator = navigation.navigators[scene.navigators[index]];
      if (navigator.chain.length === 0) continue;
      return navigator.back();
    }

    this.chain.pop();
    promises.push(scene.hide(duration));

    this.chain.forEach(sceneName => {
      const scene = this.scenes[sceneName];
      promises.push(scene.forward(duration));
    });

    return Promise.all(promises);
  };

  inTheBeginning = () => this.chain.length <= 1;

  reset = () => {
    this.chain = [];
    return Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
  };
}
