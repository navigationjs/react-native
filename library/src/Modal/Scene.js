import Value from '../Value';

export default class Scene {
  constructor(name) {
    this.name = name;
    this.active = new Value('active');
  }

  show = duration => this.active.to(1, duration);
  hide = duration => this.active.to(0, duration);
}
