import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Wrap extends Component {
  static defaultProps = {
    backgroundColor: 'white',
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
    const { scene, children, backgroundColor } = this.props;
    const { mounted, disabled } = this.state;

    return (
      <Animated.View
        pointerEvents={disabled ? 'none' : 'auto'}
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
                translateX: scene.anim.active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
              {
                translateX: scene.anim.level.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -width / 2],
                }),
              },
            ],
          },
        ]}
      >
        {typeof children === 'function' ? children({ mounted }) : children}
      </Animated.View>
    );
  }
}