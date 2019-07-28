import { Animated } from 'react-native';

const duration = 300;

export default class Scene {
  constructor({ active = 0, level = 0 } = {}) {
    this.anim = {
      active: new Animated.Value(active),
      level: new Animated.Value(level),
    };

    this.active = active;
    this.level = level;

    this.disabled = !(active === 1 && level === 0);
    this.onDisabledChangedListeners = [];

    this.anim.active.addListener(({ value }) => (this.active = value));
    this.anim.level.addListener(({ value }) => (this.level = value));
  }

  disable() {
    const cache = this.disabled;
    this.disabled = true;
    if (cache !== this.disabled) this.onDisabledChanged();
  }

  enable() {
    const cache = this.disabled;
    this.disabled = !(this.active === 1 && this.level === 0);
    if (cache !== this.disabled) this.onDisabledChanged();
  }

  onDisabledSubscribe(name, fn) {
    this.onDisabledChangedListeners.unshift({ name, fn });
  }

  onDisabledUnsubscribe(name) {
    this.onDisabledChangedListeners = this.onDisabledChangedListeners.filter(
      it => it.name === name
    );
  }

  onDisabledChanged() {
    this.onDisabledChangedListeners.forEach(it => it.fn(this.disabled));
  }

  show() {
    return Promise.all(this.__setLevel(0), this.__setActive(1));
  }

  hide() {
    return Promise.all(this.__setLevel(0), this.__setActive(0));
  }

  backward() {
    return this.__setLevel(this.level + 1);
  }

  forward() {
    return this.__setLevel(this.level === 0 ? 0 : this.level - 1);
  }

  __setLevel(level = 1) {
    return new Promise(resolve => {
      this.disable();
      Animated.timing(this.anim.level, {
        toValue: level,
        duration,
      }).start(() => {
        this.enable();
        resolve();
      });
    });
  }

  __setActive(active = 1) {
    return new Promise(resolve => {
      this.disable();
      Animated.timing(this.anim.active, {
        toValue: active,
        duration,
      }).start(() => {
        this.enable();
        resolve();
      });
    });
  }
}
