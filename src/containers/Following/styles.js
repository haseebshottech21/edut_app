// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    //marginHorizontal: 10,
    // marginVertical: Metrics.smallMargin,
    borderColor: Colors.blue,
    marginHorizontal: Metrics.doubleBaseMargin,
    marginVertical: Metrics.smallMargin,
    borderWidth: 0.5,
    padding: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  TabContainer: {
    overflow: 'hidden',
    // flex: 1,
    //  height: 30,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 8,
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
});
