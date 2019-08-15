import Param from '../Param';

export default class Scene {
  constructor({ active = new Param(0, 300) } = {}) {
    this.active = active;
  }
  show = () => this.active.to(1);
  hide = () => this.active.to(0);
}
