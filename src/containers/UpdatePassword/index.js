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
  // TextInput,
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
import {updatePasswordRequest} from '../../actions/UserActions';

class UpdatePassword extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  passwordValue = '';
  newPasswordValue = '';
  confirmPasswordValue = '';

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
    this.setState({valueRef: value});

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
      errors.newPassword = Util.isRequiredMessage('New password');
    } else if (!Util.isPasswordValid(this.newPasswordValue)) {
      // invalid password
      errors.newPassword = INVALID_PASSWORD_ERROR;
    } else if (this.newPasswordValue !== this.confirmPasswordValue) {
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
    const {navigation} = this.props;

    if (this._validateForm()) {
      Util.showLoader(this);
      //  navigation.navigate('login');
      // this.newPassword.blur();

      const payload = {
        old_password: this.passwordValue,
        new_password: this.newPasswordValue,
        // device_token: asd
      };
      // Util.showLoader(this);
      this.props.updatePasswordRequest(payload, data => {
        if (data) {
          setTimeout(() => {
            Util.hideLoader(this);

            Util.topAlert('Your Password has been Updated Successfully');
            navigation.navigate('home');
          }, 500);
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
            label="Old Password"
            error={errors.password}
            autoCapitalize="none"
            onChangeText={value => this._onChange('password', value)}
            returnKeyType="next"
            onSubmitEditing={this._onSubmitName}
            secureTextEntry={true}
          />
          <TextInput
            ref={ref => {
              this.newPassword = ref;
            }}
            label="New Password"
            error={errors.newPassword}
            onChangeText={value => this._onChange('newPassword', value)}
            returnKeyType="done"
            onSubmitEditing={this._onSubmitEmail}
            secureTextEntry
          />
          <TextInput
            ref={ref => {
              this.confirmPassword = ref;
            }}
            label="Confirm Password"
            error={errors.confirmPassword}
            onChangeText={value => this._onChange('confirmPassword', value)}
            returnKeyType="done"
            onSubmitEditing={this._onSubmitEmail}
            secureTextEntry
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
        size="large"
        style={AppStyles.mTop40}
        color="black">
        Change Password
      </Text>
    );
  }

  render() {
    const {errors, loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <CustomNavbar
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <Image source={Images.spLogo} style={styles.logo} />
        {this.ScreenHeader()}
        {this.renderLoginForm(errors)}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {updatePasswordRequest};

export default connect(mapStateToProps, actions)(UpdatePassword);
