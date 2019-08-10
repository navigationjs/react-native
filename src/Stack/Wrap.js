import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Wrap extends Component {
  render() {
    const { scene, children, style } = this.props;

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          },
          {
            transform: [
              {
                translateX: scene.active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
              {
                translateX: scene.depth.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width / 2],
                }),
              },
            ],
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}
