import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import config from '../../../../config';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: config.colors.greyLight,
    paddingTop: Platform.select({
      ios: getStatusBarHeight(),
      android: 0,
    }),
  },
});
