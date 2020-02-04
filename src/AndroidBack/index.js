import { Component } from 'react';
import events from '@railsmob/events';
import navigation from '@navigationjs/core';

export default class AndroidBack extends Component {
  componentDidMount() {
    const { id, onPress } = this.props;
    navigation.on(events.id('android_back', id), onPress);
  }

  componentWillUnmount() {
    const { id } = this.props;
    navigation.off(events.id('android_back', id));
  }

  render() {
    return null;
  }
}
