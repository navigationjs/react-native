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

  back = duration => {
    const name = this.chain.pop();
    if (!name) return Promise.resolve();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    return scene.hide(duration);
  };

  reset = () => {
    this.chain = [];
    return Promise.all(Object.keys(this.scenes).map(key => this.scenes[key].hide(0)))
  }
}
