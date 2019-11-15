import { Animated, Easing } from 'react-native';
import Events from '../Events';
import navigation from '../Navigation';

const defaultDuration = 300;

export default class Value {
  static EVENTS = {
    ANIMATION_START: 'animation_start',
    ANIMATION_END: 'animation_end',
  };

  constructor(name, value = 0, duration = defaultDuration) {
    this.name = name;
    this.duration = duration;
    this.easing = Easing.out(Easing.cubic);
    this.value = new Animated.Value(value);

    this._value = value;
    this.value.addListener(({ value }) => (this._value = value));
  }

  to = (value, duration = this.duration) => {
    navigation.emit(Events.id(Value.EVENTS.ANIMATION_START, this.name), {
      name: this.name,
    });
    return new Promise(resolve => {
      this.value.stopAnimation(() => {
        Animated.timing(this.value, {
          toValue: value,
          duration,
          easing: this.easing,
        }).start(() => {
          navigation.emit(Events.id(Value.EVENTS.ANIMATION_END, this.name), {
            name: this.name,
          });
          resolve();
        });
      });
    });
  };
}
