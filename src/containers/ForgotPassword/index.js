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
import {forgotPasswordRequest} from '../../actions/UserActions';

class ForgotPassword extends Component {
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
    Keyboard.dismiss();
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
    if (_.isEmpty(this.emailValue)) {
      // email is required

      errors.email = Util.isRequiredMessage('Email');
    } else if (!Util.isEmailValid(this.emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
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
      Util.showLoader(this);

      //  navigation.navigate('otp', {isAuth: false});
      const payload = {
        email: this.emailValue,

        // device_token: asd
      };
      this.props.forgotPasswordRequest(payload, res => {
        if (res) {
          console.log(res, 'check');
          //  Util.hideLoader(this);
          navigation.navigate('otp', {
            screenName: 'forgotPass',
            email: res.email,
            user_id: res.id,
          });
        }
        Util.hideLoader(this);
      });
    }
  };

  renderLoginForm(errors) {
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
            returnKeyType="done"
            onSubmitEditing={this._onSubmitEmail}
            rightImage={Images.email_input}
          />

          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text textAlign="center" type="bold" size="large">
              Submit
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  }
  ScreenHeader() {
    return (
      <Text
        textAlign="center"
        type="bold"
        size="normal"
        style={AppStyles.mTop40}
        color="black">
        FORGOT PASSWORD
      </Text>
    );
  }
  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

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

const actions = {forgotPasswordRequest};

export default connect(mapStateToProps, actions)(ForgotPassword);
