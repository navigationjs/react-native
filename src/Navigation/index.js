class Navigation {
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

    this.chain = this.chain.filter(it => it !== name);
    this.chain.push(name);

    return navigator.go(sceneName, duration);
  };

  back = async duration => {
    const name = this.chain[this.chain.length - 1];
    if (!name) return Promise.resolve();
    const navigator = this.navigators[name];
    await navigator.back(duration);
    if (navigator.inTheBeginning()) this.chain.pop();
  };

  reset = () => {
    this.chain = [];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };
}

export default new Navigation();
