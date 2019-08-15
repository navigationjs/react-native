export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.chain = [];
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => this.scenes[it.name] = it)
  }

  go = (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    this.chain.push(name)
    return scene.show(duration);
  };

  back = (duration) => {
    const name = this.chain.pop();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    return scene.hide(duration);
  };
}
