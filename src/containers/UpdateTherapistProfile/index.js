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
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
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
import {completeProfileRequest} from '../../actions/UserActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheetCustom from 'react-native-actionsheet';

class UpdateTherapistProfile1 extends Component {
  constructor(props) {
    super(props);
    const {
      first_name,
      last_name,
      dob,
      country,
      city,
      state,
      story,
      image,
      schedules,
      experience,
      school_degree,
      certificate,
      per_hour,
      specilities,
    } = this.props.data;
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      first_name: first_name,
      last_name: last_name,
      dob: dob,
      country: country,
      city: city,
      State: state,
      story: story,
      userRole: 'user',
      storyError: false,
      userImage: image,
      imageSelected: false,
      schedules: schedules,
      experience: experience,
      school_degree: school_degree,
      certificate: certificate,
      per_hour: per_hour,
      specilities: specilities,
    };

    this.inputType = 'City';
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

  _validateForm = () => {
    const {first_name, last_name, dob, country, city, State, story, userRole} =
      this.state;
    const errors = {};
    if (_.isEmpty(first_name)) {
      errors.fname = Util.isRequiredMessage('first  Name ');
    } else if (_.isEmpty(last_name)) {
      errors.lname = Util.isRequiredMessage('last Name ');
    } else if (_.isEmpty(dob)) {
      this.setState({showDateError: true});
    } else if (_.isEmpty(city)) {
      errors.city = Util.isRequiredMessage('city  ');
    } else if (_.isEmpty(State)) {
      errors.State = Util.isRequiredMessage('state  ');
    } else if (_.isEmpty(country)) {
      errors.country = Util.isRequiredMessage('country ');
    } else if (_.isEmpty(story)) {
      this.setState({storyError: true});
    }

    if (!_.isEmpty(errors)) {
      //   this[_.keys(errors)[0]].focus();
      this.setState({
        errors,
      });

      return false;
    }

    return true;
  };

