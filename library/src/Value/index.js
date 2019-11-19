import { Animated, Easing } from 'react-native';

const defaultDuration = 300;

export default class Value {
  constructor(name, value = 0, duration = defaultDuration) {
    this.name = name;
    this.duration = duration;
    this.easing = Easing.out(Easing.cubic);
    this.value = new Animated.Value(value);

    this._value = value;
    this.value.addListener(({ value }) => (this._value = value));
  }

  to = (value, duration = this.duration) => {
    return new Promise(resolve => {
      this.value.stopAnimation(() => {
        Animated.timing(this.value, {
          toValue: value,
          duration,
          easing: this.easing,
        }).start(() => {
          resolve();
        });
      });
    });
  };
}
