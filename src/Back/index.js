import { Component } from 'react';
import { BackHandler } from 'react-native';
import navigation from '../Navigation';

export default class Back extends Component {
  static handlers = {};

  static addHandler = (navigator, scene, handler) => {
    Back.handlers[navigation.toKey(navigator, scene)] = handler;
  };

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
    const navigatorName = navigation.chain[navigation.chain.length - 1];
    if (!navigatorName) return true;
    const navigator = navigation.navigators[navigatorName];
    if (!navigator) return true;
    const sceneName = navigator.chain[navigator.chain.length - 1];
    if (!sceneName) return true;
    const scene = navigator.scenes[sceneName];
    if (!scene) return true;
    const key = navigation.toKey(navigatorName, sceneName);
    if (!Back.handlers[key]) return true;
    return Back.handlers[key]();
  };

  render() {
    return null;
  }
}
