import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import navigation, { fromId } from '@navigationjs/core';

export default class Swipe extends Component {
  state = {
    width: 0,
    height: 0,
  };

  scrollingTo = null;
  index = 1;

  render() {
    const { disabled, children } = this.props;
    const { width, height } = this.state;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        ref={c => (this.scrollView = c)}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
        scrollEnabled={!disabled}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}
      >
        <View style={{ width, height }} />
        <View style={{ width, height }}>{children}</View>
      </ScrollView>
    );
  }

  onMomentumScrollEnd = async () => {
    if (this.index === 0) {
      const { id, onSwipe } = this.props;
      const [navigatorName, sceneName] = fromId(id);
      const navigator = navigation.navigators[navigatorName];
      const scene = navigator.scenes[sceneName];
      scene.active.to(0, 0);
      onSwipe && onSwipe();
      this.reset();
    }
  };

  adjustCardSize = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    this.setState({ width, height });
    setTimeout(this.reset, 0);
  };

  reset = () => {
    this.index = 1;
    this.scrollView.scrollTo({
      x: this.state.width,
      animated: false,
    });
  };

  animatePrevScene = value => {
    const { id } = this.props;
    const [navigatorName, sceneName] = fromId(id);
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];

    const prev =
      navigator.scenes[
        navigator.history.chain[navigator.history.chain.length - 2]
      ];

    // TODO: fix Value to not loose listener
    if (scene && prev && scene.active.value._value > 0) {
      prev.depth.to(value, 0);
    }
  };

  handleHorizontalScroll = e => {
    const offset = e.nativeEvent.contentOffset.x / this.state.width;

    const selectedIndex = Math.round(offset);

    this.animatePrevScene(offset);

    if (selectedIndex < 0 || selectedIndex >= 2) return;

    if (this.scrollingTo !== null && this.scrollingTo !== selectedIndex) return;

    if (this.index !== selectedIndex || this.scrollingTo !== null) {
      this.scrollingTo = null;
      this.index = selectedIndex;
    }
  };
}
