import Param from '../Param';

export default class Scene {
  active = new Param(0, 300);
  show = () => this.active.to(1);
  hide = () => this.active.to(0);
}
