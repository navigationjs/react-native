import Param from '../Param';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Param(0, 0);
    this.navigators = [];
  }

  addNavigators = (...navigators) => {
    navigators.forEach(it => this.navigators.push(it.name));
  };

  show = duration => this.active.to(1, duration);
  hide = duration => this.active.to(0, duration);
}
