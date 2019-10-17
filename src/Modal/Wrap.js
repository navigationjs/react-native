import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default class Wrap extends Component {
  state = { loading: this.props.scene.active.loading };

  componentDidMount() {
    const {
      scene: { active },
    } = this.props;
    active.value.addListener(() => this.setState({ loading: active.loading }));
  }

  render() {
    const { scene, children, overlay, style, ...props } = this.props;
    const { loading } = this.state;

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
          {typeof children === 'function' ? children({ loading }) : children}
        </Animated.View>
      </>
    );
  }
}
