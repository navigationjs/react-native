import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

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
                translateY: scene.active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
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
