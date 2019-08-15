export default class Navigation {
  constructor() {
    this.navigators = {};
    this.chain = [];
  }

  addNavigators = (...navigators) => {
    navigators.forEach(it => (this.navigators[it.name] = it));
  };
}
