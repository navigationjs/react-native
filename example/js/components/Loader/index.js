import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

export default class Loader extends Component {
  render() {
    return <ActivityIndicator style={{flex: 1}} {...this.props} />;
  }
}
