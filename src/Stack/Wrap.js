import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Wrap extends Component {
  state = { loading: this.props.scene.active.loading };

  componentDidMount() {
    const {
      scene: { active },
    } = this.props;
    active.value.addListener(() => this.setState({ loading: active.loading }));
  }

  render() {
    const { scene, children, style, ...props } = this.props;
    const { loading } = this.state;

    return (
      <Animated.View
        {...props}
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            overflow: 'hidden',
          },
          {
            transform: [
              {
                translateX: scene.active.value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
              {
                translateX: scene.depth.value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width / 2],
                }),
              },
            ],
          },
          style,
        ]}
      >
        {typeof children === 'function' ? children({ loading }) : children}
      </Animated.View>
    );
  }
}
