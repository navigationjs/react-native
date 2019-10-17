import { Component } from 'react';
import { BackHandler } from 'react-native';
import navigation from '../Navigation';

export default class Back extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    navigation.back();
    return true;
  };

  render() {
    return null;
  }
}
