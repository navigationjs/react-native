import { toKey, fromKey } from '../helpers';

class Navigation {
  static ROOT = '/';

  constructor() {
    this.navigators = {};
    this.graph = {
      [Navigation.ROOT]: [],
    };
    this.history = this.graph[Navigation.ROOT];
  }

  addNavigators = (...navigators) =>
    navigators.forEach(it => (this.navigators[it.name] = it));

  cd = (navigatorNameOrKey, sceneName) => {
    const key =
      navigatorNameOrKey && sceneName
        ? toKey(navigatorNameOrKey, sceneName)
        : navigatorNameOrKey;
    if (this.graph[key] === undefined) this.graph[key] = [];
    this.history = this.graph[key];
  };

  go = (navigatorName, sceneName, duration) => {
    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    const index = this.history.findIndex(it => it === navigatorName);
    if (index >= 0) this.history.splice(index, 1);
    this.history.push(navigatorName);

    return navigator.go(sceneName, duration);
  };

  back = async duration => {
    const name = this.history[this.history.length - 1];
    if (!name) return Promise.resolve();
    const navigator = this.navigators[name];
    await navigator.back(duration);
    if (navigator.history.length === 0) {
      this.history.pop();
    }
  };

  reset = () => {
    this.graph = { [Navigation.ROOT]: [] };
    this.history = this.graph[Navigation.ROOT];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };

  current = (key = Navigation.ROOT, chain = []) => {
    const history = this.graph[key] || [];
    if (history.length === 0) {
      if (key === Navigation.ROOT) return;
      return [...fromKey(key), chain];
    }
    const navigatorName = history[history.length - 1];
    if (!navigatorName) return;
    const navigator = this.navigators[navigatorName];
    if (!navigator) return;
    const sceneName = navigator.current();
    if (!sceneName) return;
    const scene = navigator.scenes[sceneName];
    if (!scene) return;
    const nextKey = toKey(navigatorName, sceneName);
    return this.current(nextKey, [...chain, key]);
  };
}

export default new Navigation();
