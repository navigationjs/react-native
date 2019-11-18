import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import navigation, {AndroidBack} from '@navigationjs/react-native';
import styles from './styles';

export default class Second extends Component {
  onBackPress = () => navigation.back();

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
        <Button title={'Go back'} onPress={this.onBackPress} />
        <Text>First/Second scene</Text>
      </View>
    );
  }
}
