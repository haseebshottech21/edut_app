// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    //marginHorizontal: 10,
    // marginVertical: Metrics.smallMargin,
    borderColor: Colors.blue,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
    borderWidth: 0.5,
    padding: Metrics.baseMargin,
  },
  TabContainer: {
    // flex: 1,
    //  height: 30,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalStyle: {
    width: Metrics.screenWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    borderRadius: 20,
  },
  challengeModalStyle: {
    width: Metrics.screenWidth * 0.85,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
  },
  button: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItem: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.smallMargin + 5,
    width: Metrics.screenWidth * 0.5,
    marginVertical: Metrics.smallMargin,
    alignSelf: 'center',
  },
});
