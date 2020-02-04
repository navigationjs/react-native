import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';
import navigation from '@navigationjs/core';

export default class Pan extends Component {
  static defaultProps = {
    sensitivity: 30,
    velocityThreshold: 200,
    percentThreshold: 0.3,
    size: 0.35,
    component: View,
    disabled: false,
  };

  value = 1;

  onPanCheck = (event, gestureState) => {
    const { disabled, sensitivity, size } = this.props;
    if (disabled || navigation.locked) return false;
    const sensitivityCheck =
      Math.abs(gestureState.dx) > sensitivity &&
      Math.abs(gestureState.dy) <= sensitivity;
    const sizeCheck = event.nativeEvent.pageX < this.width * size;
    return sensitivityCheck && sizeCheck;
  };

  onPanStart = event => {
    this.timeStart = event.nativeEvent.timestamp;
  };

  onPanEnd = async event => {
    const {
      navigator: navigatorName,
      scene: sceneName,
      percentThreshold,
      velocityThreshold,
      onSwipe,
    } = this.props;

    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const prev =
      navigator.scenes[
        navigator.history.chain[navigator.history.chain.length - 2]
      ];
    this.value = scene.active._value;

    const velocityThresholdMet =
      event.nativeEvent.timestamp - this.timeStart < velocityThreshold;
    const percentThresholdMet = this.value < 1 - percentThreshold;
    const thresholdMet = velocityThresholdMet || percentThresholdMet;

    if (thresholdMet && onSwipe) onSwipe();

    await Promise.all([
      prev ? prev.depth.to(thresholdMet ? 0 : 1) : Promise.resolve(),
      scene.active.to(thresholdMet ? 0 : 1),
    ]);

    this.value = 1;
  };

  onPanMove = (event, gestureState) => {
    const { navigator: navigatorName, scene: sceneName } = this.props;

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
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: this.onPanCheck,
    onPanResponderGrant: this.onPanStart,
    onPanResponderMove: this.onPanMove,
    onPanResponderRelease: this.onPanEnd,
    onPanResponderTerminate: this.onPanEnd,
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
