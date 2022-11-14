// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 100,
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin + Metrics.doubleBaseMargin,
    marginVertical: Metrics.smallMargin,
  },
  icon: {
    marginRight: Metrics.smallMargin,
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
