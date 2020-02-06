import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import navigation, { fromId } from '@navigationjs/core';

const { width, height } = Dimensions.get('window');

export default class Swipe extends Component {
  scrollingTo = null;
  index = 1;

  render() {
    const { disabled, children } = this.props;

    return (
      <ScrollView
        ref={c => (this.scrollView = c)}
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
        onLayout={this.reset}
        overScrollMode={'never'}
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
      scene.hide(0);
      onSwipe && onSwipe();
      this.reset();
    }
  };

  reset = () => {
    this.index = 1;
    this.scrollView.scrollTo({
      x: width,
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
    const offset = e.nativeEvent.contentOffset.x / width;

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
