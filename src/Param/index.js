import { Animated } from 'react-native';
import { link } from '../Wrap';

export default class Param {
  constructor(value = 0, defaultDuration = 0) {
    this.defaultDuration = defaultDuration;
    this.value = new Animated.Value(value);

    // true - forward
    // false - backward
    this.direction = value < 1;

    this._value = value;
    this.value.addListener(({ value }) => {
      if (value === 1) this.direction = false;
      else if (value === 0) this.direction = true;
      this._value = value;
    });
  }

  to = (value, duration = this.defaultDuration) => {
    return new Promise(resolve => {
      link.wrap && link.wrap.disable();
      Animated.timing(this.value, {
        toValue: value,
        duration,
      }).start(() => {
        link.wrap && link.wrap.enable();
        resolve();
      });
    });
  };
}
