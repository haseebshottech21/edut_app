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
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
  POST_LIST,
  DATE_FORMAT1,
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
import DatePicker from 'react-native-datepicker';
import ReactNativePickerModule from 'react-native-picker-module';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';

class CommunityTab2 extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      city: 'City',
      postModal: false,
      moods: ['Anxiety', 'Depression', 'Tention'],
      selectedMood: 'Anxiety',
      showDropDown: false,
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

  renderUser = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Avatar
          image={item.userImage}
          style={{
            alignSelf: 'flex-start',
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
          imageStyle={{height: 40, width: 40}}
        />
        <View
          style={[
            AppStyles.flexRow,
            {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
          ]}>
          <View style={[{marginLeft: 10, alignItems: 'center'}]}>
            <Text color="black" size="xSmall" type="semi_bold">
              {item.name}
            </Text>
            <Text
              color="black"
              size="xxSmall"
              type="thin"
              style={[AppStyles.mTop2]}>
              {util.getFormattedDateTime(item.post_date, DATE_FORMAT1)}
            </Text>
          </View>
          {item.isOwnPost == true && (
            <ButtonView>
              <Image
                source={Images.more}
                style={{height: 15, width: 15}}
                resizeMode="contain"
              />
            </ButtonView>
          )}
        </View>
      </View>
    );
  };
  renderActionButton() {
    return (
      <View
        style={[
          AppStyles.flexRow,
          {
            alignItems: 'center',
            // alignSelf: 'center',
            //  backgroundColor: 'red',
            marginVertical: 10,
            //  paddingVertical: 15,
            borderColor: 'gray',
            borderTopWidth: 0.3,
          },
        ]}>
        <ButtonView
          style={{
            flexDirection: 'row',
            flex: 1,
            borderRightWidth: 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Image
            source={Images.heart}
            style={{height: 15, width: 15}}
            resizeMode="contain"
          />

          <Text
            color="blue"
            size="small"
            type="semi_bold"
            style={AppStyles.mLeft10}>
            Likes
          </Text>
        </ButtonView>
        <ButtonView
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={Images.postComment}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />

          <Text
            color="blue"
            size="small"
            type="semi_bold"
            textAlign="center"
            style={AppStyles.mLeft10}>
            Comment
          </Text>
        </ButtonView>
      </View>
    );
  }
  postInfo = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            //  backgroundColor: 'red',
          }}>
          <Image
            source={Images.like}
            style={{height: 15, width: 15}}
            resizeMode="contain"
          />

          <Text
            color="gray"
            size="xxSmall"
            style={[AppStyles.mLeft10, AppStyles.mTop5]}>
            likes {item.likes}
          </Text>
        </ButtonView>
        <ButtonView
          style={{
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.comments}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />

          <Text color="gray" size="xxSmall" style={[AppStyles.mLeft10]}>
            Comments {item.comments}
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderPosts = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          marginHorizontal: 24,
          marginVertical: 12,

          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {this.renderUser(item)}
        {/*<Text
          color="black"
          size="xSmall"
          type="regular"
          style={{marginVertical: 10}}>
          {item.postText}
        </Text>*/}
        <ReadMore
          numberOfLines={2}
          renderTruncatedFooter={handlePress => {
            return (
              <Text
                color="blue"
                onPress={handlePress}
                style={{textDecorationLine: 'underline', marginBottom: 10}}>
                Read more
              </Text>
            );
          }}
          renderRevealedFooter={handlePress => {
            return (
              <Text
                color="blue"
                onPress={handlePress}
                style={{textDecorationLine: 'underline', marginBottom: 10}}>
                Show Less
              </Text>
            );
          }}
          onReady={this._handleTextReady}>
          <Text
            color="black"
            size="xSmall"
            type="regular"
            style={{marginVertical: 10}}>
            {item.postText}
          </Text>
        </ReadMore>
        <Image
          source={{uri: item.userPostImage}}
          style={{
            height: Metrics.screenWidth,
            height: 150,
          }}
          resizeMode="cover"
        />
        {this.postInfo(item)}
        {this.renderActionButton()}
      </View>
    );
  };
  listHeader = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Avatar
            image={PLACEHOLDER_IMAGE}
            style={{height: 50, width: 50}}
            imageStyle={{height: 50, width: 50}}
          />

          <ButtonView
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 30,

              paddingHorizontal: 10,
              marginHorizontal: 10,

              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => this.setState({postModal: true})}>
            <Text color="gray" size="small">
              What's going on your mind
            </Text>
            <Image
              source={Images.edit}
              style={{
                height: 13,
                width: 13,
                //  alignSelf: 'flex-end',
                marginTop: -5,
              }}
            />
          </ButtonView>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          <ButtonView
            onPress={() =>
              this.props.navigation.navigate('createfamilySupport')
            }
            style={{
              backgroundColor: Colors.blue,
              flex: 1,
              borderRadius: 30,
              paddingHorizontal: 10,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingVertical: 10,
            }}>
            <Image
              source={Images.profile}
              style={{
                tintColor: 'white',
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginHorizontal: 5,
              }}
            />
            <Text>Invite a Therapist</Text>
          </ButtonView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <ButtonView
              onPress={() =>
                this.props.navigation.navigate('createfamilySupport')
              }
              style={{
                marginRight: 5,
                backgroundColor: Colors.blue,
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 40,
                }}>
                +
              </Text>
            </ButtonView>
            {new Array(5).fill().map(item => {
              return (
                <View
                  key={item}
                  style={{
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.blue,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </View>
              );
            })}
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  marginHorizontal: 3,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.blue}}>10+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  ListFooterComponent() {
    return (
      <ButtonView
        style={{
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: Colors.blue,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/icons/add.png')}
          resizeMode="contain"
          style={{alignSelf: 'center', height: 40, width: 40}}
        />
      </ButtonView>
    );
  }
  renderDocs = item => {
    return (
      <View style={styles.docView}>
        <Image style={styles.imageDoc} source={{uri: PLACEHOLDER_IMAGE}} />

        <TouchableOpacity
          style={styles.crossBtn2}
          // onPress={() => this.removeDoc(item)}
        >
          <Image source={Images.cross} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  renderListContent = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({selectedMood: item, showDropDown: false})
        }>
        <Text color="blue">{item}</Text>
      </TouchableOpacity>
    );
  };
  renderModal = () => {
    return (
      <Modal
        isVisible={this.state.postModal}
        onBackdropPress={() => this.setState({postModal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <View
            style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
            <RNTextInput
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: Colors.white,
                width: Metrics.screenWidth - 100,
                height: Metrics.screenHeight * 0.15,
                borderRadius: 10,
                color: 'black',
                textAlignVertical: 'top',
                alignSelf: 'center',
                borderColor: 'gray',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              multiline
              placeholder={`Whats's going on your mind `}
              placeholderTextColor={Colors.white2}
            />
            <FlatList
              style={{alignSelf: 'center'}}
              ListFooterComponent={this.ListFooterComponent}
              data={[1]}
              renderItem={this.renderDocs}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text color="blue" style={{marginTop: 20}} type="bold" size="small">
              post Related To
            </Text>
            <ButtonView
              style={styles.input}
              onPress={() =>
                this.setState({showDropDown: !this.state.showDropDown})
              }>
              <Text color="blue" size="xSmall">
                {this.state.selectedMood}
              </Text>
              <Image
                source={Images.dropdown}
                style={{height: 20, width: 20, marginTop: 5}}
                resizeMode="contain"
              />
            </ButtonView>
            {this.state.showDropDown && (
              <View style={styles.dropdownView}>
                {this.state.moods.map((item, index) => {
                  return this.renderListContent(item);
                })}
              </View>
            )}

            <ButtonView
              onPress={this._onSubmit}
              style={styles.button}
              onPress={() => this.setState({postModal: false})}>
              <Text textAlign="center" type="bold" size="normal">
                post
              </Text>
            </ButtonView>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Family Support Group"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={POST_LIST}
          ListHeaderComponent={this.listHeader}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
        />
        {this.renderModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CommunityTab2);
