import Param from '../Param';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Param(0, 300);
    this.depth = new Param(0, 300);
  }
  show = duration =>
    Promise.all(this.depth.to(0, duration), this.active.to(1, duration));
  hide = duration =>
    Promise.all(this.depth.to(0, duration), this.active.to(0, duration));
  backward = duration => this.depth.to(this.depth._value + 1, duration);
  forward = duration =>
    this.depth.to(
      this.depth._value === 0 ? 0 : this.depth._value - 1,
      duration
    );
}
