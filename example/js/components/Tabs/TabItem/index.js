import React, {Component} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import config from '../../../config';
import styles from './styles';

export default class TabItem extends Component {
  render() {
    const {title, active, onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.wrap}>
        <Animated.Text
          style={[
            styles.title,
            {
              color: active.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  config.colors.grey.hex(),
                  config.colors.dark.hex(),
                ],
              }),
            },
          ]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
}
