export default class Navigator {
  constructor({ scenes = {} }) {
    this.scenes = scenes;
    this.disabled = false;
  }

  async push(scene) {
    if (this.disabled) return Promise.resolve();

    this.disabled = true;

    const promises = [];

    Object.values(this.scenes).forEach(it => {
      if (it.active === 1) promises.push(it.backward());
    });

    promises.push(scene.show());

    await Promise.all(promises);

    this.disabled = false;
  }

  async pop() {
    if (this.disabled) return Promise.resolve();

    this.disabled = true;

    const promises = [];

    Object.values(this.scenes).forEach(it => {
      if (it.active === 1) {
        if (it.level === 0) promises.push(it.hide());
        else promises.push(it.forward());
      }
    });

    await Promise.all(promises);

    this.disabled = false;
  }
}
