import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import navigation, { Navigation } from '../Navigation';
import Events from '../Navigation/Events';

export const link = { wrap: null };

export default class Wrap extends Component {
  state = { disabled: false };

  componentDidMount() {
    link.wrap = this;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    link.wrap = null;
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const id = navigation.id();
    if (id) {
      navigation.emit(
        `${Navigation.EVENTS.ANDROID_BACK}${Events.SEPARATOR}${id}`,
        { id }
      );
    }
    return true;
  };

  enable = () => this.setState({ disabled: false });
  disable = () => this.setState({ disabled: true });

  render() {
    const { children, ...props } = this.props;
    const { disabled } = this.state;

    return (
      <View
        {...props}
        style={{ flex: 1 }}
        pointerEvents={disabled ? 'none' : 'auto'}
      >
        {children}
      </View>
    );
  }
}
