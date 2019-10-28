import { Component } from 'react';
import { BackHandler } from 'react-native';
import Back from '../Back';

export default class AndroidBack extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => Back.back();

  render() {
    return null;
  }
}
