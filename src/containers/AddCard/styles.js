// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 100,
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
  },
  uploadView: {
    alignSelf: 'center',
    marginLeft: 70,
    marginTop: -30,
  },
  uploadIcon: {height: 30, width: 30},
  button: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.green,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin + Metrics.doubleBaseMargin,
    marginVertical: Metrics.smallMargin,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    padding: 12,
    marginTop: 3,
    fontFamily: Fonts.type.medium,
    // color: Colors.grey5,
    fontSize: Fonts.size.normal,
    marginVertical: 10,
  },
  Icon: {height: 20, width: 20},
  modalStyle: {
    width: Metrics.screenWidth,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
