// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  local: {
    flex: 1,
  },
  remoteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  remote: {
    width: 120,
    height: 120,
  },
});
