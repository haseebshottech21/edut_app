// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {width: 96, height: 112},
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
  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 100,
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
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
  VehicleInput: {
    width: Metrics.screenWidth - 40,
    //flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    padding: 15,
    marginTop: 3,
    fontFamily: Fonts.type.medium,
    // color: Colors.grey5,
    fontSize: Fonts.size.normal,
    marginVertical: 10,
  },
  uploadView: {
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: 70,
    marginTop: -25,
    borderRadius: 20,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {backgroundColor: 'white', height: 10, width: 10},
});
