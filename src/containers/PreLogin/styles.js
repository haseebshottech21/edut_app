// @flow
import {StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: Colors.background.primary,
  },
  logo: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItem: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  icon: {
    marginRight: Metrics.baseMargin,
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  modalAgreementHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor: Colors.black,
  },
  acceptImage: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    borderRadius: 4,
    // tintColor: Colors.black
  },
  agreementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    height: 40,
  },
  acceptButton: {
    backgroundColor: Colors.blue,
  },
  modalButtonText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.Medium,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    backgroundColor: Colors.whit1,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  tickBox: {
    marginHorizontal: 10,
  },
  modalErrorMessages: {
    marginVertical: 5,
    alignSelf: 'center',
    color: Colors.red,
  },
});
