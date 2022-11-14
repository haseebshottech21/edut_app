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
  PermissionsAndroid,
  Keyboard,
  KeyboardAvoidingView,
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
import Modal from 'react-native-modal';

import {Picker} from '@react-native-picker/picker';
import ReactNativePickerModule from 'react-native-picker-module';
import ActionSheetCustom from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {userSignupRequest} from '../../actions/UserActions';
class SignUP extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();
    this.state = {
      errors: {},
      loading: false,
    };
  }
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };

  passwordValue = '';
  emailValue = '';
  _onSubmitName = () => {
    this.email.focus();
  };
  _onSubmitEmail = () => {
    this.address.focus();
  };

  componentDidMount() {
    console.log('sign up 1 did mount called');
  }
  _onSubmitPassword = () => {
    this.password.blur();
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

  _validateForm() {
    const {navigation, route} = this.props;
    const errors = {};
    const {vehicleType} = this.state;
    if (_.isEmpty(this.emailValue)) {
      // invalid email
      errors.email = Util.isRequiredMessage('Email');
    } else if (!Util.isEmailValid(this.emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    } else if (_.isEmpty(this.passwordValue)) {
      errors.password = Util.isRequiredMessage('Password');
    } else if (!Util.isPasswordValid(this.passwordValue)) {
      // invalid password
      errors.password = INVALID_PASSWORD_ERROR;
    } else if (this.passwordValue !== this.confirmPasswordValue) {
      errors.confirmPassword = 'password not match ';
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
    const {navigation, route} = this.props;
    if (this._validateForm()) {
      const payload = {
        email: this.emailValue,
        password: this.passwordValue,
        device_type: Platform.OS,
        device_token: 'sajdgafad',
      };
      Util.showLoader(this);
      //  navigation.navigate('otp', {isAuth: true});
      this.props.userSignupRequest(payload, res => {
        if (res) {
          console.log(res, 'checkkkkk');
          setTimeout(() => {
            navigation.navigate('otp', {
              screenName: 'signup',
              email: res.email,
              user_id: res.id,
            });
          }, 500);
          // this.setState({modal: true});
        }
        Util.hideLoader(this);
      });
    }
  };

  ScreenHeader() {
    return (
      <Text
        textAlign="center"
        type="bold"
        size="xLarge"
        style={AppStyles.mTop40}
        color="black">
        SignUp
      </Text>
    );
  }
  renderLoginForm(errors) {
    const {navigation, route} = this.props;
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
        <View style={[AppStyles.pLeft5, AppStyles.pRight5]}>
          <TextInput
            ref={ref => {
              this.email = ref;
            }}
            label="Email"
            error={errors.email}
            keyboardType="email-address"
            onChangeText={value => this._onChange('email', value)}
            returnKeyType="done"
            // onSubmitEditing={this._onSubmitEmail}
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
            //  onSubmitEditing={this._onSubmitEmail}
            secureTextEntry
            rightImage={Images.pass_input}
          />
          <TextInput
            ref={ref => {
              this.confirmPassword = ref;
            }}
            label="Confirm Password"
            error={errors.confirmPassword}
            onChangeText={value => this._onChange('confirmPassword', value)}
            returnKeyType="done"
            // onSubmitEditing={this._onSubmitEmail}
            secureTextEntry
            rightImage={Images.pass_input}
          />
        </View>
        <ButtonView onPress={this._onSubmit} style={styles.button}>
          <Text
            textAlign="center"
            type="bold"
            size="large"
            style={{includeFontPadding: false}}>
            Signup
          </Text>
        </ButtonView>
      </View>
    );
  }

  render() {
    const {errors, loading} = this.state;
    const {navigation, route} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <Image source={Images.spLogo} style={styles.logo} />
        {this.ScreenHeader()}
        {this.renderLoginForm(errors)}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {userSignupRequest};

export default connect(mapStateToProps, actions)(SignUP);
