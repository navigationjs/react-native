export default class Navigator {
  constructor(scenes = {}) {
    this.scenes = scenes;
  }

  push = scene => {
    const promises = [];

    Object.values(this.scenes).forEach(it => {
      if (it.isActive()) promises.push(it.backward());
    });

    promises.push(scene.show());

    return Promise.all(promises);
  };

  pop = () => {
    const promises = [];

    Object.values(this.scenes).forEach(it => {
      if (it.isActive()) {
        if (!it.isDeep()) promises.push(it.hide());
        else promises.push(it.forward());
      }
    });

    return Promise.all(promises);
  };
}
