// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    //marginHorizontal: 10,
    // marginVertical: Metrics.smallMargin,
    borderColor: Colors.blue,
    marginHorizontal: Metrics.doubleBaseMargin,
    marginVertical: Metrics.smallMargin,
    borderWidth: 0.5,
    padding: Metrics.baseMargin,
  },
});
