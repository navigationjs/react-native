import Focus from '../Focus';
import { toId } from '../helpers';

export class Navigation {
  constructor() {
    this.navigators = {};
    this.history = [];
  }

  addNavigators = (...navigators) =>
    navigators.forEach(it => (this.navigators[it.name] = it));

  go = async (navigatorName, sceneName, duration) => {
    const prevId = this.currentId();

    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    this.push(navigatorName);

    if (sceneName) await navigator.go(sceneName, duration);

    const nextId = this.currentId();

    if (prevId !== nextId) {
      if (Focus.handlers[nextId]) await Focus.handlers[nextId](prevId, nextId);
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

    const prevId = this.currentId();

    await navigator.back(duration);
    if (navigator.history.length === 0) this.history.pop();

    const nextId = this.currentId();

    if (prevId !== nextId) {
      if (Focus.handlers[nextId]) await Focus.handlers[nextId](prevId, nextId);
    }

    return Promise.resolve();
  };

  reset = () => {
    this.history = [];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };

  current = () => this.history[this.history.length - 1];

  currentId = () => {
    const currentNavigator = this.current();
    if (!currentNavigator) return;
    const currentScene = this.navigators[currentNavigator].current();
    if (!currentScene) return;
    return toId(currentNavigator, currentScene);
  };
}

export default new Navigation();
