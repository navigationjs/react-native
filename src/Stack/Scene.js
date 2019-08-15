import Param from '../Param';

export default class Scene {
  constructor({ active = new Param(0, 300), depth = new Param(0, 300) } = {}) {
    this.active = active;
    this.depth = depth;
  }
  show = () => Promise.all(this.depth.to(0), this.active.to(1));
  hide = () => Promise.all(this.depth.to(0), this.active.to(0));
  backward = () => this.depth.to(this.depth._value + 1);
  forward = () =>
    this.depth.to(this.depth._value === 0 ? 0 : this.depth._value - 1);
  isActive = () => this.active._value === 1;
  isDeep = () => this.depth._value > 0;
}
