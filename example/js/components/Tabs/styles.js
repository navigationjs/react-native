import {StyleSheet} from 'react-native';
import config from '../../config';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: config.tabBarHeight,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: config.colors.greyDark,
    backgroundColor: config.colors.light,
  },
});
