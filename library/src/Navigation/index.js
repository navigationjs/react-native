import { toId } from '../helpers';
import Events from '../Events';

export class Navigation {
  static EVENTS = {
    BLUR: 'blur',
    FOCUS: 'focus',
    ANDROID_BACK: 'android_back',
  };

  constructor() {
    this.navigators = {};
    this.history = [];
    this.events = new Events();

    // aliases
    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;
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
      this.emit(Events.id(Navigation.EVENTS.BLUR, prevId), {
        id: prevId,
      });
      this.emit(Events.id(Navigation.EVENTS.FOCUS, id), { id });
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
      this.emit(Events.id(Navigation.EVENTS.BLUR, prevId), {
        id: prevId,
      });
      this.emit(Events.id(Navigation.EVENTS.FOCUS, id), { id });
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
