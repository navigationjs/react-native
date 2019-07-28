export default class Navigator {
  constructor({ scenes = {} }) {
    this.scenes = scenes;
  }

  to(scene) {
    Object.values(this.scenes).forEach(it => it.hide());
    scene.show();
  }
}
