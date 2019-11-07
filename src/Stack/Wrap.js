import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import navigation from '../Navigation';

const { width } = Dimensions.get('window');

export default class Wrap extends Component {
  constructor(props) {
    super(props);

    const { navigator: navigatorName, scene: sceneName } = props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    this.state = { loading: scene.active.loading };
  }

  componentDidMount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    scene.active.value.addListener(() =>
      this.setState({ loading: scene.active.loading })
    );
  }

  componentWillUnmount() {
    const { navigator: navigatorName, scene: sceneName } = this.props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    scene.active.value.removeAllListeners();
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

    const pass = {
      loading,
      navigator: navigatorName,
      scene: sceneName,
    };

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
        {typeof children === 'function' ? children(pass) : children}
      </Animated.View>
    );
  }
}