  _onSubmit = () => {
    const {navigation, route} = this.props;
    const {isTherapist} = this.state;
    if (this._validateForm()) {
      const {
        first_name,
        last_name,
        dob,
        country,
        city,
        State,
        story,
        userRole,
        userImage,
        imageSelected,
        per_hour,
        experience,
        schedules,
        certificate,
        school_degree,
        specilities,
      } = this.state;

      this.props.navigation.navigate('updateTherapistProfile2', {
        stripe_id: 'abcsdc',
        role: 'user',
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        state: State,
        city: city,
        country: country,
        story: story,
        image: this.state.userImage,
        experience: experience,
        school_degree: school_degree,
        certificate: certificate,
        schedules: schedules,
        per_hour: per_hour,
        specilities: specilities,
      });

      //  alert('nextPage');
    }
  };
  renderLoginForm = errors => {
    const {first_name, last_name, dob, country, city, state, story, userRole} =
      this.state;
    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20]}>
        <View

        //  style={[AppStyles.pLeft5, AppStyles.pRight5]}
        >
          <TextInput
            ref={ref => {
              this.fname = ref;
            }}
            label="First Name"
            error={errors.fname}
            autoCapitalize="none"
            onChangeText={value => this.setState({first_name: value})}
            returnKeyType="next"
            onSubmitEditing={this._onSubmitName}
            value={first_name}
            // secureTextEntry
          />
          <TextInput
            ref={ref => {
              this.lname = ref;
            }}
            label="Last Name"
            error={errors.lname}
            onChangeText={value => this.setState({last_name: value})}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            value={last_name}
            // secureTextEntry
          />

          <DatePicker
            showIcon={false}
            style={{
              width: Metrics.screenWidth * 0.88,
              marginVertical: 10,
              color: '#000',
              fontSize: 40,
            }}
            date={this.state.dob}
            mode="date"
            placeholder={'DOB'}
            format="YYYY-MM-DD"
            minDate="1900-12-11"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                //   flex: 1,
                height: 50,
                alignItems: 'flex-start',
                paddingLeft: 10,
                backgroundColor: Colors.white,
                borderRadius: Metrics.textInputBorder,
                //   // marginTop: 3,
                //   fontFamily: Fonts.type.medium,
                //   color: Colors.grey5,
                //   fontSize: Fonts.size.normal,
                marginVertical: 10,
                borderColor: 'white',
                alignSelf: 'center',
              },

              dateText: {
                fontSize: Fonts.size.small,
                fontFamily: Fonts.type.medium,
                color: Colors.black,
              },
              placeholderText: {
                fontSize: Fonts.size.normal,
                color: '#A7A7A7',
              },
            }}
            onDateChange={date => {
              this.setState({dob: date, showDateError: false});
            }}
          />
          {this.state.showDateError == true && (
            <Text color="red" size="xxSmall">
              Date is Required
            </Text>
          )}
          <TextInput
            ref={ref => {
              this.city = ref;
            }}
            label="City"
            error={errors.city}
            onChangeText={value => this.setState({city: value})}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            value={this.state.city}
            // secureTextEntry
          />
          {/*this.renderCityBox('City')*/}
          {/*this.renderCityBox('Specialties')*/}
          {/*this.renderCityBox('State')*/}
          <TextInput
            ref={ref => {
              this.State = ref;
            }}
            label="State"
            error={errors.State}
            onChangeText={value => this.setState({State: value})}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            value={this.state.State}
            // secureTextEntry
          />
          <TextInput
            ref={ref => {
              this.lname = ref;
            }}
            label="Country"
            error={errors.country}
            onChangeText={value => this.setState({country: value})}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            value={this.state.country}
            // secureTextEntry
          />
          {/*this.renderCityBox('Country')*/}
          <RNTextInput
            style={{
              padding: 10,
              backgroundColor: Colors.white,
              width: Metrics.screenWidth - 50,
              height: Metrics.screenHeight * 0.15,
              borderRadius: 20,
              color: 'black',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}
            multiline
            placeholder={`Whats's Your Story`}
            placeholderTextColor={Colors.white2}
            onChangeText={value =>
              this.setState({story: value, storyError: false})
            }
            value={this.state.story}
          />

          {this.state.storyError == true && (
            <Text color="red">story is Required</Text>
          )}

          <ButtonView style={styles.button} onPress={this._onSubmit}>
            <Text textAlign="center" type="semi_bold" size="normal">
              Done
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  };
  VehicleInformation = () => {
    const data = {
      City: [
        {label: 'City', value: 'City'},
        {label: 'City', value: 'City'},
      ],
      State: [
        {label: 'State', value: 'State'},
        {label: 'State', value: 'State'},
      ],
      Country: [
        {label: 'Country', value: 'Country'},
        {label: 'Country', value: 'Country'},
      ],
      Specialties: [
        {label: 'Anxiety', value: 'Anxiety'},
        {label: 'Stress', value: 'Stress'},
      ],
    };
    return (
      <ReactNativePickerModule
        pickerRef={this.pickerRef}
        value={this.state.value}
        title={'Select Vehicle'}
        items={data[this.inputType]}
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
              city: value,
              showVehicleError: false,
            });
          }, 500);
          console.log('value: ', value);
        }}
      />
    );
  };
  renderCityBox(sampleText) {
    const {errors, showVehicleError} = this.state;
    return (
      <View>
        <ButtonView
          style={styles.VehicleInput}
          onPress={() => {
            this.inputType = sampleText;
            this.pickerRef.current.show();
          }}>
          <Text color="gray">{sampleText}</Text>
        </ButtonView>

        {showVehicleError && (
          <Text color="red" size="small" style={AppStyles.mLeft15}>
            Vehicle Type is required
          </Text>
        )}
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
        Complete Profile
      </Text>
    );
  }
  renderUploadImage = () => {
    const {userImage} = this.state;
    return (
      <View style={{marginVertical: Metrics.doubleBaseMargin}}>
        <Avatar
          image={
            userImage
            // userImage == ''
            //   ? 'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand'
            //   : userImage
          }
          style={{height: 100, width: 100, borderRadius: 50}}
          imageStyle={{height: 100, width: 100}}
        />
        <ButtonView
          style={styles.uploadView}
          onPress={() => this.ActionSheet.show()}>
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
  openCamera = () => {
    try {
      // if (Platform.OS == 'android') {
      //   this.openAndroidCamera();
      // } else {
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
          const source = response.assets[0];

          this.setState({
            imageType: source.type,
            userImage: source.uri,
            imageSelected: true,
          });
        }
      });
    } catch (err) {
      // }
      console.warn(err);
    }
  };
  openAndroidCamera = async () => {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: 'App Camera Permission',
    //     message: 'App needs access to your camera ',
    //     buttonNeutral: 'Ask Me Later',
    //     buttonNegative: 'Cancel',
    //     buttonPositive: 'OK',
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   const options = {
    //     quality: 1.0,
    //     maxWidth: 1000,
    //     maxHeight: 1000,
    //     storageOptions: {
    //       skipBackup: true,
    //     },
    //   };
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
          imageSelected: true,
        });
      }
    });
    // } else {
    //   Alert('Camera permission denied');
    // }
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
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          const source = response.assets[0];
          this.setState({
            imageType: source.type,
            userImage: source.uri,
            imageSelected: true,
          });
        }
      });
    } catch (err) {
      // console.warn(err);
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
  render() {
    const {errors, loading, isTherapist} = this.state;
    const {navigation} = this.props;
    console.log('userData', this.props.data);
    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        {this.ScreenHeader()}
        <ScrollView>
          {this.renderUploadImage()}

          {this.renderLoginForm(errors)}
          {this.VehicleInformation()}
          {this.renderPhotoSelection()}

          <Loader loading={loading} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
});

const actions = {completeProfileRequest};

export default connect(mapStateToProps, actions)(UpdateTherapistProfile1);
