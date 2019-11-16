import React, { Component } from 'react';
import { Animated, Dimensions, Platform } from 'react-native';
import { toId } from '../helpers';
import navigation from '../Navigation';

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
    scene.active.value.addListener(({ value }) => {
      if (value === 1) this.setState({ loading: false });
      else if (value === 0) this.setState({ loading: true });
    });
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
      overlay,
      transparent,
      style,
      ...props
    } = this.props;
    const { loading } = this.state;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const id = toId(navigatorName, sceneName);
    const pass = { loading, id };

    const { height } = Dimensions.get('window');

    return (
      <>
        {overlay && (
          <Animated.View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              backgroundColor: 'rgba(0,0,0,0.4)',
              transform: [
                {
                  translateY: scene.active.value.interpolate({
                    inputRange: [0, 0, 1],
                    outputRange: [height, 0, 0],
                  }),
                },
              ],
              opacity: scene.active.value,
            }}
          />
        )}
        <Animated.View
          {...props}
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: transparent ? 'transparent' : 'white',
              overflow: 'hidden',
            },
            {
              transform: [
                {
                  translateY: scene.active.value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
            style,
          ]}
        >
          {typeof children === 'function' ? children(pass) : children}
        </Animated.View>
      </>
    );
  }
}
