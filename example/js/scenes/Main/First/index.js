import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AndroidBack} from 'react-native-animated-navigation';
import styles from './styles';
import navigation, {main} from '../../../navigation';

export default class First extends Component {
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
        <Text>First scene</Text>
      </View>
    );
  }
}
