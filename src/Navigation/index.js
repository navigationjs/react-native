import { toId } from '../helpers';
import Emitter from './Emitter';

export class Navigation {
  static EVENTS = {
    BLUR: 'blur',
    FOCUS: 'focus',
    ANDROID_BACK: 'android_back',
  };

  constructor() {
    this.navigators = {};
    this.history = [];
    this.emitter = new Emitter();

    // aliases
    this.on = this.emitter.on;
    this.off = this.emitter.off;
    this.emit = this.emitter.emit;
  }

  addNavigators = (...navigators) =>
    navigators.forEach(it => (this.navigators[it.name] = it));

  go = async (navigatorName, sceneName, duration) => {
    const prevId = this.id();

    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    this.push(navigatorName);

    if (sceneName) await navigator.go(sceneName, duration);

    const id = this.id();

    if (prevId !== id) {
      this.emit(`${Navigation.EVENTS.BLUR}${Emitter.SEPARATOR}${prevId}`, {
        id: prevId,
      });
      this.emit(`${Navigation.EVENTS.FOCUS}${Emitter.SEPARATOR}${id}`, { id });
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

    const prevId = this.id();

    await navigator.back(duration);
    if (navigator.history.length === 0) this.history.pop();

    const id = this.id();

    if (prevId !== id) {
      this.emit(`${Navigation.EVENTS.BLUR}${Emitter.SEPARATOR}${prevId}`, {
        id: prevId,
      });
      this.emit(`${Navigation.EVENTS.FOCUS}${Emitter.SEPARATOR}${id}`, { id });
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

  id = () => {
    const currentNavigator = this.current();
    if (!currentNavigator) return;
    const currentScene = this.navigators[currentNavigator].current();
    if (!currentScene) return;
    return toId(currentNavigator, currentScene);
  };
}

export default new Navigation();
