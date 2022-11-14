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
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {INVALID_EMAIL_ERROR, INVALID_PASSWORD_ERROR} from '../../constants';
import {
  Text,
  ButtonView,
  CustomNavbar,
  Loader,
  Avatar,
  TextInput,
} from '../../components';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';

class TherapistEditProfile extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
  };
  emailValue = '';
  passwordValue = '';

  _onSubmitEmail = () => {
    this.password.focus();
  };
  _onSubmitPass = () => {
    Keyboard.dismiss();
  };

  componentDidMount() {
    console.log('sign up 1 did mount called');
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
    if (_.isEmpty(this.emailValue)) {
      // email is required

      errors.email = Util.isRequiredMessage('Email');
    } else if (!Util.isEmailValid(this.emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    } else if (_.isEmpty(this.passwordValue)) {
      errors.password = Util.isRequiredMessage('Password');
    } else if (!Util.isPasswordValid(this.passwordValue)) {
      errors.password = INVALID_PASSWORD_ERROR;
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
    const {navigation} = this.props;

    if (this._validateForm()) {
      // navigation.reset({
      //   routes: [{name: 'home'}],
      // });

      // this.email.blur();
      // this.password.blur();

      const payload = {
        email: this.emailValue,
        password: this.passwordValue,
        device_type: Platform.OS,
        // device_token: asd
      };
      Util.showLoader(this);
      // this.props.userSigninRequest(payload, data => {
      //   if (data) {
      //     DataHandler.loginOnApplozic(data);

      //     setTimeout(() => {
      //       Util.hideLoader(this);
      //       if (Util.userIsServiceProvider()) {
      //         Actions.reset('spdashboard');
      //       } else {
      //         Actions.reset('dashboard');
      //       }
      //     }, 1000);
      //   } else {
      //     Util.hideLoader(this);
      //   }
      // });
    }
  };
  renderLoginForm(errors) {
    const {navigation} = this.props;
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
        <Text
          color="black"
          size="xxSmall"
          style={{marginVertical: 10}}
          type="semi_bold">
          Select Date
        </Text>
        <View style={styles.input}>
          <DatePicker
            showIcon={false}
            style={{
              //width: Metrics.screenWidth * 0.8,
              marginTop: 10,
              // color: '#000',
              fontSize: 40,
            }}
            date={this.state.date}
            mode="date"
            placeholder={'Date'}
            format="DD-MM-YYYY"
            minDate="1900-05-01"
            maxDate={this.state.maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderWidth: 0,
                // borderBottomWidth: 2,
                borderColor: 'white',
                alignItems: 'flex-start',
              },
              dateText: {
                fontSize: Fonts.size.normal,
                fontFamily: Fonts.type.medium,
                color: Colors.black,
                textAlign: 'left',
              },
              placeholderText: {
                textAlign: 'left',
                fontSize: Fonts.size.normal,
                color: Colors.black,
              },
            }}
            onDateChange={date => {
              this.setState({date: date, showDateError: false});
            }}
          />
          <Image
            source={Images.calendar}
            style={{height: 20, width: 20, marginTop: 5}}
            resizeMode="contain"
          />
        </View>
        <Text
          color="black"
          size="xxSmall"
          style={{marginVertical: 10}}
          type="semi_bold">
          Select Time
        </Text>
        <View style={styles.input}>
          <DatePicker
            showIcon={false}
            style={{
              //  width: Metrics.screenWidth * 0.8,
              marginTop: 10,
              color: '#000',
              fontSize: 40,
            }}
            date={this.state.time}
            mode="time"
            placeholder={'Time'}
            format="hh:mm A"
            minDate="1900-05-01"
            maxDate={this.state.maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderWidth: 0,
                // borderBottomWidth: 2,
                borderColor: 'white',
                alignItems: 'flex-start',
              },
              dateText: {
                fontSize: Fonts.size.normal,
                fontFamily: Fonts.type.medium,
                color: Colors.black,
                textAlign: 'left',
              },
              placeholderText: {
                textAlign: 'left',
                fontSize: Fonts.size.normal,
                color: Colors.black,
              },
            }}
            onDateChange={time => {
              console.log('time....', time);
              this.setState({time: time, showDateError: false});
            }}
          />
          <Image
            source={Images.calendar}
            style={{height: 20, width: 20, marginTop: 5}}
            resizeMode="contain"
          />
        </View>

        <Text
          color="black"
          size="xxSmall"
          style={{marginVertical: 10}}
          type="semi_bold">
          No Of Hours
        </Text>
        <TextInput
          ref={ref => {
            this.password = ref;
          }}
          label=""
          error={errors.password}
          // onChangeText={value => this._onChange('password', value)}
          returnKeyType="done"
          onSubmitEditing={this._onSubmitPass}
          leftImage={Images.time}
          leftImageStyle={{height: 20, width: 20}}
          maxLength={2}
          keyboardType={'numeric'}
        />

        <ButtonView style={styles.button}>
          <Text
            textAlign="center"
            type="bold"
            size="large"
            style={{includeFontPadding: false}}>
            Submit
          </Text>
        </ButtonView>
      </View>
    );
  }
  renderFooter = () => {
    const {navigation} = this.props;
    return (
      <View
        style={{
          flex: 1,

          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={[AppStyles.flexRow, {}]}>
          <Text textAlign="center" size="small" color="black">
            Dont have an account?
          </Text>
          <ButtonView onPress={() => navigation.navigate('userRoles')}>
            <Text
              size="small"
              style={{marginLeft: 5, textDecorationLine: 'underline'}}
              color="blue">
              SIGNUP
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View style={AppStyles.mTop15}>
        <Avatar
          image={
            'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand'
          }
          style={{height: 100, width: 100, borderRadius: 50}}
          imageStyle={{height: 100, width: 100}}
        />

        <Text
          textAlign="center"
          color="black"
          size="large"
          type="semi_bold"
          style={AppStyles.mTop10}>
          John Doe
        </Text>
        <Text
          textAlign="center"
          color="black"
          size="xSmall"
          style={[AppStyles.marginHorizontalBase, AppStyles.mTop10]}
          noOfLines={2}>
          Hourly rate 50$
        </Text>
      </View>
    );
  };
  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Therapist"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          {this.renderHeader()}
          {this.renderLoginForm(errors)}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TherapistEditProfile);
