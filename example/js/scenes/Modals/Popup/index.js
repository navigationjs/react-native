import React, {Component} from 'react';
import {View} from 'react-native';
import {AndroidBack} from '@navigationjs/react-native';
import navigation from '../../../navigation';
import styles from './styles';

export default class Popup extends Component {
  onBackPress = () => navigation.back();

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
      </View>
    );
  }
}
