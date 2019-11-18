import React, {Component} from 'react';
import {View, Text} from 'react-native';
import navigation, {AndroidBack} from '@navigationjs/react-native';
import {main} from '../../../navigation';
import styles from './styles';

export default class Fourth extends Component {
  onBackPress = async () => {
    if (main.history.length > 1) {
      await navigation.back();
    }
  };

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
        <Text>Fourth scene</Text>
      </View>
    );
  }
}
