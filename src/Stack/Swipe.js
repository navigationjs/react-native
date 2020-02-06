import React, { Component, PureComponent } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import navigation, { fromId } from '@navigationjs/core';

export class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };
    this.handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
    this.adjustCardSize = this.adjustCardSize.bind(this);
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        ref={c => (this._scrollview = c)}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
        scrollEnabled={!this.props.disabled}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        onScrollBeginDrag={this.props.onScrollBeginDrag}
        onScrollEndDrag={this.props.onScrollEndDrag}
        onScrollAnimationEnd={this.props.onScrollAnimationEnd}
        onMomentumScrollEnd={this.props.onMomentumScrollEnd}
        scrollEventThrottle={100}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}
      >
        {this.renderContent()}
      </ScrollView>
    );
  }

  adjustCardSize({
    nativeEvent: {
      layout: { width, height },
    },
  }) {
    this.setState({
      width,
      height,
    });

    setTimeout(() => {
      this._scrollview.scrollTo({
        x: this.state.initialSelectedIndex * width,
        animated: false,
      });
    }, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this._scrollview.scrollTo({
        x: nextProps.selectedIndex * this.state.width,
        animated: true,
      });
      this.setState({ scrollingTo: nextProps.selectedIndex });
    }
  }

  renderContent() {
    const { width, height } = this.state;
    const style = Platform.OS === 'ios' && { backgroundColor: 'transparent' };
    return React.Children.map(this.props.children, (child, i) => (
      <View style={[style, { width, height }]} key={'r_' + i}>
        {child}
      </View>
    ));
  }

  handleHorizontalScroll(e) {
    const offset = e.nativeEvent.contentOffset.x / this.state.width;

    const selectedIndex = Math.round(offset);

    this.props.onScroll && this.props.onScroll(offset);

    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }

    if (
      this.state.scrollingTo !== null &&
      this.state.scrollingTo !== selectedIndex
    ) {
      return;
    }

    if (
      this.props.selectedIndex !== selectedIndex ||
      this.state.scrollingTo !== null
    ) {
      this.setState({ selectedIndex, scrollingTo: null }, () => {
        const { onSelectedIndexChange } = this.props;
        onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
      });
    }
  }
}

export default class StackSwipe extends PureComponent {
  state = { selectedIndex: 1 };
  prev = null;
  scene = null;
  index = 1;

  render() {
    const { children, id, onSwipe, ...other } = this.props;
    const { selectedIndex } = this.state;
    const [navigatorName, sceneName] = fromId(id);
    const navigator = navigation.navigators[navigatorName];

    return (
      <Swipe
        count={2}
        selectedIndex={selectedIndex}
        onScrollBeginDrag={() => {
          this.prev =
            navigator.scenes[
              navigator.history.chain[navigator.history.chain.length - 2]
            ];
          this.scene = navigator.scenes[sceneName];
        }}
        onSelectedIndexChange={index => (this.index = index)}
        onMomentumScrollEnd={async () => {
          if (this.index === 0) {
            this.scene.active.to(0, 0);
            onSwipe();
            this.index = 1;
            this.setState({ selectedIndex: 1 });
          }
        }}
        onScroll={offset => {
          if (this.scene && this.scene.active._value > 0) {
            this.prev && this.prev.depth.to(offset, 0);
          }
        }}
        {...other}
      >
        <View style={{ flexGrow: 1 }} />
        <View style={{ flexGrow: 1 }}>{children}</View>
      </Swipe>
    );
  }
}
