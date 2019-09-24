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

  back = duration => {
    const promises = [];

    const name = this.chain.pop();
    if (!name) return Promise.resolve();
    const scene = this.scenes[name];
    promises.push(scene.hide(duration));

    this.chain.forEach(sceneName => {
      const scene = this.scenes[sceneName];
      promises.push(scene.forward(duration));
    });

    return Promise.all(promises);
  };

  reset = () => {
    this.chain = [];
    return Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
  };
}
