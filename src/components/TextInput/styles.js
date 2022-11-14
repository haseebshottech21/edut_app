// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    padding: 12,
    marginTop: 3,
    // fontFamily: Fonts.type.medium,
    // color: Colors.grey5,
    //  fontSize: Fonts.size.normal,
    marginVertical: 10,
  },
  input: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    padding: Metrics.baseMargin,
    marginTop: 3,
    fontFamily: Fonts.type.medium,
    color: Colors.grey5,
    fontSize: Fonts.size.normal,
    marginVertical: 10,
  },
  androidInput: {
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    marginTop: 3,
    fontFamily: Fonts.type.medium,
    color: Colors.grey5,
    fontSize: Fonts.size.normal,
    marginVertical: 10,
  },
  buttonOverlay: {
    //  marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
});
