import { Component } from 'react';
import navigation, { Navigation } from '../Navigation';
import Emitter from '../Navigation/Emitter';

export default class AndroidBack extends Component {
  componentDidMount() {
    const { id, onPress } = this.props;
    navigation.on(
      `${Navigation.EVENTS.ANDROID_BACK}${Emitter.SEPARATOR}${id}`,
      onPress
    );
  }

  componentWillUnmount() {
    const { id } = this.props;
    navigation.off(
      `${Navigation.EVENTS.ANDROID_BACK}${Emitter.SEPARATOR}${id}`
    );
  }

  render() {
    return null;
  }
}
