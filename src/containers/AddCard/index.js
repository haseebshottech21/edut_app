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
  TextInput as RNTextinput,
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
import {color} from 'react-native-reanimated';

class AddCard extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
  };

  password;

  nameValue = '';

  _onSubmitName = () => {
    this.password.focus();
  };
  _onSubmitEmail = () => {
    this.address.focus();
  };

  componentDidMount() {
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
    const errors = {};
    if (_.isEmpty(this.nameValue)) {
      // email is required

      errors.name = Util.isRequiredMessage('Card No');
    }
    if (_.isEmpty(this.passwordValue)) {
      // invalid email
      errors.email = Util.isRequiredMessage('Password');
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
    navigation.navigate('wallet');
    // if (this._validateForm()) {
    //   navigation.navigate('home');
    //   // this.name.blur();
    //   // this.email.blur();
    //   // this.address.blur();

    //   const payload = {
    //     email: this.emailValue,
    //     password: this.passwordValue,
    //     device_type: Platform.OS,
    //     // device_token: asd
    //   };
    //   Util.showLoader(this);
    //   // this.props.userSigninRequest(payload, data => {
    //   //   if (data) {
    //   //     DataHandler.loginOnApplozic(data);

    //   //     setTimeout(() => {
    //   //       Util.hideLoader(this);
    //   //       if (Util.userIsServiceProvider()) {
    //   //         Actions.reset('spdashboard');
    //   //       } else {
    //   //         Actions.reset('dashboard');
    //   //       }
    //   //     }, 1000);
    //   //   } else {
    //   //     Util.hideLoader(this);
    //   //   }
    //   // });
    // }
  };

  renderLoginForm(errors) {
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
        <View style={[AppStyles.pLeft5, AppStyles.pRight5]}>
          <Text type="bold" size="large" style={AppStyles.mBottom10}>
            ADD NEW CARD
          </Text>
          <TextInput
            ref={ref => {
              this.name = ref;
            }}
            label="Card Number"
            error={errors.name}
            autoCapitalize="none"
            onChangeText={value => this._onChange('name', value)}
            keyboardType="number-pad"
            returnKeyType="next"
            onSubmitEditing={this._onSubmitName}
            placeholderTextColor={Colors.gray}
            maxLength={4}
            style={{
              //  flex: 1,
              color: 'black',
              //  backgroundColor: 'red',
            }}
          />

          <View
            style={{
              alignItems: 'center',
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <RNTextinput
              //value={'exp'}
              onChangeText={exp => this.setState({exp})}
              placeholder={'Expiry Date'}
              keyboardType="number-pad"
              borderHeight={0}
              underlineColorAndroid="transparent"
              placeholderTextColor={Colors.gray}
              style={{
                height: 50,
                borderRadius: 45 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '45%',
              }}
              // inputPadding={10}
            />
            <RNTextinput
              placeholder={'cvv'}
              onChangeText={cvv => this.setState({cvv})}
              label={'CVV'}
              keyboardType="number-pad"
              borderHeight={0}
              underlineColorAndroid="transparent"
              style={{
                height: 50,
                borderRadius: 45 / 2,
                backgroundColor: 'white',
                color: Colors.black,
                paddingLeft: 10,
                width: '45%',
              }}
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>

        <ButtonView onPress={this._onSubmit} style={styles.button}>
          <Text textAlign="center" type="semi_bold" size="normal">
            Save
          </Text>
        </ButtonView>
      </View>
    );
  }

  render() {
    const {errors, loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <CustomNavbar
          title="WALLET"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        {this.renderLoginForm(errors)}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(AddCard);
