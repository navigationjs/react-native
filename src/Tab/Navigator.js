export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => this.scenes[it.name] = it)
  }

  go = (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const promises = Object.values(this.scenes).map(it => it.hide(duration));
    promises.push(scene.show(duration));
    return Promise.all(promises);
  };
}
