import React, { Component } from 'react';
import { View } from 'react-native';

export const link = { wrap: null };

export default class Wrap extends Component {
  state = { disabled: false };

  componentDidMount() {
    link.wrap = this;
  }

  componentWillUnmount() {
    link.wrap = null;
  }

  enable = () => this.setState({ disabled: false });
  disable = () => this.setState({ disabled: true });

  render() {
    const { children } = this.props;
    const { disabled } = this.state;

    return (
      <View style={{ flex: 1 }} pointerEvents={disabled ? 'none' : 'auto'}>
        {children}
      </View>
    );
  }
}
