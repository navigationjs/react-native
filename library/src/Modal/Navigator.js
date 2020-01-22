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

  current = () => this.history.current();

  go = async (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const alreadyInHistory = this.history.current() === name;
    if (alreadyInHistory) return Promise.resolve();
    await scene.show(duration);
    this.history.push(name);
  };

  back = async duration => {
    if (this.history.isEmpty()) return Promise.resolve();
    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    await scene.hide(duration);
    this.history.pop();
  };

  reset = async () => {
    await Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide(0))
    );
    this.history = new History(this.name);
  };
}
