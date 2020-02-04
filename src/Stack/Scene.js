import Value from '../Value';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Value('active');
    this.depth = new Value('depth');
  }
  show = duration =>
    Promise.all([this.depth.to(0, duration), this.active.to(1, duration)]);
  hide = duration =>
    Promise.all([this.depth.to(0, duration), this.active.to(0, duration)]);
  dive = (level, duration) => this.depth.to(level, duration);
}
