import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AndroidBack} from '@navigationjs/react-native';
import navigation, {main} from '../../../navigation';
import styles from './styles';

export default class Third extends Component {
  onBackPress = () => {
    if (main.history.length > 1) {
      navigation.back();
    }
  };

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
        <Text>Third scene</Text>
      </View>
    );
  }
}
