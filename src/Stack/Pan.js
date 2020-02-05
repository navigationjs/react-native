import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';
import navigation, { fromId } from '@navigationjs/core';

export default class Pan extends Component {
  static defaultProps = {
    sensitivity: 30,
    velocityThreshold: 0.5,
    percentThreshold: 0.3,
    size: 0.35,
    component: View,
    disabled: false,
  };

  value = 1;

  onPanCheck = (event, gestureState) => {
    const { disabled, sensitivity, size } = this.props;
    if (disabled || navigation.locked) return false;
    const sensitivityCheck = gestureState.dx > sensitivity;
    const sizeCheck = event.nativeEvent.pageX < this.width * size;
    return sensitivityCheck && sizeCheck;
  };

  onPanTerminateOrRelease = async (event, gestureState) => {
    const { id, percentThreshold, velocityThreshold, onSwipe } = this.props;

    const [navigatorName, sceneName] = fromId(id);
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const prev =
      navigator.scenes[
        navigator.history.chain[navigator.history.chain.length - 2]
      ];
    this.value = scene.active._value;

    const percentThresholdMet = this.value < 1 - percentThreshold;
    const velocityThresholdMet = gestureState.vx > velocityThreshold;
    const thresholdMet = velocityThresholdMet || percentThresholdMet;

    if (thresholdMet && onSwipe) onSwipe();

    await Promise.all([
      prev ? prev.depth.to(thresholdMet ? 0 : 1) : Promise.resolve(),
      scene.active.to(thresholdMet ? 0 : 1),
    ]);

    this.value = 1;
  };

  onPanMove = (event, gestureState) => {
    const { id } = this.props;
    const [navigatorName, sceneName] = fromId(id);
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const prev =
      navigator.scenes[
        navigator.history.chain[navigator.history.chain.length - 2]
      ];

    const value = Math.min(
      Math.max(this.value - gestureState.dx / this.width, 0),
      1
    );

    prev && prev.depth.to(value, 0);
    scene.active.to(value, 0);
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this.onPanCheck,
    onStartShouldSetPanResponderCapture: this.onPanCheck,
    onMoveShouldSetPanResponder: this.onPanCheck,
    onMoveShouldSetPanResponderCapture: this.onPanCheck,
    onPanResponderMove: this.onPanMove,
    onPanResponderRelease: this.onPanTerminateOrRelease,
    onPanResponderTerminate: this.onPanTerminateOrRelease,
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
  });

  onLayout = event => {
    const {
      nativeEvent: {
        layout: { width, height },
      },
    } = event;
    const { onLayout } = this.props;
    this.width = width;
    this.height = height;
    onLayout && onLayout(event);
  };

  render() {
    const {
      component: WrapComponent,
      children,
      onSwipe,
      velocityThreshold,
      percentThreshold,
      size,
      sensitivity,
      id,
      ...other
    } = this.props;

    return (
      <WrapComponent
        {...other}
        {...this.panResponder.panHandlers}
        onLayout={this.onLayout}
      >
        {children}
      </WrapComponent>
    );
  }
}
