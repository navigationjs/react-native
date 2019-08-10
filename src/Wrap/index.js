import React, { Component } from 'react';
import { Animated, View, Dimensions } from 'react-native';

export const link = { wrap: null };

const { height } = Dimensions.get('window');

export default class Wrap extends Component {
  overlayY = new Animated.Value(height);

  componentDidMount() {
    link.wrap = this;
  }

  componentWillUnmount() {
    link.wrap = null;
  }

  enable = () => {
    Animated.timing(this.overlayY, {
      toValue: height,
      duration: 0,
    }).start();
  };
  disable = () => {
    Animated.timing(this.overlayY, {
      toValue: 0,
      duration: 0,
    }).start();
  };

  render() {
    const { children } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {children}
        <Animated.View
          key={'overlay'}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: [
              {
                translateY: this.overlayY,
              },
            ],
          }}
        />
      </View>
    );
  }
}
