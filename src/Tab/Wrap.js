import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Wrap extends Component {
  static defaultProps = {
    backgroundColor: 'white',
  };

  render() {
    const { scene, children, backgroundColor } = this.props;

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor,
          },
          {
            transform: [
              {
                translateX: scene.states.active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
            ],
          },
          this.props.style,
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}
