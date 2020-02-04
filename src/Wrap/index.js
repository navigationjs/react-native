import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import navigation from '@navigationjs/core';

export default class Wrap extends Component {
  state = { lock: false };

  componentDidMount() {
    navigation.on('lock', () => this.lock());
    navigation.on('unlock', () => this.unlock());

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    navigation.off('lock');
    navigation.off('unlock');
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const id = navigation.id();
    if (id) navigation.emit(`android_back:${id}`);
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
