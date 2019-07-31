import { Animated } from 'react-native';

export default class Scene {
  constructor({ active = 0 } = {}) {
    this.anim = {
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
    this.anim.active.stopAnimation(() => {
      Animated.timing(this.anim.active, {
        toValue: weight,
        duration: 0,
      }).start();
    });
  }
}
