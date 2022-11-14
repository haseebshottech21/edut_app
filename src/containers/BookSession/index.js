// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  DATE_FORMAT_TIME1,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
  POST_LIST,
  TIME_FORMAT1,
  TIME_FORMAT2,
} from '../../constants';
import {
  Text,
  ButtonView,
  TextInput,
  CustomNavbar,
  Loader,
  Avatar,
} from '../../components';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import ReactNativePickerModule from 'react-native-picker-module';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import util from '../../util';
import {updateBookSessionRequest} from '../../actions/UserActions';

class BookSession extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();
    const {date, Selectedtime, no_hours} = this.props.route.params;

    this.state = {
      errors: {},
      city: 'City',
      postModal: false,
      moods: ['Anxiety', 'Depression', 'Tention'],
      selectedMood: 'Anxiety',
      showDropDown: false,
      date: date == undefined ? '' : date,
      Selectedtime: Selectedtime == undefined ? '' : Selectedtime,
      hours: no_hours == undefined ? '' : no_hours,
    };
  }

  passwordValue = '';
  newPasswordValue;

  _onSubmitPassword = () => {
    this.password.focus();
  };
  _onSubmitPassword = () => {
    this.newPasswordValue.focus();
  };

  componentDidMount() {
  }

  _onChange = (element, value) => {
    const valueRef = `${element}Value`;
    this[valueRef] = value;

    if (!_.isEmpty(this.state.errors)) {
      this.setState({
        errors: {...this.state.errors, ...{[element]: ''}},
      });
    }
  };

  _validateForm() {
    const errors = {};
    if (_.isEmpty(this.passwordValue)) {
      errors.password = Util.isRequiredMessage('Password');
    } else if (!Util.isPasswordValid(this.passwordValue)) {
      errors.password = INVALID_PASSWORD_ERROR;
    } else if (this.passwordValue !== this.newPasswordValue) {
      errors.newPassword = 'password not match ';
    }

    if (!_.isEmpty(errors)) {
      this[_.keys(errors)[0]].focus();
      this.setState({
        errors,
      });

      return false;
    }

    return true;
  }

  _onSubmit = () => {
    const {date, Selectedtime, hours} = this.state;
    if (date == '') {
      util.topAlertError('Please Select Date Of Booking');
    } else if (Selectedtime == '') {
      util.topAlertError('Please Select Time Of Booking');
    } else if (hours == '') {
      util.topAlertError('Please Select Hours Of Booking');
    } else {
      if (this.props.route.params.disable) {
        util.showLoader(this);
        const payload = {
          therapist_id: this.props.route.params.therapist_id,
          booking_date: date,
          start_time: Selectedtime,
          total: hours * this.props.route.params.hoursRate,
          no_hours: hours,
          booking_id: this.props.route.params.booking_id,
        };
        this.props.updateBookSessionRequest(payload, res => {
          if (res) {
            this.props.navigation.goBack();
            util.hideLoader(this);
          }
        });
      } else {
        this.props.navigation.navigate('paymentsTherapist', {
          id: this.props.route.params.id,
          date: date,
          time: Selectedtime,
          hours: hours,
          total: hours * this.props.route.params.hoursRate,
        });
      }
    }
  };

  renderUploadImage = () => {
    const {image} = this.props.route.params;

    return (
      <View style={{marginTop: Metrics.doubleBaseMargin}}>
        <Avatar image={image} />
      </View>
    );
  };
  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;
    const {name, hoursRate} = this.props.route.params;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Schedule"
          hasBack={true}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {this.renderUploadImage()}
        <Text
          textAlign="center"
          color="black"
          size="large"
          type="semi_bold"
          style={AppStyles.mTop10}>
          {name}
        </Text>
        <Text
          textAlign="center"
          color="black"
          size="small"
          type="medium"
          style={AppStyles.mTop10}>
          Hourly Rate ${hoursRate}
        </Text>

        <View
          style={{
            alignItems: 'flex-start',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text
            textAlign="center"
            color="black"
            size="small"
            type="medium"
            style={AppStyles.mTop10}>
            Select Date
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <DatePicker
              showIcon={false}
              style={{
                width: Metrics.screenWidth * 0.88,
                marginVertical: 10,
                color: '#000',
                fontSize: 40,
              }}
              date={this.state.date}
              mode="date"
              placeholder={'Select Date'}
              format="YYYY-MM-DD"
              minDate="1900-12-11"
              //  maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  //   flex: 1,
                  height: 50,
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  backgroundColor: Colors.white,
                  borderRadius: Metrics.textInputBorder,
                  //   // marginTop: 3,
                  //   fontFamily: Fonts.type.medium,
                  //   color: Colors.grey5,
                  //   fontSize: Fonts.size.normal,
                  marginVertical: 10,
                  borderColor: 'white',
                  alignSelf: 'center',
                },

                dateText: {
                  fontSize: Fonts.size.small,
                  fontFamily: Fonts.type.medium,
                  color: Colors.black,
                },
                placeholderText: {
                  fontSize: Fonts.size.normal,
                  color: '#A7A7A7',
                },
              }}
              onDateChange={date => {
                this.setState({date: date, showDateError: false});
              }}
            />
            <Image
              source={Images.calendar}
              style={{
                position: 'absolute',
                right: 10,
                top: 15,
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            textAlign="center"
            color="black"
            size="small"
            type="medium"
            style={AppStyles.mTop10}>
            Select Time
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <DatePicker
              showIcon={false}
              style={{
                width: Metrics.screenWidth * 0.88,
                marginVertical: 10,
                color: '#000',
                fontSize: 40,
              }}
              date={this.state.Selectedtime}
              mode="time"
              placeholder={'Select Time'}
              format={TIME_FORMAT2}
              minDate="1900-12-11"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  //   flex: 1,
                  height: 50,
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  backgroundColor: Colors.white,
                  borderRadius: Metrics.textInputBorder,
                  //   // marginTop: 3,
                  //   fontFamily: Fonts.type.medium,
                  //   color: Colors.grey5,
                  //   fontSize: Fonts.size.normal,
                  marginVertical: 10,
                  borderColor: 'white',
                  alignSelf: 'center',
                },

                dateText: {
                  fontSize: Fonts.size.small,
                  fontFamily: Fonts.type.medium,
                  color: Colors.black,
                },
                placeholderText: {
                  fontSize: Fonts.size.normal,
                  color: '#A7A7A7',
                },
              }}
              onDateChange={date => {
                this.setState({Selectedtime: date, showDateError: false});
              }}
            />
            <Image
              source={Images.time}
              style={{
                position: 'absolute',
                right: 10,
                bottom: 20,
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            textAlign="center"
            color="black"
            size="small"
            type="medium"
            style={AppStyles.mTop10}>
            No. of hours
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <RNTextInput
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: Colors.white,
                width: Metrics.screenWidth - 50,
                borderRadius: 20,
                color: 'black',
                textAlignVertical: 'top',
                alignSelf: 'center',
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
              placeholder={`No Of hours `}
              placeholderTextColor={Colors.gray}
              keyboardType={'numeric'}
              onChangeText={value => this.setState({hours: value})}
              value={this.state.hours}
              editable={this.props.route.params.disable ? false : true}
            />
            <Image
              source={Images.time}
              style={{
                position: 'absolute',
                right: 10,
                bottom: 20,
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            height: 40,
            justifyContent: 'center',
            marginHorizontal: 20,
            borderRadius: 20,
          }}
          onPress={() => this._onSubmit()}>
          <Text
            color="white"
            size="small"
            type="bold"
            // onPress={() => this.setState({modal: false})}
          >
            Submit
          </Text>
        </ButtonView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user,
});
const actions = {updateBookSessionRequest};

export default connect(mapStateToProps, actions)(BookSession);
