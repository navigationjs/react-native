import { Component } from 'react';
import events from '@railsmob/events';
import navigation, { Navigation } from '../Navigation';

export default class AndroidBack extends Component {
  componentDidMount() {
    const { id, onPress } = this.props;
    navigation.on(events.id(Navigation.EVENTS.ANDROID_BACK, id), onPress);
  }

  componentWillUnmount() {
    const { id } = this.props;
    navigation.off(events.id(Navigation.EVENTS.ANDROID_BACK, id));
  }

  render() {
    return null;
  }
}
