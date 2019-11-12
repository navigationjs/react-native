import { Component } from 'react';
import navigation, { Navigation } from '../Navigation';
import Events from '../Navigation/Events';

export default class AndroidBack extends Component {
  componentDidMount() {
    const { id, onPress } = this.props;
    navigation.on(
      `${Navigation.EVENTS.ANDROID_BACK}${Events.SEP}${id}`,
      onPress
    );
  }

  componentWillUnmount() {
    const { id } = this.props;
    navigation.off(`${Navigation.EVENTS.ANDROID_BACK}${Events.SEP}${id}`);
  }

  render() {
    return null;
  }
}
