// @flow
import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  button: {
    marginTop: Metrics.doubleBaseMargin + 20,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    color: Colors.black,
    backgroundColor: Colors.white,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
  },
});
