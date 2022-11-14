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
import {
  completeProfileRequest,
  getSpecialtiesRequest,
} from '../../actions/UserActions';
import DocumentPicker from 'react-native-document-picker';
import MultiSelect from 'react-native-multiple-select';

class UpdateTherapistProfile2 extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      city: 'City',
      serverArray: [],
      daysList: scheduleList,
      loading: false,
      hourlyRate: this.props.route.params.per_hour,
      experience: this.props.route.params.experience,
      verification_docs: '',
      attachments: [],
      certifications: [],
      selectedItems: [],
      specialtiesList: [],
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
  selectItem = (item, count) => {
    console.log('count', this.state.journalIcons);
    let serverArray = [];
    console.log(this.state.serverArray, '.....serverarry');

    const Index = _.findIndex(
      this.state.serverArray,
      o => o.name === item.name,
    );
    console.log('INdexxxx', Index);
    if (Index == -1) {
      let tempArray = [...this.state.serverArray];
      tempArray.push(item);
      this.setState({serverArray: tempArray});
    } else {
      let tempArray = [...this.state.serverArray];
      tempArray.splice(Index, 1);
      this.setState({serverArray: tempArray});
    }
  };
  pickDocument = async () => {
    if (this.state.attachments.length < 3) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        });
        const index = this.state.attachments.findIndex(
          docs => docs.uri == res[0].uri,
        );

        if (index > -1) {
          Util.topAlertError('file Already Exist');
        } else {
          this.setState({
            attachments: [
              ...this.state.attachments,
              {
                uri: res[0].uri,
                type: res[0].type,
                name: `test-${Date.now()}.${res[0].type.split('/')[1]}`,
              },
            ],
          });
        }
      } catch (err) {
        console.log('err', err);
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          console.log('err', err);

          throw err;
        }
      }
    } else {
      Util.topAlertError('You can select only three documents');
    }
  };
  pickCertification = async () => {
    if (this.state.certifications.length < 3) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        });
        const index = this.state.certifications.findIndex(
          docs => docs.uri == res[0].uri,
        );

        if (index > -1) {
          Util.topAlertError('file Already Exist');
        } else {
          this.setState({
            certifications: [
              ...this.state.certifications,
              {
                uri: res[0].uri,
                type: res[0].type,
                name: `test-${Date.now()}.${res[0].type.split('/')[1]}`,
              },
            ],
          });
        }
      } catch (err) {
        console.log('err', err);
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          console.log('err', err);

          throw err;
        }
      }
    } else {
      Util.topAlertError('You can select only three documents');
    }
  };

  componentDidMount = () => {
    const {school_degree, certificate, schedules, specilities} =
      this.props.route.params;
    console.log('schedules', schedules);
    !_.isEmpty(school_degree)
      ? school_degree.map((item, index) => {
          this.setState(prevState => ({
            attachments: [
              ...prevState.attachments,
              {
                uri: item.file,
                type: item.file?.includes('pdf')
                  ? 'application/pdf'
                  : 'image/jpeg',
                name: `test-${Date.now()}.${
                  item.file?.includes(`pdf`) ? `pdf` : `jpeg`
                }`,
              },
            ],
          }));
        })
      : this.setState({attachments: []});

    !_.isEmpty(certificate)
      ? certificate.map((item, index) => {
          this.setState(prevState => ({
            certifications: [
              ...prevState.certifications,
              {
                uri: item.file,
                type: item.file?.includes('pdf')
                  ? 'application/pdf'
                  : 'image/jpeg',
                name: `test-${Date.now()}.${
                  item.file?.includes(`pdf`) ? `pdf` : `jpeg`
                }`,
              },
            ],
          }));
        })
      : this.setState({certifications: []});

    !_.isEmpty(schedules)
      ? schedules.map((item, index) => {
          this.setState(prevState => ({
            serverArray: [
              ...prevState.serverArray,
              {key: item.id, name: item.day_name, selected: true},
            ],
          }));
        })
      : this.setState({serverArray: []});

    !_.isEmpty(specilities)
      ? specilities.map((item, index) => {
          let newArray = [];
          newArray.push(item.id);

          this.setState(prevState => ({
            selectedItems: [...prevState.selectedItems, item.id],
          }));
        })
      : this.setState({selectedItems: []});
    this.props.getSpecialtiesRequest(res => {
      if (res) {
        console.log('res');
        this.setState({specialtiesList: res});
      }
    });
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
    const {navigation} = this.props;
    const {attachments, serverArray} = this.state;
    const {
      stripe_id,
      first_name,
      last_name,
      dob,
      state,
      city,
      country,
      story,
      image,
      imageSelected,
    } = this.props?.route.params;

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);

    formData.append('stripe_id', stripe_id);
    formData.append('role', 'therapist');
    formData.append('dob', dob);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('story', story);
    formData.append('experience', this.state.experience);

    this.state.selectedItems.map((item, i) => {
      formData.append('specialities[]', item);
    });
    formData.append('per_hour', this.state.hourlyRate);
    this.state.attachments.map((item, i) => {
      formData.append('school_degree[]', {
        uri: item.uri,
        type: 'image/jpeg',
        name: item.name,
      });
    });

    this.state.certifications.map((item, i) => {
      formData.append('certificate[]', {
        uri: item.uri,
        type: item.type,
        name: item.name,
      });
    });
    this.state.serverArray.map((item, i) => {
      formData.append('schedules[]', item.name);
    });

    console.log('formmmdata', formData);

    if (!_.isEmpty(image) && imageSelected == true) {
      const payload = {
        uri: this.state.userImage,
        type: 'image/jpeg',
        name: `test-${Date.now()}.jpg`,
      };
      formData.append('image', payload);
    }
    Util.showLoader(this);
    this.props.completeProfileRequest(formData, res => {
      if (res) {
        Util.hideLoader(this);
        navigation.reset({
          routes: [{name: 'home'}],
        });
        Util.hideLoader(this);
      }
      Util.hideLoader(this);
    });
  };
  renderDays = ({item, index}) => {
    let Index = _.findIndex(this.state.serverArray, o => o.name === item.name);
    console.log('_selectedIndex', item);

    return (
      <ButtonView
        style={{
          backgroundColor: Index !== -1 ? Colors.blue : Colors.white,
          //  backgroundColor: item.selected ? Colors.blue : Colors.white,
          height: 40,
          width: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
          borderColor: Colors.blue,
          borderWidth: 0.5,
        }}
        onPress={() => this.selectItem(item)}>
        <Text size="xxSmall" color={item.selected ? 'white' : 'black'}>
          {item.name}
        </Text>
      </ButtonView>
    );
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
    console.log(selectedItems, 'checkkk');
  };
  renderLoginForm = errors => {
    const {selectedItems} = this.state;

    return (
      <View style={[AppStyles.pRight20, AppStyles.pLeft20]}>
        <View

        //  style={[AppStyles.pLeft5, AppStyles.pRight5]}
        >
          <View style={styles.docsContainerEmpty}>
            <Text color="gray">
              {_.isEmpty(this.state.attachments) ? 'Degrees' : ''}
            </Text>

            <View style={{flexDirection: 'row'}}>
              {this.state.attachments.map((item, index) => {
                return this.renderDocs(item, index);
              })}
            </View>
            <ButtonView
              onPress={() => this.pickDocument()}
              style={{
                position: 'absolute',

                //  right: -250,
                left: Metrics.screenWidth - 90,
                top: 8,
              }}>
              <Image
                source={Images.attachments}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            </ButtonView>
          </View>

          <View style={styles.docsContainerEmpty}>
            <Text color="gray">
              {_.isEmpty(this.state.certifications)
                ? 'License/Certification'
                : ''}
            </Text>

            <View style={{flexDirection: 'row'}}>
              {this.state.certifications.map((item, index) => {
                return this.renderCertificates(item, index);
              })}
            </View>
            <ButtonView
              onPress={() => this.pickCertification()}
              style={{
                position: 'absolute',

                //  right: -250,
                left: Metrics.screenWidth - 90,
                top: 8,
              }}>
              <Image
                source={Images.attachments}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            </ButtonView>
          </View>

          <TextInput
            ref={ref => {
              this.newPassword = ref;
            }}
            label="Work Experience"
            error={errors.newPassword}
            keyboardType="numeric"
            maxLength={2}
            returnKeyType="done"
            // leftImage={Images.attachments}
            //  leftImageStyle={{height: 35, width: 35}}
            Style={
              Platform.OS == 'ios'
                ? {paddingVertical: 15}
                : {paddingVertical: 1, paddingHorizontal: 10}
            }
            onChangeText={value => this.setState({experience: value})}
            // onSubmitEditing={this._onSubmitEmail}
            value={this.state.experience}
          />

          <Text
            color="black"
            style={{
              marginHorizontal: Metrics.baseMargin,
              marginVertical: Metrics.smallMargin,
            }}>
            Select Schedule
          </Text>
          <FlatList
            data={this.state.daysList}
            contentContainerStyle={{marginHorizontal: 20}}
            horizontal
            renderItem={this.renderDays}
            style={{marginVertical: 10}}
          />
          <View
            style={{
              marginLeft: Metrics.baseMargin,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text color="black">Hourly Rate $</Text>
            <RNTextInput
              style={{
                marginVertical: 10,
                //   padding: 10,
                //  backgroundColor: Colors.white,
                width: 50,
                //  height: Metrics.screenHeight * 0.15,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderColor: 'black',
                color: 'black',
                // textAlignVertical: 'top',
                alignSelf: 'center',
                borderColor: 'gray',
                fontSize: 16,
              }}
              keyboardType="numeric"
              placeholder={``}
              placeholderTextColor={Colors.black}
              onChangeText={value => this.setState({hourlyRate: value})}
              value={this.state.hourlyRate}
            />
          </View>
        </View>
      </View>
    );
  };
  removeDoc = item => {
    const index = this.state.attachments.findIndex(
      docs => docs.uri == item.uri,
    );

    var array = [...this.state.attachments];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({attachments: array});
    }
  };
  removeCer = item => {
    const index = this.state.certifications.findIndex(
      docs => docs.uri == item.uri,
    );

    var array = [...this.state.certifications];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({certifications: array});
    }
  };
  renderDocs = (item, index) => {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 5}} key={index}>
        {item.type.includes('pdf') ? (
          <Image
            style={{height: 35, width: 35}}
            source={Images.pdf}
            resizeMode={'contain'}></Image>
        ) : (
          <Image
            style={{height: 35, width: 35}}
            source={{uri: item.uri}}></Image>
        )}
        <ButtonView
          style={{position: 'absolute', right: -5, top: 0}}
          onPress={() => this.removeDoc(item)}>
          <Image source={Images.remove} style={{height: 12, width: 12}} />
        </ButtonView>
      </View>
    );
  };
  renderCertificates = (item, index) => {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 5}} key={index}>
        {item.type.includes('pdf') ? (
          <Image
            style={{height: 35, width: 35}}
            source={Images.pdf}
            resizeMode={'contain'}></Image>
        ) : (
          <Image
            style={{height: 35, width: 35}}
            source={{uri: item.uri}}></Image>
        )}
        <ButtonView
          style={{position: 'absolute', right: -5, top: 0}}
          onPress={() => this.removeCer(item)}>
          <Image source={Images.remove} style={{height: 12, width: 12}} />
        </ButtonView>
      </View>
    );
  };
  ScreenHeader() {
    return (
      <View style={AppStyles.mTop40}>
        <Text
          textAlign="center"
          type="bold"
          size="large"
          style={AppStyles.mTop40}
          color="black">
          Complete Profile
        </Text>
        <Text
          textAlign="center"
          type="bold"
          size="large"
          color="black"
          style={AppStyles.mTop25}>
          Professional Details
        </Text>
        <Text
          textAlign="center"
          size="small"
          color="black"
          style={{
            marginHorizontal: Metrics.doubleBaseMargin,
            marginVertical: 10,
          }}>
          Please Provide documents prior to Your Profession
        </Text>
      </View>
    );
  }

  render() {
    const {errors, loading, isTherapist, selectedItems} = this.state;
    const {navigation} = this.props;
    console.log('selectedItem', this.state.selectedItems);
    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <ScrollView>
          {this.ScreenHeader()}
          {this.renderLoginForm(errors)}
        </ScrollView>
        <View style={{marginHorizontal: 10}}>
          <MultiSelect
            hideTags
            items={this.state.specialtiesList}
            uniqueKey="id"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Select Specialties"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            //altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
            hideSubmitButton
            //styleMainWrapper={{backgroundColor: 'red', flex: 1}}
          />
        </View>
        <ButtonView style={styles.button} onPress={this._onSubmit}>
          <Text textAlign="center" type="semi_bold" size="normal">
            Done
          </Text>
        </ButtonView>
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {selectUserType, completeProfileRequest, getSpecialtiesRequest};

export default connect(mapStateToProps, actions)(UpdateTherapistProfile2);
