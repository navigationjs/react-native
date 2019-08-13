import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import Back from '../Back';

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
    if (!this.state.disabled) Back.dispatch();
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
