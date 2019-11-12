import Value from '../Value';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Value('active');
    this.depth = new Value('depth');
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
