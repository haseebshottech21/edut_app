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
import {resetPasswordRequest} from '../../actions/UserActions';
class NewPassword extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
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
    } else if (!Util.isPasswordValid(this.passwordValue)) {
      // invalid password
      errors.password = INVALID_PASSWORD_ERROR;
    } else if (_.isEmpty(this.newPasswordValue)) {
      // invalid email
      errors.newPassword = Util.isRequiredMessage('New password');
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
    const {navigation} = this.props;

    if (this._validateForm()) {
      Util.showLoader(this);
      //  navigation.navigate('login');
      // this.newPassword.blur();

      const payload = {
        otp: this.props.route.params.otp,
        new_password: this.newPasswordValue,
        email: this.props.route.params.email,
        // device_token: asd
      };
      // Util.showLoader(this);
      this.props.resetPasswordRequest(payload, data => {
        if (data) {
          Util.hideLoader(this);
          navigation.reset({
            routes: [{name: 'auth'}],
          });
        } else {
          Util.hideLoader(this);
        }
      });
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
            label="New Password"
            error={errors.password}
            autoCapitalize="none"
            onChangeText={value => this._onChange('password', value)}
            returnKeyType="next"
            onSubmitEditing={() => this.newPassword.focus()}
            rightImage={Images.pass_input}
            secureTextEntry
          />
          <TextInput
            ref={ref => {
              this.newPassword = ref;
            }}
            label="Confirm New Password"
            error={errors.newPassword}
            keyboardType="email-address"
            onChangeText={value => this._onChange('newPassword', value)}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            rightImage={Images.pass_input}
            secureTextEntry
          />

          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text textAlign="center" type="bold" size="normal">
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
        size="large"
        style={AppStyles.mTop40}
        color="black">
        Enter Password
      </Text>
    );
  }

  render() {
    const {errors, loading} = this.state;

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

const actions = {resetPasswordRequest};

export default connect(mapStateToProps, actions)(NewPassword);
