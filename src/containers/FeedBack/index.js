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
  TextInput,
  TouchableOpacity,
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
  PLACEHOLDER_IMAGE,
} from '../../constants';
import {Text, ButtonView, CustomNavbar, Loader, Avatar} from '../../components';
import {Images, AppStyles, Metrics, Colors} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {Picker} from '@react-native-picker/picker';
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import util from '../../util';
import {helpFeedBackRequest} from '../../actions/AppInfoActions';

class FeedBack extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
    modal: false,
    attachments: [],
    subject: '',
    body: '',
  };

  renderDocs = ({item, index}) => {
    return (
      <View style={styles.docView}>
        <Image
          style={styles.imageDoc}
          source={{uri: item.uri}}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.crossBtn2}
          onPress={() => this.removeDoc(item)}>
          <Image source={Images.cross} style={styles.closeIcon} />
        </TouchableOpacity>
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
  ListFooterComponent() {
    return (
      <ButtonView
        style={{
          //  flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: Colors.blue,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}
        onPress={this.pickDocument}>
        <Image
          source={require('../../assets/icons/add.png')}
          resizeMode="contain"
          style={{alignSelf: 'center', height: 40, width: 40}}
        />
      </ButtonView>
    );
  }
  pickDocument = async () => {
    if (this.state.attachments.length < 3) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
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
                images: res[0].uri,
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

  renderModal = () => {
    return (
      <View style={styles.modalStyle}>
        <View style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
          <TextInput
            placeholder={'Subject'}
            onChangeText={cvv => this.setState({cvv})}
            keyboardType="name-phone-pad"
            borderHeight={0}
            underlineColorAndroid="transparent"
            style={{
              width: Metrics.screenWidth - 100,

              alignSelf: 'center',
              height: 40,
              borderRadius: 40 / 2,
              backgroundColor: 'white',
              color: Colors.black,
              paddingLeft: 10,
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
            placeholderTextColor={Colors.gray}
            onChangeText={value => this.setState({subject: value})}
            value={this.state.subject}
          />
          <TextInput
            style={{
              marginVertical: 15,
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
            placeholder={`Whats's Your Story`}
            placeholderTextColor={Colors.white2}
            onChangeText={value => this.setState({body: value})}
            value={this.state.body}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              //  backgroundColor: 'red',
            }}>
            <FlatList
              data={this.state.attachments}
              horizontal
              renderItem={this.renderDocs}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, alignSelf: 'flex-end'}}
            />

            {this.ListFooterComponent()}
          </View>

          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text textAlign="center" type="bold" size="normal">
              Submit
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  };

  _onSubmit = () => {
    const {subject, body, attachments} = this.state;
    if (subject == '') {
      util.topAlertError('Please input Subject');
    } else if (body == '') {
      util.topAlertError('Please input story');
    } else {
      util.showLoader(this);
      const formData = new FormData();
      formData.append('title', subject);
      formData.append('description', body);
      if (!_.isEmpty(attachments)) {
        for (var key in attachments) {
          if (Array.isArray(attachments[key])) {
            var i = 0;
            var datakey = attachments[key];
            for (var newkey in datakey) {
              // if (datakey[newkey].name) {
              //   form_data.append(key + `[${i}][name]`, datakey[newkey].name);
              //   i++;
              // } else {
              formData.append('images[]' + `[${i}]`, datakey[newkey]);
              i++;
            }
          } else {
            formData.append('images[]', attachments[key]);
          }
        }
      }
      this.props.helpFeedBackRequest(formData, res => {
        if (res) {
          util.hideLoader(this);
          this.setState({subject: '', body: '', attachments: []});
          util.topAlert('feed Back Sent Successfully');
        }
        util.hideLoader(this);
      });
    }
  };

  render() {
    const {errors, loading} = this.state;
    console.log(this.state.attachments);

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Help & Feedback"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
          imageStyle={{height: 30, width: 30}}
        />
        {this.renderModal()}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {helpFeedBackRequest};

export default connect(mapStateToProps, actions)(FeedBack);
