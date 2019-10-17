export default class Navigation {
  constructor() {
    this.navigators = {};
    this.chain = [];
  }

  addNavigators = (...navigators) => {
    navigators.forEach(it => (this.navigators[it.name] = it));
  };

  go = (name, sceneName, duration) => {
    const navigator = this.navigators[name];
    if (!navigator) return Promise.reject();

    this.chain = this.chain.filter(it => it === name);
    this.chain.push(name);

    return navigator.go(sceneName, duration);
  };

  back = duration => {
    const name = this.chain.pop();
    if (!name) return Promise.resolve();
    const navigator = this.navigators[name];
    return navigator.back(duration);
  };

  reset = () => {
    this.chain = [];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };
}
