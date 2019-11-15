import { Component } from 'react';
import navigation, { Navigation } from '../Navigation';
import Events from '../Events';

export default class AndroidBack extends Component {
  componentDidMount() {
    const { id, onPress } = this.props;
    navigation.on(Events.id(Navigation.EVENTS.ANDROID_BACK, id), onPress);
  }

  componentWillUnmount() {
    const { id } = this.props;
    navigation.off(Events.id(Navigation.EVENTS.ANDROID_BACK, id));
  }

  render() {
    return null;
  }
}
