import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import navigation, { Navigation } from '@navigationjs/core';

export default class Wrap extends Component {
  state = { lock: false };

  componentDidMount() {
    navigation.on(Navigation.EVENTS.LOCK, () => this.lock());
    navigation.on(Navigation.EVENTS.UNLOCK, () => this.unlock());

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    navigation.off(Navigation.EVENTS.LOCK);
    navigation.off(Navigation.EVENTS.UNLOCK);
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const id = navigation.id();
    if (id) navigation.androidBack(id);
    return true;
  };

  lock = () => this.setState({ lock: true });
  unlock = () => this.setState({ lock: false });

  render() {
    const { children, ...props } = this.props;
    const { lock } = this.state;

    return (
      <View
        {...props}
        style={{ flex: 1 }}
        pointerEvents={lock ? 'none' : 'auto'}
      >
        {children}
      </View>
    );
  }
}
