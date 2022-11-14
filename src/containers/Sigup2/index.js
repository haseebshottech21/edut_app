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
import {selectUserType} from '../../actions/UserActions';

class SignUPTWO extends Component {
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
    alert('soon');
    // const {navigation, route} = this.props;
    // const {userType} = route.params;
    // this.props.selectUserType('therapist');
    // setTimeout(() => {
    //   navigation.reset({
    //     routes: [{name: 'home'}],
    //     params: userType,
    //   });
    // }, 0);

    if (this._validateForm()) {
      // this.password.blur();

      // const payload = {
      //   email: this.emailValue,
      //   password: this.passwordValue,
      //   device_type: Platform.OS,
      //   // device_token: asd
      // };
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
            onChangeText={value => this._onChange('newPassword', value)}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            rightImage={Images.pass_input}
            secureTextEntry
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
            <Text textAlign="center" type="semi_bold" size="normal">
              Done
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  }

  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <CustomNavbar
          title="Enter Password"
          hasBack={Platform.OS == 'ios' ? true : false}
          leftBtnPress={() => navigation.goBack()}
        />
        <Image source={Images.spLogo} style={styles.logo} />
        {this.renderLoginForm(errors)}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {selectUserType};

export default connect(mapStateToProps, actions)(SignUPTWO);
