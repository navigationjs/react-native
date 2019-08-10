import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default class Wrap extends Component {
  state = { direction: this.props.scene.active.direction };

  componentDidMount() {
    const {
      scene: { active },
    } = this.props;
    active.value.addListener(() =>
      this.setState({ direction: active.direction })
    );
  }

  render() {
    const { scene, children, overlay, style } = this.props;
    const { direction } = this.state;

    return (
      <>
        {overlay && (
          <Animated.View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
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
          {typeof children === 'function' ? children({ direction }) : children}
        </Animated.View>
      </>
    );
  }
}
