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
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {INVALID_EMAIL_ERROR, INVALID_PASSWORD_ERROR} from '../../constants';
import {
  Text,
  ButtonView,
  TextInput,
  CustomNavbar,
  Loader,
  Avatar,
} from '../../components';
import {Images, AppStyles, Metrics, Colors} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {verifyOtpRequest, resendOtpRequest} from '../../actions/UserActions';
import util from '../../util';

class OTP extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
    code: '',
    otpError: false,
  };

  passwordValue = '';
  newPasswordValue;

  _onSubmitPassword = () => {
    this.password.focus();
  };
  _onSubmitPassword = () => {
    this.newPasswordValue.focus();
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
    if (_.isEmpty(this.passwordValue)) {
      // email is required

      errors.password = Util.isRequiredMessage('Password');
    } else if (_.isEmpty(this.newPasswordValue)) {
      // invalid email
      errors.newPassword = Util.isRequiredMessage('Confirm password');
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
    if (this._validateForm()) {
      this.name.blur();
      this.email.blur();
      this.address.blur();

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
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop40]}>
        <View style={[AppStyles.pLeft5, AppStyles.pRight5]}>
          <TextInput
            ref={ref => {
              this.password = ref;
            }}
            label="Password"
            error={errors.password}
            autoCapitalize="none"
            onChangeText={value => this._onChange('password', value)}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={this._onSubmitName}
            rightImage={Images.pass_input}
            secureTextEntry
          />
          <TextInput
            ref={ref => {
              this.newPassword = ref;
            }}
            label="Confirm Password"
            error={errors.newPassword}
            keyboardType="email-address"
            onChangeText={value => this._onChange('newPassword', value)}
            returnKeyType="done"
            onSubmitEditing={this._onSubmitEmail}
            rightImage={Images.pass_input}
            secureTextEntry
          />

          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text textAlign="center" type="semi_bold" size="normal">
              Done
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  }
  verifyOtp() {
    const {navigation} = this.props;
    if (_.isEmpty(this.state.code)) {
      this.setState({otpError: true});
    } else if (this.state.code.length != 6) {
      this.setState({otpError: true});
    } else {
      this.setState({otpError: false}, () => {
        this.onVerifyOTP(this.props.route.params.screenName);
      });
    }
  }
  onVerifyOTP = forgotPass => {
    Util.showLoader(this);
    var screenName = this.props.route.params.screenName;
    if (screenName == 'forgotPass') {
      const payload = {
        email: this.props.route.params.email,
        otp: this.state.code,
        otp_type: 'forgot_otp',
      };
      this.props.verifyOtpRequest(payload, res => {
        if (res) {
          Util.hideLoader(this);
          this.props.navigation.navigate('newPass', {
            email: this.props.route.params.email,
            otp: this.state.code,
          });
        }
        Util.hideLoader(this);
      });
    } else if (screenName == 'signup') {
      const payload = {
        user_id: this.props.route.params.user_id,
        otp: this.state.code,
        otp_type: 'signup',
      };
      this.props.verifyOtpRequest(payload, res => {
        if (res) {
          Util.hideLoader(this);
          Util.topAlert('Please complete profile');
          this.props.navigation.navigate('completeProfile');
        }
        Util.hideLoader(this);
      });
    }
  };
  renderOTPVIEW = () => {
    const {navigation} = this.props;
    const {otpError} = this.state;
    return (
      <View>
        <OTPInputView
          style={{
            alignSelf: 'center',
            width: '90%',
            height: 100,
          }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            this.setState({code: code}, () => {
              this.verifyOtp();
            });
            //   console.log(`Code is ${code}, you are good to go!`);
          }}
          keyboardAppearance="dark"
        />
        {otpError && (
          <Text size="small" color="red" style={AppStyles.mLeft20}>
            Required valid OTP
          </Text>
        )}
        <Image
          source={Images.time}
          style={{alignSelf: 'center', height: 40, width: 40, marginTop: 20}}
        />
        <ButtonView style={styles.button} onPress={() => this.onResendOtp()}>
          <Text textAlign="center" type="bold" size="large">
            Resent code
          </Text>
        </ButtonView>
      </View>
    );
  };
  onResendOtp = () => {
    Util.showLoader(this);
    const payload = {
      user_id: this.props.route.params.user_id,
    };
    this.props.resendOtpRequest(payload, res => {
      if (res) {
        Util.topAlert(res.message);
        Util.hideLoader(this);
      }
      Util.hideLoader(this);
    });
  };
  renderFooter = () => {
    return (
      <SafeAreaView
        style={[
          AppStyles.flexRow,
          {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          },
        ]}>
        <Text textAlign="center" color="black">
          Dont receive code?
        </Text>
        <ButtonView>
          <Text style={{marginLeft: 5, textDecorationLine: 'underline'}}>
            Resent it
          </Text>
        </ButtonView>
      </SafeAreaView>
    );
  };
  ScreenHeader() {
    return (
      <Text
        textAlign="center"
        type="bold"
        size="large"
        style={AppStyles.mTop40}
        color="black">
        VERIFICATION
      </Text>
    );
  }
  render() {
    const {errors, loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <Image source={Images.spLogo} style={styles.logo} />
        {this.ScreenHeader()}
        {this.renderOTPVIEW()}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {verifyOtpRequest, resendOtpRequest};

export default connect(mapStateToProps, actions)(OTP);
