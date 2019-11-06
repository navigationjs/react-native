import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import { toId } from '../helpers';
import navigation from '../Navigation';

const { height } = Dimensions.get('window');

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

  render() {
    const {
      navigator: navigatorName,
      scene: sceneName,
      children,
      overlay,
      style,
      ...props
    } = this.props;
    const { loading } = this.state;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const id = toId(navigatorName, sceneName);
    const pass = { loading, id };

    return (
      <>
        {overlay && (
          <Animated.View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              transform: [
                {
                  translateY: scene.active.value.interpolate({
                    inputRange: [0, 0, 1],
                    outputRange: [height, 0, 0],
                  }),
                },
              ],
              backgroundColor: scene.active.value.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)'],
              }),
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
              backgroundColor: 'white',
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
