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
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
  scheduleList,
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
import {selectUserType} from '../../actions/UserActions';
import DatePicker from 'react-native-datepicker';
import ReactNativePickerModule from 'react-native-picker-module';

class About extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      city: 'City',
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
    const {navigation, route} = this.props;
    const {userType} = route.params;

    if (this._validateForm()) {
      this.props.selectUserType(userType);
      if (userType == 'user') {
        setTimeout(() => {
          navigation.reset({
            routes: [{name: 'home'}],
            params: userType,
          });
        }, 0);
      } else {
        setTimeout(() => {
          navigation.reset({
            routes: [{name: 'driverHome'}],
            params: userType,
          });
        }, 0);
      }

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
  renderTherapistInfo() {
    const {userItem} = this.props.route.params;
    const {schedules} = this.props.route.params.userItem;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Metrics.doubleBaseMargin,
            marginTop: 10,
          }}>
          <Text color="black" size="small" type="semi_bold">
            Session Schedule
          </Text>
          <Image source={Images.edit} style={{height: 20, width: 20}} />
        </View>

        <Text
          color="black"
          size="small"
          style={{marginLeft: Metrics.doubleBaseMargin, marginVertical: 10}}>
          Hourly Rate $ {userItem.hourly_rate}
        </Text>
        <FlatList
          data={schedules}
          contentContainerStyle={{marginHorizontal: 20}}
          renderItem={({item, index, separators}) => (
            <View
              style={{
                backgroundColor: Colors.white,
                height: 40,
                width: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
                borderColor: Colors.blue,
                borderWidth: 0.5,
              }}>
              <Text size="xxSmall" color="black">
                {item.day_name}
              </Text>
            </View>
          )}
          horizontal
        />
      </View>
    );
  }

  renderHeader = () => {
    const {userItem} = this.props.route.params;
    return (
      <View style={AppStyles.mTop15}>
        <Avatar
          image={userItem.image}
          style={{height: 100, width: 100, borderRadius: 50}}
          imageStyle={{height: 100, width: 100}}
        />
        {/* <ButtonView
          style={styles.uploadView}
          // onPress={() => this.props.navigation.navigate('completeProfile')}
        >
          <Image source={Images.edit} style={styles.uploadIcon} />
    </ButtonView>*/}
        <Text
          textAlign="center"
          color="black"
          size="normal"
          type="semi_bold"
          style={AppStyles.mTop20}>
          {userItem?.name}
        </Text>
        <Text
          textAlign="center"
          color="black"
          size="large"
          type="semi_bold"
          style={AppStyles.mTop20}>
          About
        </Text>
        <Text
          textAlign="center"
          color="black"
          size="xSmall"
          style={[
            AppStyles.marginVerticalBase,
            AppStyles.mTop10,
            AppStyles.marginHorizontalBase,
          ]}
          noOfLines={2}>
          {userItem.story}
        </Text>
      </View>
    );
  };
  renderButtonItem = () => {
    const {userItem} = this.props.route.params;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.white,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            marginHorizontal: 10,
            borderColor: Colors.blue,
            borderWidth: 1,
          }}
          onPress={() =>
            this.props.navigation.navigate('documentsList', {
              documentsList: this.props.route.params.userItem.certificates,
            })
          }>
          <Text
            color="blue"
            size="xxSmall"
            type="bold"

            //  onPress={() => this.setState({modal: false})}
          >
            Education
          </Text>
          <Text color="blue" size="xxSmall" style={AppStyles.mTop2}>
            Certifications List
          </Text>
          <Text color="blue" size="xxSmall" style={AppStyles.mTop2}></Text>
        </ButtonView>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.white,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            borderColor: Colors.blue,
            borderWidth: 1,
          }}
          onPress={
            () => {}
            //  this.props.navigation.navigate('following', {selectedTab: 2})
          }>
          <Text
            color="blue"
            size="xxSmall"
            type="bold"
            //  onPress={() => this.setState({modal: false})}
          >
            {userItem?.country}
          </Text>
          <Text
            color="blue"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="medium">
            {userItem?.state}
          </Text>
          <Text
            color="blue"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="medium">
            {userItem?.city}
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderDocs = (item, index) => {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 5}} key={index}>
        <Text color="blue" size="xxSmall" style={AppStyles.mTop2} type="medium">
          {item.name}
        </Text>
      </View>
    );
  };
  renderButtonItem2 = () => {
    const {userItem} = this.props.route.params;
    const {specilities} = this.props.route.params.userItem;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.white,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            borderColor: Colors.blue,
            borderWidth: 1,
            marginHorizontal: 10,
          }}
          onPress={
            () => {}
            // this.props.navigation.navigate('following', {selectedTab: 2})
          }>
          <Text
            color="blue"
            size="xxSmall"
            type="bold"
            //  onPress={() => this.setState({modal: false})}
          >
            Specialties
          </Text>
          {specilities.map((item, index) => {
            return this.renderDocs(item, index);
          })}
        </ButtonView>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.white,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            borderColor: Colors.blue,
            borderWidth: 1,
          }}
          onPress={
            () => {}
            //  this.props.navigation.navigate('following', {selectedTab: 2})
          }>
          <Text
            color="blue"
            size="xxSmall"
            type="bold"
            //  onPress={() => this.setState({modal: false})}
          >
            Work Experience
          </Text>
          <Text
            color="blue"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="medium">
            {userItem.expeirence}Years
          </Text>
          <Text
            color="blue"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="medium"></Text>
        </ButtonView>
      </View>
    );
  };

  renderHeaderComponent() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderButtonItem()}
        {this.renderButtonItem2()}
      </View>
    );
  }

  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Personal Developement"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        <ScrollView>
          {this.renderHeader()}
          {this.renderButtonItem()}
          {this.renderButtonItem2()}
          {this.renderTherapistInfo()}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {selectUserType};

export default connect(mapStateToProps, actions)(About);
