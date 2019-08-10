import { Animated } from 'react-native';

export default class Param {
  constructor(value = 0, defaultDuration = 0) {
    this.defaultDuration = defaultDuration;
    this.value = new Animated.Value(value);

    // true - forward
    // false - backward
    this.direction = value >= 0.5;

    this._value = value;
    this.value.addListener(({ value }) => {
      if (value === 1) this.direction = false;
      else if (value === 0) this.direction = true;
      this._value = value;
    });
  }

  to = (value, duration = this.defaultDuration) => {
    return new Promise(resolve => {
      Animated.timing(this.value, {
        toValue: value,
        duration,
      }).start(() => resolve());
    });
  };
}
