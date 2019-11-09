import {Dimensions} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import color from 'chroma-js';

export default {
  tabBarHeight: getBottomSpace() + 80,
  dimensions: Dimensions.get('window'),
  colors: {
    primary: color('#555'),
    light: color('#fff'),
    greyLight: color('#eee'),
    grey: color('#aaa'),
    greyDark: color('#555'),
    darkLight: color('#333'),
    dark: color('#000'),
  },
};
