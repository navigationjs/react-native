import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {AndroidBack} from 'react-native-animated-navigation';
import navigation, {main} from '../../../../navigation';
import styles from './styles';

export default class First extends Component {
  onBackPress = async () => {
    await navigation.push('main');

    if (main.history.length > 1) {
      navigation.back();
    }
  };

  onGoToSecond = () => navigation.go('second', 'second');

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
        <Text>Second/First scene</Text>
        <Button title={'Go to Second/Second'} onPress={this.onGoToSecond} />
      </View>
    );
  }
}
