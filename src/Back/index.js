import { Component } from 'react';
import { BackHandler } from 'react-native';
import navigation from '../Navigation';

const toKey = (navigator, scene) => JSON.stringify([navigator, scene]);

const Back = (handler, source) => {
  const { navigator, scene } = source;
  Back.handlers[toKey(navigator, scene)] = handler;
  return handler;
};

Back.handlers = {};

export class AndroidBack extends Component {
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
    const current = navigation.current();
    if (!current) return true;
    const [navigator, scene] = current;
    const key = toKey(navigator, scene);
    if (!Back.handlers[key]) return true;
    Back.handlers[key]();
    return true;
  };

  render() {
    return null;
  }
}

export default Back;
