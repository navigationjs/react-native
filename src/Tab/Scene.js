import Param from '../Param';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Param(0);
  }

  show = duration => this.active.to(1, duration);
  hide = duration => this.active.to(0, duration);
}
