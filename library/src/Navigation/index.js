import { toId } from '../helpers';
import Events from '../Events';

export class Navigation {
  static EVENTS = {
    WILL_BLUR: 'will_blur',
    BLUR: 'blur',
    WILL_FOCUS: 'will_focus',
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
    const nextId = toId(navigatorName, sceneName);

    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    if (prevId !== nextId) {
      this.emit(Events.id(Navigation.EVENTS.WILL_BLUR, prevId), {
        id: prevId,
      });
      this.emit(Events.id(Navigation.EVENTS.WILL_FOCUS, nextId), {
        id: nextId,
      });
    }

    this.push(navigatorName);

    if (sceneName) await navigator.go(sceneName, duration);

    if (prevId !== nextId) {
      this.emit(Events.id(Navigation.EVENTS.BLUR, prevId), {
        id: prevId,
      });
      this.emit(Events.id(Navigation.EVENTS.FOCUS, nextId), {
        id: nextId,
      });
    }

    return Promise.resolve();
  };

  push = navigatorName => {
    const navigator = this.navigators[navigatorName];
    if (!navigator) throw null;

    const index = this.history.findIndex(it => it === navigatorName);
    if (index >= 0) this.history.splice(index, 1);
    this.history.push(navigatorName);
  };

  back = async (navigatorName, duration) => {
    const navigator = this.navigators[navigatorName || this.current()];
    if (!navigator) return Promise.reject();

    const prevId = this.id();

    this.emit(Events.id(Navigation.EVENTS.WILL_BLUR, prevId), {
      id: prevId,
    });

    const nextNavigator =
      navigator.history.length <= 1
        ? this.navigators[this.history[this.history.length - 2]]
        : navigator;

    const nextId = nextNavigator
      ? toId(
          nextNavigator.name,
          nextNavigator.history[nextNavigator.history.length - 2]
        )
      : null;

    if (nextId) {
      this.emit(Events.id(Navigation.EVENTS.WILL_FOCUS, nextId), {
        id: nextId,
      });
    }

    await navigator.back(duration);
    if (navigator.history.length === 0) this.history.pop();

    this.emit(Events.id(Navigation.EVENTS.BLUR, prevId), {
      id: prevId,
    });

    if (nextId) {
      this.emit(Events.id(Navigation.EVENTS.FOCUS, nextId), {
        id: nextId,
      });
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
