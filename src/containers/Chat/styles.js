// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Fonts, Metrics, vh} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    flex: 1,
  },
  // imageStyle: {height: 681 / 1.5, width: 375 / 1.5},
  imageStyle: {alignSelf: 'flex-end', height: 200, width: 180},

  inputStyle: {fontSize: 16, color: Colors.black},
  inputContainer: {
    shadowColor: '#00000026',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,

    elevation: 5,
    borderRadius: 5,
    borderColor: 'transparent',
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.white,
  },
  listView: {
    ...Platform.select({
      android: {
        marginBottom: 3 * vh,
        marginTop: 2 * vh,
      },
      ios: {
        marginBottom: 2 * vh,
        marginTop: 1 * vh,
      },
    }),
  },
});
