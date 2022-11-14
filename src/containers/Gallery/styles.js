// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  cancelImageContainer: {
    top: 40,
    position: 'absolute',
    //  alignItems: 'center',
    //  justifyContent: 'center',
    overflow: 'visible',
    borderRadius: 22,
    // backgroundColor: 'red',
    backgroundColor: '#f3f3fe',
    alignSelf: 'flex-end',
    zIndex: 222,
  },
  cancelImage: {height: 40, width: 40},
});
