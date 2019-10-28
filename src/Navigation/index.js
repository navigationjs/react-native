import Focus from '../Focus';
import { toKey } from '../helpers';

export class Navigation {
  constructor() {
    this.navigators = {};
    this.history = [];
  }

  addNavigators = (...navigators) =>
    navigators.forEach(it => (this.navigators[it.name] = it));

  go = async (navigatorName, sceneName, duration) => {
    const prevKey = this.currentKey();

    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    this.push(navigatorName);

    if (sceneName) await navigator.go(sceneName, duration);

    const nextKey = this.currentKey();

    if (prevKey !== nextKey) {
      if (Focus.handlers[nextKey])
        await Focus.handlers[nextKey](prevKey, nextKey);
    }

    return Promise.resolve();
  };

  push = navigatorName => {
    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    const index = this.history.findIndex(it => it === navigatorName);
    if (index >= 0) this.history.splice(index, 1);
    this.history.push(navigatorName);
  };

  back = async (navigatorName, duration) => {
    const navigator = this.navigators[navigatorName || this.current()];
    if (!navigator) return Promise.reject();

    const prevKey = this.currentKey();

    await navigator.back(duration);
    if (navigator.history.length === 0) this.history.pop();

    const nextKey = this.currentKey();

    if (prevKey !== nextKey) {
      if (Focus.handlers[nextKey])
        await Focus.handlers[nextKey](prevKey, nextKey);
    }

    return Promise.resolve();
  };

  reset = () => {
    this.graph = { [Navigation.ROOT]: [] };
    this.history = this.graph[Navigation.ROOT];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };

  current = () => this.history[this.history.length - 1];

  currentKey = () => {
    const currentNavigator = this.current();
    if (!currentNavigator) return;
    const currentScene = this.navigators[currentNavigator].current();
    if (!currentScene) return;
    return toKey(currentNavigator, currentScene);
  };
}

export default new Navigation();
