import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import navigation, { toId } from '@navigationjs/core';

export default class Wrap extends Component {
  constructor(props) {
    super(props);

    const { navigator: navigatorName, scene: sceneName } = props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    this.state = { loading: scene.active._value < 1 };
  }

  componentDidMount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    this.listener = scene.active.value.addListener(({ value }) => {
      if (value === 1) this.setState({ loading: false });
      else if (value === 0) this.setState({ loading: true });
    });
  }

  componentWillUnmount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    scene.active.value.removeListener(this.listener);
  }

  render() {
    const {
      navigator: navigatorName,
      scene: sceneName,
      children,
      style,
      ...props
    } = this.props;
    const { loading } = this.state;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const id = toId(navigatorName, sceneName);
    const pass = { loading, id };

    const { width } = Dimensions.get('window');

    return (
      <Animated.View
        {...props}
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
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
                  inputRange: [0, 0.05, 1],
                  outputRange: [0, 0, -width / 5],
                }),
              },
            ],
          },
          style,
        ]}
      >
        {typeof children === 'function' ? children(pass) : children}
      </Animated.View>
    );
  }
}
