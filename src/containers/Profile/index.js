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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheetCustom from 'react-native-actionsheet';
import ReactNativePickerModule from 'react-native-picker-module';

class profile extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      loading: false,
      profilePicture: '',
      cityPlaceHolder: 'City',
      statePlaceHolder: 'State',
      vehicleType: 'Vehicle information',
      showVehicleError: false,
    };
  }
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  password;

  nameValue = '';

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
    const {data} = this.props.user;
    const errors = {};
    const {vehicleType} = this.state;
    if (_.isEmpty(this.nameValue)) {
      // email is required

      errors.name = Util.isRequiredMessage('Name');
    } else if (_.isEmpty(this.emailValue)) {
      // invalid email
      errors.email = Util.isRequiredMessage('Email');
    } else if (!Util.isEmailValid(this.emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    } else if (_.isEmpty(this.addressValue)) {
      errors.address = Util.isRequiredMessage('Address');
    } else if (vehicleType == 'Vehicle information' && data == 'Driver') {
      this.setState({showVehicleError: true});
      return false;
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
    const {data} = this.props.user;

    if (this._validateForm()) {
      data == 'user'
        ? navigation.navigate('home')
        : navigation.navigate('Home');
      // this.name.blur();
      // this.email.blur();
      // this.address.blur();

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
  renderStateModal = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.stateModal}
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={() => this.setState({stateModal: false})}>
          <View style={styles.modalStyle}>
            <View>
              <Text
                color="black"
                textAlign="center"
                style-={{backgroundColor: Colors.green}}>
                Select City
              </Text>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.statePlaceHolder}
                itemStyle={{
                  // alignSelf: 'center',
                  height: 200,
                }}
                style={{
                  marginLeft: 10,
                  height: Platform.OS == 'ios' ? 200 : 50,
                  width: Metrics.screenWidth,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({statePlaceHolder: itemValue})
                }>
                {City.map((item, ind) => {
                  return (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={item.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  rendercityModal = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.cityModal}
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={() => this.setState({cityModal: false})}>
          <View style={styles.modalStyle}>
            <View>
              <Text
                color="black"
                textAlign="center"
                style-={{backgroundColor: Colors.green}}>
                Select City
              </Text>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.cityPlaceHolder}
                itemStyle={{
                  // alignSelf: 'center',
                  height: 200,
                }}
                style={{
                  marginLeft: 10,
                  height: Platform.OS == 'ios' ? 200 : 50,
                  width: Metrics.screenWidth,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({cityPlaceHolder: itemValue})
                }>
                {State.map((item, ind) => {
                  return (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={item.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  VehicleInformation = () => {
    return (
      <ReactNativePickerModule
        pickerRef={this.pickerRef}
        value={this.state.value}
        title={'Select Vehicle'}
        items={[
          {label: 'sprinter', value: 'sprinter'},
          {label: 'SUV', value: 'SUV'},
        ]}
        titleStyle={{color: 'white'}}
        itemStyle={{color: 'white'}}
        selectedColor="#FC0"
        confirmButtonEnabledTextStyle={{color: 'white'}}
        confirmButtonDisabledTextStyle={{color: 'grey'}}
        cancelButtonTextStyle={{color: 'white'}}
        confirmButtonStyle={{
          backgroundColor: 'rgba(0,0,0,1)',
        }}
        cancelButtonStyle={{
          backgroundColor: 'rgba(0,0,0,1)',
        }}
        contentContainerStyle={{
          backgroundColor: 'rgba(0,0,0,1)',
        }}
        onCancel={() => {
          console.log('Cancelled');
        }}
        onValueChange={value => {
          setTimeout(() => {
            this.setState({
              vehicleType: value,
              showVehicleError: false,
            });
          }, 500);
          console.log('value: ', value);
        }}
      />
    );
  };
  renderVehicleBox = () => {
    const {errors, showVehicleError} = this.state;
    return (
      <View>
        <ButtonView
          style={[styles.VehicleInput, {marginLeft: 10}]}
          onPress={() => this.pickerRef.current.show()}>
          <Text color="black">{this.state.vehicleType}</Text>
          <Image
            source={Images.dropdown}
            style={styles.Icon}
            resizeMode="contain"
          />
        </ButtonView>

        {showVehicleError && (
          <Text color="red" size="small" style={AppStyles.mLeft15}>
            Vehicle Type is required
          </Text>
        )}
      </View>
    );
  };

  renderLoginForm(errors) {
    const {data} = this.props.user;
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
        <View style={[AppStyles.pLeft5, AppStyles.pRight5]}>
          <TextInput
            ref={ref => {
              this.name = ref;
            }}
            label="Full Name"
            error={errors.name}
            autoCapitalize="none"
            onChangeText={value => this._onChange('name', value)}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={this._onSubmitName}
          />
          <TextInput
            ref={ref => {
              this.email = ref;
            }}
            label="Email"
            error={errors.email}
            keyboardType="email-address"
            onChangeText={value => this._onChange('email', value)}
            returnKeyType="done"
            onSubmitEditing={this._onSubmitEmail}
          />
          <TextInput
            ref={ref => {
              this.address = ref;
            }}
            label="STREET ADDRESS"
            error={errors.address}
            onChangeText={value => this._onChange('address', value)}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View style={[AppStyles.flexRow, {marginHorizontal: 5}]}>
          <ButtonView
            style={styles.input}
            onPress={() => this.setState({stateModal: true})}>
            <Text color="black">{this.state.statePlaceHolder}</Text>
            <Image
              source={Images.dropdown}
              style={styles.Icon}
              resizeMode="contain"
            />
          </ButtonView>
          <ButtonView
            style={[styles.input, {marginLeft: 10}]}
            onPress={() => this.setState({cityModal: true})}>
            <Text color="black">{this.state.cityPlaceHolder}</Text>
            <Image
              source={Images.dropdown}
              style={styles.Icon}
              resizeMode="contain"
            />
          </ButtonView>
        </View>
        {data == 'Driver' && this.renderVehicleBox()}

        <ButtonView onPress={this._onSubmit} style={styles.button}>
          <Text textAlign="center" type="semi_bold" size="normal">
            Continue
          </Text>
        </ButtonView>
      </View>
    );
  }

  renderUploadImage = () => {
    const {data} = this.props.user;

    return (
      <View style={{marginTop: Metrics.doubleBaseMargin}}>
        <Avatar
          image={
            _.isEmpty(this.state.profilePicture)
              ? // data == 'user'
                'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand'
              : //   : !_.isEmpty(this.state.profilePicture)
                //   ? this.state.profilePicture
                this.state.profilePicture
          }
        />
        <ButtonView
          style={styles.uploadView}
          onPress={() => this.ActionSheet.show()}
          >
          <Image source={Images.profile_select} style={styles.uploadIcon} />
        </ButtonView>
      </View>
    );
  };
  ActionsSheetPress = index => {
    if (index === 0) {
      this.openCamera();
    }
    if (index === 1) {
      this.openGallery();
    }
  };
  renderPhotoSelection = () => {
    return (
      <View>
        <ActionSheetCustom
          ref={o => (this.ActionSheet = o)}
          title={'Select Photo'}
          options={['Take a Photo', 'Choose From Library', 'Cancel']}
          cancelButtonIndex={2}
          onPress={index => {
            this.ActionsSheetPress(index);
          }}
          styles={styles}
        />
      </View>
    );
  };
  openCamera = () => {
    try {
      if (Platform.OS == 'android') {
        this.openAndroidCamera();
      } else {
        const options = {
          quality: 1.0,
          maxWidth: 1000,
          maxHeight: 1000,
          storageOptions: {
            skipBackup: true,
          },
        };
        launchCamera(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            console.log(response);
            const source = {uri: response.assets[0].uri};
            this.setState({avatarSource: response.assets[0].uri});
            this.setState({profilePicture: response.assets[0].uri});
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
              avatarSource: source.uri,
            });
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  openGallery = async () => {
    try {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          this.setState({avatarSource: response.assets[0].uri});
          this.setState({profilePicture: response.assets[0].uri});
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatarSource: source.uri,
          });
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };
  openAndroidCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          this.setState({avatarSource: response.assets[0].uri});
          this.setState({profilePicture: response.assets[0].uri});
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatarSource: source.uri,
          });
        }
      });
    } else {
      Alert('Camera permission denied');
    }
  };

  render() {
    const {errors, loading} = this.state;
    const {data} = this.props.user;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === 'android'
              ? 'padding'
              : Metrics.screenHeight > 750
              ? 'padding'
              : 'position'
          }
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <CustomNavbar
            title="PROFILE"
            // hasBack={false}
            leftBtnImage={Images.DrawerOpen}
            leftBtnPress={() => this.props.navigation.openDrawer()}
          />

          {this.renderUploadImage()}
          {this.renderLoginForm(errors)}
          {this.renderStateModal()}
          {this.rendercityModal()}
          {data == 'Driver' && this.VehicleInformation()}
          {this.renderPhotoSelection()}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user,
});
const actions = {};

export default connect(mapStateToProps, actions)(profile);
