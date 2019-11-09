import React, {Component} from 'react';
import {View} from 'react-native';
import TabItem from './TabItem';
import styles from './styles';

export default class Tabs extends Component {
  static Item = TabItem;

  render() {
    const {children} = this.props;

    return <View style={styles.wrap}>{children}</View>;
  }
}
