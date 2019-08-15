export default class Navigator {
  constructor(scenes = {}) {
    this.scenes = scenes;
  }

  show = name => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    return scene.show();
  };

  hide = name => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    return scene.hide();
  };
}
