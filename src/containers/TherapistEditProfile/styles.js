// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    //  backgroundColor: 'red',

    flex: 1,
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
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Metrics.textInputBorder,
    padding: 15,
    height: 50,
    marginTop: 3,
    // color: Colors.grey5,
    //marginVertical: 10,
  },
  button: {
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
  },
  Icon: {height: 20, width: 20},
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
