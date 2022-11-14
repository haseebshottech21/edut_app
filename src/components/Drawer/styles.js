// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,

    borderTopRightRadius: 40,
    padding: Metrics.baseMargin,

    // width: Metrics.screenWidth - 80,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
});
