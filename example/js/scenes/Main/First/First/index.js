import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {AndroidBack} from 'react-native-animated-navigation';
import styles from './styles';
import navigation, {main} from '../../../../navigation';

export default class First extends Component {
  onBackPress = async () => {
    await navigation.push('main');

    if (main.history.length > 1) {
      navigation.back();
    }
  };

  onGoToSecond = () => navigation.go('first', 'second');
  onOpenPopup = () => navigation.go('modals', 'popup');

  render() {
    const {id} = this.props;

    return (
      <View style={styles.wrap}>
        <AndroidBack id={id} onPress={this.onBackPress} />
        <Text>First/First scene</Text>
        <Button title={'Go to First/Second'} onPress={this.onGoToSecond} />
        <Button title={'Open Popup'} onPress={this.onOpenPopup} />
      </View>
    );
  }
}
