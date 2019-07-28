import { Animated } from 'react-native';

const duration = 300;

export default class Scene {
  constructor({ active = 0 } = {}) {
    this.anim = {
      active: new Animated.Value(active),
    };

    this.active = active;

    this.disabled = active !== 1;
    this.onDisabledChangedListeners = [];

    this.anim.active.addListener(({ value }) => (this.active = value));
  }

  disable() {
    const cache = this.disabled;
    this.disabled = true;
    if (cache !== this.disabled) this.onDisabledChanged();
  }

  enable() {
    const cache = this.disabled;
    this.disabled = this.active !== 1;
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
    return this.__setActive(1);
  }

  hide() {
    return this.__setActive(0);
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
