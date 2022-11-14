// @flow
import _, {times} from 'lodash';
import {connect} from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  City,
  State,
} from '../../constants';
import {Text, ButtonView, CustomNavbar, Loader, Avatar} from '../../components';
import {Images, AppStyles, Metrics, Colors} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {Picker} from '@react-native-picker/picker';
import {color} from 'react-native-reanimated';
import {bookSessionRequest} from '../../actions/UserActions';
import util from '../../util';
import {
  createcardRequest,
  createtokenRequest,
  getCardListRequest,
  deleteCardRequest,
} from '../../actions/StripeActions';
class Payments extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
    modal: false,
    cardNo: '',
    month: '',
    year: '',
    cvv: '',
    data: [],
  };

  password;

  nameValue = '';
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  fetchData = () => {
    //  util.showLoader(this);
    this.props.getCardListRequest({}, res => {
      if (res) {
        util.hideLoader(this);
        this.setState({data: res});
      }
      util.hideLoader(this);
    });
  };
  deleCard = item => {
    const payload = {
      card_id: item.id,
    };
    this.props.deleteCardRequest(payload, res => {
      if (res) {
        this.fetchData();
      }
    });
  };

  _onChange = (element, value) => {
    const valueRef = `${element}Value`;
    this[valueRef] = value;

    if (!_.isEmpty(this.state.errors)) {
      this.setState({
        errors: {...this.state.errors, ...{[element]: ''}},
      });
    }
  };

  getDots = () => {
    return [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1].map(a => {
      return (
        <View
          style={{
            backgroundColor: a == 1 ? 'blue' : 'white',
            width: 5,
            height: 5,
            borderRadius: 5 / 1,
            marginLeft: 1,
          }}
        />
      );
    });
  };
  confirmbooking = item => {
    const {date, hours, id, time, total} = this.props.route.params;
    util.showLoader(this);
    const payload = {
      therapist_id: id,
      booking_date: date,
      start_time: time,
      total: total,
      no_hours: hours,
      card_id: item.id,
    };
    this.props.bookSessionRequest(payload, res => {
      if (res) {
        util.topAlert('Session Booked Successfully');
        util.hideLoader(this);
      }
      util.hideLoader(this);
    });
  };
  renderCads = item => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 30,
            paddingVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: Colors.blue,
            borderWidth: 1,
            marginTop: 20,
          }}
          onPress={
            this.props.route.params !== undefined
              ? () =>
                  Alert.alert(
                    'Confirmation',
                    'Are You sure to make Payment',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'confirm',
                        onPress: () => this.confirmbooking(item),
                      },
                    ],
                    {cancelable: false},
                  )
              : null
          }>
          {this.getDots()}
          <Text style={{marginLeft: 15, fontWeight: '500'}} color="blue">
            {item.last4}
          </Text>
          <ButtonView
            style={{
              marginLeft: 20,
              alignItems: 'center',
              backgroundColor: Colors.blue,
              paddingVertical: 10,
              borderRadius: 20,
              width: 70,
            }}
            onPress={() => this.deleCard(item)}>
            <Text color="white" size="xxxSmall" type="bold">
              Delete
            </Text>
          </ButtonView>
        </TouchableOpacity>
      </View>
    );
  };
  renderModal = () => {
    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({modal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <View
            style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
            <Text
              type="bold"
              size="small"
              style={AppStyles.mBottom10}
              color="blue"
              textAlign="center">
              ADD CARD
            </Text>
            <TextInput
              placeholder={'Card Number'}
              onChangeText={value => this.setState({cardNo: value})}
              label={'Card Number'}
              keyboardType="number-pad"
              borderHeight={0}
              underlineColorAndroid="transparent"
              style={{
                alignSelf: 'center',
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '80%',
                borderColor: 'gray',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              placeholderTextColor={Colors.gray}
              value={this.state.cardNo}
            />

            <TextInput
              //value={'exp'}
              onChangeText={value => this.setState({month: value})}
              placeholder={'Expiry Month'}
              keyboardType="number-pad"
              borderHeight={0}
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.gray}
              style={{
                marginTop: 15,
                alignSelf: 'center',
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '80%',
                borderColor: 'gray',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              placeholderTextColor={Colors.gray}
              value={this.state.month}

              // inputPadding={10}
            />
            <TextInput
              //value={'exp'}
              onChangeText={exp => this.setState({year: exp})}
              placeholder={'Expiry Year'}
              keyboardType="number-pad"
              borderHeight={0}
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.gray}
              style={{
                marginVertical: 15,
                alignSelf: 'center',
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '80%',
                borderColor: 'gray',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              placeholderTextColor={Colors.gray}
              value={this.state.year}
              // inputPadding={10}
            />
            <TextInput
              placeholder={'cvv'}
              onChangeText={cvv => this.setState({cvv: cvv})}
              label={'CVV'}
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.gray}
              style={{
                alignSelf: 'center',
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '80%',
                borderColor: 'gray',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              placeholderTextColor={Colors.gray}
              value={this.state.cvv}
            />

            <ButtonView
              onPress={this._onSubmit}
              style={styles.button}
              // onPress={() => this.setState({modal: false})}
            >
              <Text textAlign="center" type="bold" size="normal">
                Submit
              </Text>
            </ButtonView>
          </View>
        </View>
      </Modal>
    );
  };

  _onSubmit = () => {
    const {year, month, cvv, cardNo} = this.state;
    if (cardNo == '') {
      util.topAlertError('Please input card no');
    } else if (month == '') {
      util.topAlertError('Please input Expiry Month');
    } else if (year == '') {
      util.topAlertError('Please input Expiry year');
    } else if (cvv == '') {
      util.topAlertError('Please input CVV no');
    } else {
      const formData = new FormData();
      formData.append('card[number]', cardNo);
      formData.append('card[exp_month]', month);
      formData.append('card[exp_year]', year);
      formData.append('card[cvc]', cvv);
      let cardData = {
        'card[number]': cardNo,
        'card[exp_month]': month,
        'card[exp_year]': year,
        'card[cvc]': cvv,
      };
      var formBody = [];
      for (var property in cardData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(cardData[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      this.props.createtokenRequest(formBody, res => {
        console.log(res);

        const payload = {
          source: res,
        };
        var NewformBody = [];
        for (var property in payload) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(payload[property]);
          NewformBody.push(encodedKey + '=' + encodedValue);
        }
        NewformBody = NewformBody.join('&');
        this.props.createcardRequest(NewformBody, res => {
          if (res) {
            this.setState({modal: false}, () => {
              util.topAlert('card Added Successfully');
              this.fetchData();
            });
          }
        });
      });
    }
  };

  renderHeader = () => {
    return (
      <View style={{marginHorizontal: Metrics.baseMargin, marginTop: 20}}>
        <Text color="blue" type="bold">
          Payments Method
        </Text>
      </View>
    );
  };

  renderItem = ({item, index}) => {
    return <View style={{alignItems: 'center'}}>{this.renderCads(item)}</View>;
  };
  render() {
    const {errors, loading} = this.state;
    //const {name} = this.props.route.params;
    console.log(this.props.route.params);
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Payments"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => {
            this.props.navigation.openDrawer();
          }}
          rightBtnImage={Images.profile_select}
          rightBtnPress={() => this.setState({modal: true})}
          imageStyle={{height: 30, width: 30}}
        />
        {this.renderHeader()}
        {/*this.renderCads()*/}
        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          data={this.state.data}
          renderItem={this.renderItem}
          // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
          showsVerticalScrollIndicator={false}
          onRefresh={this.fetchData}
          refreshing={loading}
        />

        {this.renderModal()}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
});

const actions = {
  bookSessionRequest,
  createcardRequest,
  createtokenRequest,
  getCardListRequest,
  deleteCardRequest,
};

export default connect(mapStateToProps, actions)(Payments);
