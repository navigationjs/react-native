import { Animated } from 'react-native';
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
    this.value = new Animated.Value(value);

    this._value = value;
    this.value.addListener(({ value }) => (this._value = value));
  }

  to = (value, duration = this.duration) => {
    navigation.emit(
      `${Value.EVENTS.ANIMATION_START}${Events.SEP}${this.name}`,
      { name: this.name }
    );
    return new Promise(resolve => {
      this.value.stopAnimation(() => {
        Animated.timing(this.value, {
          toValue: value,
          duration,
        }).start(() => {
          navigation.emit(
            `${Value.EVENTS.ANIMATION_END}${Events.SEP}${this.name}`,
            { name: this.name }
          );
          resolve();
        });
      });
    });
  };
}