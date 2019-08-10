export default class Navigator {
  constructor(scenes = {}) {
    this.scenes = scenes;
  }

  to = scene => {
    const promises = Object.values(this.scenes).map(it => it.hide());
    promises.push(scene.show());
    return Promise.all(promises);
  };
}
