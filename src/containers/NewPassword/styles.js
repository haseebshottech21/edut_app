// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: Metrics.ratio(30),
  },
  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  lineThrough: {
    height: 0.5,
    backgroundColor: Colors.grey4,
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
  },
  ORTextWrapper: {
    backgroundColor: Colors.white,
    width: 110,
    alignSelf: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    ...AppStyles.mLeft10,
    ...AppStyles.mRight10,
  },

  button: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
  },
});
