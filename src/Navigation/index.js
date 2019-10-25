class Navigation {
  constructor() {
    this.navigators = {};
    this.history = [];
  }

  addNavigators = (...navigators) => {
    navigators.forEach(it => (this.navigators[it.name] = it));
  };

  go = (name, sceneName, duration) => {
    const navigator = this.navigators[name];
    if (!navigator) return Promise.reject();

    this.history = this.history.filter(it => it !== name);
    this.history.push(name);

    return navigator.go(sceneName, duration);
  };

  back = async duration => {
    const name = this.history[this.history.length - 1];
    if (!name) return Promise.resolve();
    const navigator = this.navigators[name];
    await navigator.back(duration);
    if (!navigator.canBack()) this.history.pop();
  };

  reset = () => {
    this.history = [];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };

  current = () => {
    const navigatorName = this.history[this.history.length - 1];
    if (!navigatorName) return;
    const navigator = this.navigators[navigatorName];
    if (!navigator) return;
    const sceneName = navigator.history[navigator.history.length - 1];
    if (!sceneName) return;
    const scene = navigator.scenes[sceneName];
    if (!scene) return;
    return [navigatorName, sceneName];
  };
}

export default new Navigation();
