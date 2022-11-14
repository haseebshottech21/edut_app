// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    //backgroundColor: Colors.white1,
    // paddingTop: Metrics.screenHeight * 0.03,
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBottom: {},
  btnImage: {
    width: 25,
    height: 25,

    resizeMode: 'contain',
    //marginHorizontal: 20,
  },
  rightimage2: {
    width: 35,
    height: 35,
  },
  btnImage2: {
    width: Metrics.screenWidth * 0.35,
    height: Metrics.screenHeight * 0.08,
    marginLeft: 5,
    marginTop: 1,
    // width: 40,
    // height: 40,
    //  marginLeft: 5,
    //  marginTop: 1,
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 80,
  },
  btnWrapperprofile: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
});
