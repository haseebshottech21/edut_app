// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: Colors.background.primary,
  },
  profileContainer: {
    borderColor: Colors.blue,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  profileImage: {
    height: 80,
    width: 80,
    //  position: 'absolute',
  },
});
