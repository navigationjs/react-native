import { History } from '@navigationjs/core';

export default class Navigator {
  constructor(name) {
    this.name = name;
    this.scenes = {};
    this.history = new History(this.name);
  }

  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  removeScenes = (...scenes) => {
    scenes.forEach(it => delete this.scenes[it]);
  };

  go = async (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    const alreadyInHistory = this.history.current() === name;
    if (alreadyInHistory) return Promise.resolve();

    const promises = this.history.chain.map((sceneName, index) => {
      const scene = this.scenes[sceneName];
      const level = this.history.chain.length - index - 1;
      return scene.dive(level + 1, duration);
    });

    promises.push(scene.show(duration));

    await Promise.all(promises);
    this.history.push(name);
  };

  current = () => this.history.current();

  back = async duration => {
    if (this.history.isEmpty()) return Promise.resolve();

    const promises = [];

    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();

    promises.push(scene.hide(duration));

    this.history.chain.forEach((sceneName, index) => {
      const scene = this.scenes[sceneName];
      const level = this.history.chain.length - index - 1;
      promises.push(scene.dive(level - 1, duration));
    });

    await Promise.all(promises);
    this.history.pop();
  };

  reset = async () => {
    await Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
    this.history = new History(this.name);
  };
}
