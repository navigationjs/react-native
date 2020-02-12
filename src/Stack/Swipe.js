import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import navigation, { fromId } from '@navigationjs/core';

const { width, height } = Dimensions.get('window');

export default class Swipe extends Component {
  scrollingTo = null;
  index = 0;
  dragging = false;
  locked = false;

  componentDidMount() {
    setTimeout(this.reset, 0);
  }

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
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        onScroll={this.handleHorizontalScroll}
        onMomentumScrollEnd={this.onEnd}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
      >
        <View style={{ width, height }} />
        <View style={{ width, height }}>{children}</View>
      </ScrollView>
    );
  }

  onEnd = async () => {
    if (this.index !== 0) return;
    if (this.locked) return;
    this.locked = true;

    const { id, onSwipe } = this.props;
    const [navigatorName, sceneName] = fromId(id);
    const navigator = navigation.navigators[navigatorName];
    const scene = navigator.scenes[sceneName];
    if (scene.active._value === 0) {
      this.reset();
      this.locked = false;
      return;
    }
    await scene.hide(0);
    onSwipe && (await onSwipe());
    this.reset();
    this.locked = false;
  };

  reset = () => {
    this.index = 1;
    this.scrollView &&
      this.scrollView.scrollTo({
        x: width,
        animated: false,
      });
  };

  onScrollBeginDrag = () => (this.dragging = true);
  onScrollEndDrag = () => (this.dragging = false);

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
    if (prev) {
      prev.depth.to(scene && scene.active.value._value === 1 ? value : 0, 0);
    }
  };

  handleHorizontalScroll = e => {
    const offset = e.nativeEvent.contentOffset.x / width;

    const selectedIndex = Math.round(offset);

    this.animatePrevScene(offset);

    if (this.dragging && offset <= 0) this.onEnd();

    if (selectedIndex < 0 || selectedIndex >= 2) return;

    if (this.scrollingTo !== null && this.scrollingTo !== selectedIndex) return;

    if (this.index !== selectedIndex || this.scrollingTo !== null) {
      this.scrollingTo = null;
      this.index = selectedIndex;
    }
  };
}
