import React, {Component} from 'react';
import {Animated} from 'react-native';
import Loader from '../../../components/Loader';
import styles from './styles';
import config from '../../../config';
import navigation, {preloader, first, second} from '../../../navigation';

export default class Preloader extends Component {
  async componentDidMount() {
    await preloader.go('main', 0);

    // load something

    await first.go('first', 0);
    await second.go('first', 0);
    await navigation.go('main', 'first', 0);

    setTimeout(() => {
      navigation.navigators.preloader.back();
    }, 500);
  }

  render() {
    const {active} = this.props;

    const translateY = active.interpolate({
      inputRange: [0, 0, 1],
      outputRange: [config.dimensions.height, 0, 0],
    });

    const opacity = active;

    return (
      <Animated.View
        style={[styles.wrap, {opacity, transform: [{translateY}]}]}>
        <Loader color={config.colors.light} />
      </Animated.View>
    );
  }
}
