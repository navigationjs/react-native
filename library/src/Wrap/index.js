import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import navigation, { Navigation } from '../Navigation';
import Events from '../Events';

export default class Wrap extends Component {
  state = { disabled: false };
  counter = 0;

  componentDidMount() {
    navigation.on('animation_start', () => {
      if (this.counter === 0) this.disable();
      this.counter++;
    });

    navigation.on('animation_end', () => {
      this.counter--;
      if (this.counter === 0) this.enable();
    });

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    navigation.off('animation_start');
    navigation.off('animation_end');
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const id = navigation.id();
    if (id) {
      navigation.emit(`${Navigation.EVENTS.ANDROID_BACK}${Events.SEP}${id}`, {
        id,
      });
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
