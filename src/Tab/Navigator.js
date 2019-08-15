export default class Navigator {
  constructor(scenes = {}) {
    this.scenes = scenes;
  }

  to = name => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const promises = Object.values(this.scenes).map(it => it.hide());
    promises.push(scene.show());
    return Promise.all(promises);
  };
}
