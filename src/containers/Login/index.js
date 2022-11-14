// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import {View, Image, Platform, ImageBackground, Keyboard} from 'react-native';
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
import {userSigninRequest} from '../../actions/UserActions';
import messaging from '@react-native-firebase/messaging';

class Login extends Component {
  state = {
    errors: {},
    loading: false,
  };
  _onSubmitEmail = () => {
    this.password.focus();
  };
  _onSubmitPass = () => {
    Keyboard.dismiss();
  };

  componentDidMount = () => {
    messaging()
      .getToken()
      .then(fcmToken => {
        //console.warn(“log”, fcmToken);
        if (fcmToken) {
          console.log('fcmTken', fcmToken);
          this.setState({device_token: fcmToken});
          // console.log('token', this.state.device_token);

          // user has a device token
        } else {
          // console.log('device has no token');
        }
        return fcmToken;
      });
  };
  GotoRoute = remoteMessage => {};
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
      this.email.blur();
      this.password.blur();

      const payload = {
        email: this.emailValue,
        password: this.passwordValue,
        device_type: Platform.OS,
        device_token: this.state.device_token ? this.state.device_token : 'abc',
      };
      Util.showLoader(this);
      this.props.userSigninRequest(payload, data => {
        if (data) {
          setTimeout(() => {
            Util.hideLoader(this);
            if (data.email_verified == 0) {
              this.props.navigation.navigate('otp', {
                screenName: 'signup',
                email: data.email,
                user_id: data.id,
              });
            } else if (data.profile_complete == null) {
              this.props.navigation.navigate('completeProfile');
              // this.props.navigation.navigate('therapistSignUP');
            } else {
              Util.hideLoader(this);
              setTimeout(() => {
                navigation.reset({
                  routes: [{name: 'home'}],
                });
              }, 1500);
            }
            // Util.hideLoader(this);
            // if (Util.userIsServiceProvider()) {
            //   navigation.reset({
            //     routes: [{name: 'home'}],
            //   });
            // } else {
            //   navigation.reset({
            //     routes: [{name: 'home'}],
            //   });
            // }
          }, 1000);
        } else {
          Util.hideLoader(this);
        }
      });
    }
  };
  renderLoginForm(errors) {
    const {navigation} = this.props;
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop40]}>
        <View style={[AppStyles.pLeft5, AppStyles.pRight5]}>
          <TextInput
            ref={ref => {
              this.email = ref;
            }}
            label="Email"
            error={errors.email}
            autoCapitalize="none"
            onChangeText={value => this._onChange('email', value)}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={this._onSubmitEmail}
            rightImage={Images.email_input}
          />
          <TextInput
            ref={ref => {
              this.password = ref;
            }}
            label="Password"
            error={errors.password}
            onChangeText={value => this._onChange('password', value)}
            returnKeyType="done"
            onSubmitEditing={this._onSubmitPass}
            rightImage={Images.pass_input}
            secureTextEntry
          />
          <ButtonView onPress={() => navigation.navigate('forgotPass')}>
            <Text
              size="xSmall"
              style={{marginLeft: 5, textDecorationLine: 'underline'}}
              color="blue"
              textAlign="right"
              type="bold">
              FORGOT PASSWORD ?
            </Text>
          </ButtonView>

          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text
              textAlign="center"
              type="bold"
              size="large"
              style={{includeFontPadding: false}}>
              Login
            </Text>
          </ButtonView>
        </View>
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
          <ButtonView onPress={() => navigation.navigate('signup')}>
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
  ScreenHeader() {
    return (
      <Text
        textAlign="center"
        type="bold"
        size="xLarge"
        style={AppStyles.mTop40}
        color="black">
        Login
      </Text>
    );
  }
  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground style={styles.container} source={{}}>
        <Image source={Images.spLogo} style={styles.logo} />
        {this.ScreenHeader()}
        {this.renderLoginForm(errors)}
        {this.renderFooter()}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {userSigninRequest};

export default connect(mapStateToProps, actions)(Login);
