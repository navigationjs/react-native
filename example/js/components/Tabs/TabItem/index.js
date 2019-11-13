import React, {Component} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import config from '../../../config';
import styles from './styles';

export default class TabItem extends Component {
  state = {active: this.props.active._value === 1};

  componentDidMount() {
    const {active} = this.props;
    active.addListener(({value}) => {
      if (value === 1) this.setState({active: true});
      else if (value === 0) this.setState({active: false});
    });
  }
  render() {
    const {title, onPress} = this.props;
    const {active} = this.state;

    return (
      <TouchableOpacity onPress={onPress} style={styles.wrap}>
        <Animated.Text
          style={[
            styles.title,
            {
              color: active
                ? config.colors.grey.hex()
                : config.colors.dark.hex(),
            },
          ]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
}
