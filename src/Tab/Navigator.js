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
    const promises = [];
    Object.values(this.scenes).forEach(it => {
      promises.push(it.name === name ? it.show(duration) : it.hide(duration));
    });
    await Promise.all(promises);
    this.history.push(name);
  };

  current = () => this.history.current();

  back = async duration => {
    if (this.history.isEmpty()) return Promise.resolve();
    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const promises = [];
    promises.push(scene.hide(duration));
    const newSceneName = this.history.chain[this.history.chain.length - 2];
    const newScene = this.scenes[newSceneName];
    if (!newScene) return Promise.reject();
    promises.push(newScene.show(duration));
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
