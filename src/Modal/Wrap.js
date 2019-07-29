import React, { Component, Fragment } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default class Wrap extends Component {
  static defaultProps = {
    overflow: false,
  };

  state = {
    mounted: !!this.props.scene.active,
    disabled: this.props.scene.disabled,
  };

  disabledListener = this.props.scene.onDisabledSubscribe(
    'default',
    disabled => {
      this.setState({ disabled });
    }
  );

  prevActive = this.props.scene.active;
  activeListener = this.props.scene.anim.active.addListener(({ value }) => {
    const mounted = value === 1 || (this.prevActive > value && value !== 0);
    if (mounted !== this.state.mounted) {
      this.setState({ mounted });
    }
    this.prevActive = value;
  });

  render() {
    const { scene, children, overflow } = this.props;
    const { mounted, disabled } = this.state;

    return (
      <Fragment>
        {overflow && (
          <Animated.View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              transform: [
                {
                  translateY: scene.anim.active.interpolate({
                    inputRange: [0, 0.001, 1],
                    outputRange: [height, 0, 0],
                  }),
                },
              ],
              backgroundColor: scene.anim.active.interpolate({
                inputRange: [0, 0.001, 1],
                outputRange: [
                  'rgba(0,0,0,0)',
                  'rgba(0,0,0,0)',
                  'rgba(0,0,0,0.4)',
                ],
              }),
            }}
          />
        )}
        <Animated.View
          pointerEvents={disabled ? 'none' : 'auto'}
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
            },
            {
              transform: [
                {
                  translateY: scene.anim.active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {typeof children === 'function' ? children({ mounted }) : children}
        </Animated.View>
      </Fragment>
    );
  }
}
