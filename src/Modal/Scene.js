import { Animated } from 'react-native';

export default class Scene {
  constructor({ active = 0 } = {}) {
    this.states = {
      active: new Animated.Value(active),
    };
  }

  show() {
    this.__setActive(1);
  }

  hide() {
    this.__setActive(0);
  }

  __setActive(weight = 1) {
    this.states.active.stopAnimation(() => {
      Animated.timing(this.states.active, {
        toValue: weight,
        duration: 200,
      }).start();
    });
  }
}