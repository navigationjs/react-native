import { Animated } from 'react-native';
import { link } from '../Wrap';

const defaultDuration = 300;

export default class Value {
  constructor(value = 0, duration = defaultDuration) {
    this.duration = duration;
    this.value = new Animated.Value(value);

    // true - forward
    // false - backward
    this.loading = value < 1;

    this._value = value;
    this.value.addListener(({ value }) => {
      if (value === 1) this.loading = false;
      else if (value === 0) this.loading = true;
      this._value = value;
    });
  }

  to = (value, duration = this.duration) => {
    link.wrap && link.wrap.disable();
    return new Promise(resolve => {
      this.value.stopAnimation(() => {
        Animated.timing(this.value, {
          toValue: value,
          duration,
        }).start(() => {
          link.wrap && link.wrap.enable();
          resolve();
        });
      });
    });
  };
}
