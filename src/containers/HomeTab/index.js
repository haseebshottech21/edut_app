// @flow
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import {
  DATE_FORMAT1,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
} from '../../constants';
import {
  Text,
  ButtonView,
  CustomNavbar,
  Avatar,
} from '../../components';
import { Images, AppStyles, Metrics, Colors } from '../../theme';
import styles from './styles';
import Util from '../../util';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import messaging from '@react-native-firebase/messaging';
import {
  Image as ImageCompressor,
} from 'react-native-compressor';
import FastImage from 'react-native-fast-image';
import {
  getPostRequest,
  createPostRequest,
  updatePostRequest,
  likePostRequest,
  getPostSuccess,
} from '../../actions/UserActions';
import util from '../../util';
import ActionSheetCustom from 'react-native-actionsheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PESDK } from 'react-native-photoeditorsdk';
import {
  VESDK,
  Configuration,
  SerializationExportType,
} from 'react-native-videoeditorsdk';
import VideoRecording from './videoRecording';
import VideoPlayer from '../../components/VideoPlayer';

let configuration: Configuration = {
  // Configure video composition tool
  composition: {
    // Enable personal video clips
    personalVideoClips: true,
    // Configure video clip library
    categories: [
      // Create video clip category with video clips
      {
        identifier: 'example_video_category_custom',
        name: 'Custom',
        items: [
          {
            identifier: 'example_video_custom_dj',
            videoURI: require('../../assets/editor_assets/DJ.mp4'),
          },
          {
            identifier: 'example_video_custom_notes',
            videoURI: require('../../assets/editor_assets/Notes.mp4'),
          },
        ],
      },
    ],
  },
  // Configure audio tool
  audio: {
    // Configure audio clip library
    categories: [
      // Create audio clip category with audio clips
      {
        identifier: 'example_audio_category_custom',
        name: 'Custom',
        items: [
          {
            // Use metadata to display title and artist
            identifier: 'example_audio_custom_elsewhere',
            audioURI: require('../../assets/editor_assets/assets_Elsewhere.mp3'),
          },
          {
            // Override metadata to display title and artist
            identifier: 'example_audio_custom_danceharder',
            title: 'Dance Harder',
            artist: 'Three Chain Links',
            audioURI: require('../../assets/editor_assets/DanceHarder.mp3'),
          },
        ],
      },
    ],
  },
  export: {
    serialization: {
      enabled: true,
      exportType: SerializationExportType.OBJECT,
    },
  },
};
let serialization = null;

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      city: 'City',
      postModal: false,
      videoRecordingModal: false,
      moods: [],
      selectedMood: '',
      selectedCategoryId: '',
      showDropDown: false,
      loading: false,
      Des: '',
      userImage: '',
      PhotoData: [],
      newCategory: '',
      item: '',
      isUpdate: false,
      post_id: '',
      videoUrl: '',
      video: '',
      postUploadLoading: false,
      changeCam: '',
      recording: '',
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
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // from Quite state
        this.GotoRoute(remoteMessage);
        // Actions.orderHistory();
      });
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body,
      //   // [{ text: 'OK', onPress: () => console.log('testing') }],
      //   [{ text: 'OK', onPress: () => this.GotoRoute(remoteMessage) }],
      // );
    });
  }
  renderVideoModal() {
    return (
      <Modal
        isVisible={this.state.videoModal}
        onBackdropPress={() => this.setState({ videoModal: false })}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'#000'}
        style={{ alignSelf: 'center' }}>
        <View
          style={[
            AppStyles.centerInner,
            AppStyles.flex,
            {
              width: Metrics.screenWidth,
              overflow: 'scroll',
            },
          ]}>
          <ButtonView
            style={styles.cancelImageContainer}
            onPress={() => this.setState({ videoModal: false })}>
            <Image
              source={require('../../assets/icons/Cut/cut.png')}
              style={styles.cancelImage}
              resizeMode={'cover'}
            />
          </ButtonView>
          <VideoPlayer video={this.state.video} style={{
            height: Metrics.screenHeight - Metrics.screenHeight * 0.5,
            width: Metrics.screenWidth,
          }} />
        </View>
      </Modal>
    );
  }
  GotoRoute = remoteMessage => {
    if (remoteMessage?.data?.type == 'session') {
      this.props.navigation.navigate('appointments');
    }
    // console.log(remoteMessage);
  };
  fetchData = () => {
    util.showLoader(this);
    const payload = {
      type: 'post',
    };
    this.props.getPostRequest(payload, res => {
      if (res) {
        util.hideLoader(this);

        this.setState(
          {
            moods: res.categories,
            selectedMood: res.categories[0].name,
            selectedCategoryId: res.categories[0].id,
          },
          () => {
            this.setState({
              moods: [...this.state.moods, { id: 5, name: 'Others' }],
            });
          },
        );
      }
      util.hideLoader(this);
    });
  };
  _onChange = (element, value) => {
    const valueRef = `${element}Value`;
    this[valueRef] = value;

    if (!_.isEmpty(this.state.errors)) {
      this.setState({
        errors: { ...this.state.errors, ...{ [element]: '' } },
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
    if (this.state.Des == '') {
      util.topAlertError('Please type Description');
    }
    //  else if (_.isEmpty(this.state.PhotoData)) {
    //   util.topAlertError('Please upload Picture');
    // }
    else if (
      this.state.selectedMood == 'Others' &&
      this.state.newCategory == ''
    ) {
      util.topAlertError('Please provide Category Type');
    } else {
      this.setState({ postUploadLoading: !this.state.postUploadLoading });
      const formData = new FormData();
      formData.append('title', 'Sapmle');
      formData.append('description', this.state.Des);

      // formData.append('category_id', this.state.selectedCategoryId);
      formData.append(
        'category_id',
        this.state.selectedMood == 'Others'
          ? this.state.newCategory
          : this.state.selectedCategoryId,
      );
      formData.append('type', 'post');

      if (!_.isEmpty(this.state.PhotoData)) {
        const payload = {
          uri: this.state.PhotoData[0].imageURL,
          type: this.state.PhotoData[0].type,
          name: this.state.PhotoData[0].name,
        };
        formData.append('image', payload);
      }
      this.props.createPostRequest(formData, res => {
        if (res) {
          this.setState(
            {
              postModal: false,
              postUploadLoading: false,
              Des: '',
              PhotoData: [],
            },
            () => {
              this.fetchData();
            },
          );
        } else {
          this.setState({ postUploadLoading: false });
        }
      });
    }
  };
  _onUpdate = () => {
    if (this.state.Des == '') {
      util.topAlertError('Please type Description');
    }
    // else if (_.isEmpty(this.state.PhotoData))
    // {
    //   util.topAlertError('Please upload Picture');
    // }
    else if (
      this.state.selectedMood == 'Others' &&
      this.state.newCategory == ''
    ) {
      util.topAlertError('Please provide Category Type');
    } else {
      this.setState({ postUploadLoading: !this.state.postUploadLoading });
      const formData = new FormData();
      formData.append('title', 'Sapmle');
      formData.append('description', this.state.Des);
      formData.append('post_id', this.state.post_id);

      // formData.append('category_id', this.state.selectedCategoryId);
      formData.append(
        'category_id',
        this.state.selectedMood == 'Others'
          ? this.state.newCategory
          : this.state.selectedCategoryId,
      );
      formData.append('type', 'post');

      if (!_.isEmpty(this.state.PhotoData)) {
        const payload = {
          uri: this.state.PhotoData[0].imageURL,
          type: this.state.PhotoData[0].type,
          name: this.state.PhotoData[0].name,
        };

        formData.append('image', payload);
      }
      this.props.updatePostRequest(formData, res => {
        if (res) {
          this.setState(
            {
              postModal: false,
              postUploadLoading: false,
              Des: '',
              PhotoData: [],
            },
            () => {
              this.fetchData();
            },
          );
        } else {
          this.setState({ postUploadLoading: false });
        }
      });
    }
  };
  likePost = item => {
    const payload = {
      post_id: item.id,
    };
    this.props.likePostRequest(payload, res => {
      if (res) {
      }
    });
  };
  renderUser = item => {
    const { data } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Avatar
          image={item.userimage == null ? PLACEHOLDER_IMAGE : item.userimage}
          style={{
            alignSelf: 'flex-start',
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
          imageStyle={{ height: 40, width: 40 }}
        />
        <View
          style={[
            AppStyles.flexRow,
            { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
          ]}>
          <View style={[{ marginLeft: 10 }]}>
            <Text color="black" size="xSmall" type="semi_bold">
              {item.username}
            </Text>
            <Text
              color="black"
              size="xxSmall"
              type="thin"
              style={[AppStyles.mTop2]}>
              {util.getFormattedDateTime(item.post_date, DATE_FORMAT1)}
            </Text>
            <Text
              size="xxSmall"
              type="regular"
              style={[AppStyles.mTop2, { color: '#808080' }]}>
              Struggle:{item.category}
            </Text>
          </View>
          {data.id == item.user_id && (
            <ButtonView
              onPress={() =>
                this.setState(
                  {
                    selectedMood: item.category,
                    Des: item.description,
                    PhotoData: [{ id: 1, imageURL: item.image }],
                    isUpdate: true,
                    post_id: item.id,
                  },
                  () => {
                    this.ActionSheet.show();
                  },
                )
              }>
              <Image
                source={Images.more}
                style={{ height: 15, width: 15 }}
                resizeMode="contain"
              />
            </ButtonView>
          )}
        </View>
      </View>
    );
  };
  renderActionButton(item) {
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
          }}
          onPress={() => this.likePost(item)}>
          <Image
            source={item.is_like == 0 ? Images.heart : Images.heartFill}
            style={{ height: 15, width: 15 }}
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
          }}
          onPress={() =>
            this.props.navigation.navigate('comments', {
              post_id: item.id,
            })
          }>
          <Image
            source={Images.postComment}
            style={{ height: 20, width: 20 }}
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
            style={{ height: 15, width: 15 }}
            resizeMode="contain"
          />

          <Text
            color="gray"
            size="xxSmall"
            style={[AppStyles.mLeft10, AppStyles.mTop5]}>
            {item.likes == null ? 0 : item.likes}
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
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          />

          <Text color="gray" size="xxSmall" style={[AppStyles.mLeft10]}>
            {item.comments == null ? 0 : item.comments}
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderPosts = ({ item, index }) => {
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
                style={{ textDecorationLine: 'underline', marginBottom: 10 }}>
                Read more
              </Text>
            );
          }}
          renderRevealedFooter={handlePress => {
            return (
              <Text
                color="blue"
                onPress={handlePress}
                style={{ textDecorationLine: 'underline', marginBottom: 10 }}>
                Show Less
              </Text>
            );
          }}
          onReady={this._handleTextReady}>
          <Text
            color="black"
            size="xSmall"
            type="regular"
          // style={{marginBottom: 10}}
          >
            {item.description}
          </Text>
        </ReadMore>
        <TouchableOpacity
          onPress={() =>
            item.media_type == 'video'
              ? this.setState({ videoModal: true, video: item.image })
              : null
          }
          disabled={item.media_type == 'video' ? false : true}>
          <FastImage
            source={{
              uri: item.media_type == 'video' ? item.thumnail : item.image,
            }}
            style={{
              height: Metrics.screenWidth,
              height: 150,
              marginVertical: 10,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {this.postInfo(item)}
        {this.renderActionButton(item)}
      </View>
    );
  };
  listHeader = () => {
    const { first_name, image } = this.props.data;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginBottom: 20,
          }}>
          <Text
            color="blue"
            size="normal"
            type="bold"
            style={{ marginLeft: 10, textDecorationLine: 'underline' }}>
            HI {first_name}
          </Text>
          {
            // <Text color="black" style={{marginLeft: 10}} type="semi_bold">
            //   Topic of the Day
            // </Text>
          }
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Avatar
            image={image == null ? PLACEHOLDER_IMAGE : image}
            style={{ height: 50, width: 50 }}
            imageStyle={{ height: 50, width: 50 }}
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
            onPress={() => this.setState({ postModal: true })}>
            <Text color="gray" size="small">
              Share your testimony
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
      </View>
    );
  };
  ListFooterComponent = () => {
    return (
      <ButtonView
        style={{
          // flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: Colors.blue,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}
        onPress={() => this.PhotoActionSheet.show()}>
        <Image
          source={require('../../assets/icons/add.png')}
          resizeMode="contain"
          style={{ alignSelf: 'center', height: 40, width: 40 }}
        />
      </ButtonView>
    );
  };
  renderDocs = ({ item, index }) => {
    return (
      <View style={styles.docView}>
        <Image
          style={styles.imageDoc}
          //  source={this.state.photoData[0].imageURL:''?  {uri: this.state.PhotoData[0].imageURL}:{uri:'https://server.appsstaging.com/3048/edut/public/images/video_thumbnail.png'}}

          source={{
            uri: this.state.PhotoData[0]?.type?.includes('video')
              ? 'https://server.appsstaging.com/3048/edut/public/images/video_thumbnail.png'
              : this.state.PhotoData[0].imageURL,
          }}
          resizeMode="stretch"
        />

        <TouchableOpacity
          style={styles.crossBtn2}
          //array.splice(index, 1);
          onPress={() =>
            this.setState({
              PhotoData: [],
            })
          }
        // onPress={() => alert('soon')}
        >
          <Image source={Images.cross} style={styles.closeIcon} />
        </TouchableOpacity>
        {this.state.PhotoData[0]?.type?.includes('video') && (
          <TouchableOpacity
            style={styles.crossBtn3}
            //array.splice(index, 1);
            onPress={() =>
              this.state.PhotoData[0].type.includes('video')
                ? this.openEditor('video')
                : this.openEditor('image')
            }>
            <View style={{ backgroundColor: 'white' }}>
              <Image source={Images.edit} style={styles.editIcon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  renderListContent = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            selectedMood: item.name,
            selectedCategoryId: item.id,
            showDropDown: false,
          })
        }>
        <Text color="blue">{item.name}</Text>
      </TouchableOpacity>
    );
  };
  renderModal = () => {
    return (
      <Modal
        isVisible={this.state.postModal}
        onBackdropPress={() =>
          this.setState({
            postModal: false,
            selectedMood: '',
            Des: '',
            PhotoData: [],
            isUpdate: false,
            post_id: '',
          })
        }
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
              onChangeText={value => this.setState({ Des: value })}
              value={this.state.Des}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                //  backgroundColor: 'red',
              }}>
              <FlatList
                data={this.state.PhotoData}
                renderItem={this.renderDocs}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
              />

              {_.isEmpty(this.state.PhotoData) && this.ListFooterComponent()}
            </View>
            <Text color="blue" style={{ marginTop: 20 }} type="bold" size="small">
              post Related To
            </Text>
            <ButtonView
              style={styles.input}
              onPress={() =>
                this.setState({ showDropDown: !this.state.showDropDown })
              }>
              <Text color="blue" size="xSmall">
                {this.state.selectedMood}
              </Text>
              <Image
                source={Images.dropdown}
                style={{ height: 20, width: 20, marginTop: 5 }}
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
            {this.state.selectedMood === 'Others' && (
              <RNTextInput
                style={{
                  marginVertical: 15,
                  padding: 10,
                  backgroundColor: Colors.white,
                  width: '100%',
                  borderRadius: 10,
                  color: 'black',
                  textAlignVertical: 'top',
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
                placeholderTextColor={Colors.white2}
                onChangeText={value => this.setState({ newCategory: value })}
              />
            )}

            <ButtonView
              onPress={
                this.state.isUpdate == true ? this._onUpdate : this._onSubmit
              }
              style={styles.button}>
              {this.state.postUploadLoading ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                <Text textAlign="center" type="bold" size="normal">
                  {this.state.isUpdate == true ? 'Update Post' : 'post'}
                </Text>
              )}
            </ButtonView>
          </View>
        </View>
      </Modal>
    );
  };
  renderPhotoSelection = () => {
    return (
      <View>
        <ActionSheetCustom
          ref={o => (this.PhotoActionSheet = o)}
          title={'Select Photo'}
          options={[
            'Take a Photo',
            'Choose From Library',
            'Take a Video',
            'Cancel',
            'Upload Video',
          ]}
          cancelButtonIndex={3}
          onPress={index => {
            this.ActionsSheetPress(index);
          }}
          styles={styles}
        />
      </View>
    );
  };
  renderActionsSheet = () => {
    return (
      <View>
        <ActionSheetCustom
          ref={o => (this.ActionSheet = o)}
          title={'Post Detail'}
          options={['Edit Post', 'Cancel']}
          cancelButtonIndex={1}
          onPress={index => {
            if (index == 0) {
              this.openEditModal(index);
            } else {
              this.setState({
                selectedMood: '',
                Des: '',
                PhotoData: [],
                isUpdate: false,
                post_id: '',
              });
            }
          }}
          styles={styles}
        />
      </View>
    );
  };
  openEditModal = () => {
    this.setState({ postModal: true });
  };
  ActionsSheetPress = index => {
    if (index === 0) {
      this.requestCameraPermission();
    }
    if (index === 1) {
      this.openGallery();
    }
    if (index === 2) {
      this.setState({ postModal: false }, () => {
        setTimeout(() => {
          this.setState({ videoRecordingModal: true });
        }, 500);
      });
    }
    if (index === 4) {
      this.selectVideo();
    }
  };
  requestCameraPermission = async () => {
    if (Platform.OS == 'android') {
      try {
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
          this.openCamera();
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.openCamera();
    }
  };
  openCamera = () => {
    try {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchCamera(options, async response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = response.assets[0];
          console.log('source', source, 'source');
          const result = await ImageCompressor.compress(source.uri, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          this.setState({
            imageType: source.type,
            userImage: result,
            PhotoData: [
              ...this.state.PhotoData,
              {
                id: 1,
                imageURL: result,
                type: source.type,
                name: source.fileName,
              },
            ],
          });
        }
      });
    } catch (err) {
      // }
      console.log(err);
    }
  };
  selectVideo = () => {
    try {
      const options = {
        mediaType: 'video',
        includeBase64: true,
        durationLimit: 60,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          console.log(response);
          if (response.assets[0].duration >= 60) {
            util.topAlertError(
              'Video File should be less than or equal to 60 seconds',
            );
            return;
          } else {
            // const result = await VideoCompressor.compress(
            //   response.assets[0].uri,
            //   {
            //     compressionMethod: 'auto',
            //   },
            // );
            // console.log('result', result, 'result');
            // console.log('result', response.assets[0], 'result');
            this.setState({
              selectedVideo: response.assets[0].uri,
              type: response.assets[0].type,
              PhotoData: [
                ...this.state.PhotoData,
                {
                  id: 1,
                  videoUrl: response.assets[0].uri,
                  imageURL: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                },
              ],
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
      // console.warn(err);
    }
  };
  openGallery = () => {
    try {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          console.log(response);
          const source = response.assets[0];
          const result = await ImageCompressor.compress(source.uri, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          this.setState({
            imageType: source.type,
            userImage: result,
            PhotoData: [
              ...this.state.PhotoData,
              {
                id: 1,
                imageURL: result,
                type: source.type,
                name: source.fileName,
              },
            ],
          });
        }
      });
    } catch (err) {
      // console.warn(err);
    }
  };
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.centerInner, { marginTop: 20 }]}>
        <Text color="black">No Post found</Text>
      </View>
    );
  };
  openEditor = openWhichEditor => {
    if (openWhichEditor == 'photo') {
      PESDK.openEditor(
        {
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
        },
        configuration,
        serialization,
      )
        .then(result => {
          if (result !== null) {
            serialization = result?.serialization;
            // setImageAfterEditing(result?.image);
          }
          console.log('PESDK then called', result);
        })
        .catch(error => {
          console.log('PESDK catch called', error);
        })
        .finally(() => {
          console.log('PESDK finally called');
        });
    } else if (openWhichEditor == 'video') {
      console.log('this.state.videoUrl', this.state?.PhotoData[0]?.videoUrl);
      VESDK.openEditor(
        {
          uri: this.state?.PhotoData[0]?.videoUrl,
        },
        configuration,
        serialization,
      )
        .then(result => {
          if (result !== null) {
            // const finalVideo = await VideoCompressor.compress(result?.video, {
            //   compressionMethod: 'auto',
            // });
            let item = {
              ...this.state?.PhotoData[0],
              videoUrl: result?.video,
              imageURL: result?.video,
              type: `video/${result?.video?.slice(
                result?.video?.lastIndexOf('.') + 1,
              )}`,
              name: `post${Date.now()}.${result?.video.slice(
                result?.video?.lastIndexOf('.') + 1,
              )}`,
            };
            this.setState({
              PhotoData: [item],
            });
          }
          console.log('VESDK then called', result);
        })
        .catch(error => {
          console.log('VESDK catch called', error);
        })
        .finally(() => {
          console.log('VESDK finally called');
        });
    }
  };
  takeVideo = async camera => {
    const options = { quality: 0.5, maxDuration: 60, base64: true };
    this.setState({ recording: true });
    const data = await camera.recordAsync(options);
    // const result = await VideoCompressor.compress(data?.uri, {
    //   compressionMethod: 'auto',
    // });
    this.setState({
      selectedVideo: data?.uri,
      type: data?.type,
      PhotoData: [
        ...this.state?.PhotoData,
        {
          id: 2,
          videoUrl: data?.uri,
          imageURL: data?.uri,
          type: `video/${data?.uri?.slice(data?.uri?.lastIndexOf('.') + 1)}`,
          name: `post${Date.now()}.${data?.uri.slice(
            data?.uri?.lastIndexOf('.') + 1,
          )}`,
        },
      ],
    });
  };
  stopRecording = camera => {
    if (this.state.videoRecordingModal) {
      camera.stopRecording();
      this.setState({ recording: false });
      this.setState({ videoRecordingModal: false }, () => {
        setTimeout(() => {
          this.setState({ postModal: true });
        }, 500);
      });
    }
  };
  changeCamera = () => {
    this.setState({ changeCam: !this.state.changeCam });
  };
  render() {
    const { errors, loading } = this.state;
    const { navigation, postData } = this.props;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <Modal
          isVisible={this.state.videoRecordingModal}
          onBackdropPress={() =>
            this.setState({
              videoRecordingModal: false,
              postModal: true,
            })
          }
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropColor={'black'}
          style={{ alignSelf: 'center' }}>
          <View
            style={[
              AppStyles.centerInner,
              AppStyles.flex,
              {
                width: Metrics.screenWidth,
                height: Metrics.screenHeight,
                // marginBottom: -20,
                overflow: 'visible',
                backgroundColor: 'red',
                marginVertical: -20,
              },
            ]}>
            <VideoRecording
              stopRecording={this.stopRecording}
              takeVideo={this.takeVideo}
              recording={this.state.recording}
              changeCam={this.state.changeCam}
              changeCamera={this.changeCamera}
            />
            {/* <Text>Hello</Text> */}
          </View>
        </Modal>
        <CustomNavbar
          title="Testimonies"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={postData}
          //data={[1, 2]}
          ListHeaderComponent={this.listHeader}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
          //  onRefresh={this.fetchData}
          //  refreshing={loading}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.fetchData}
              tintColor="#000"
              titleColor="#000"
            />
          }
          extraData={this.props}
          ListEmptyComponent={this.renderEmpty}
        />
        {this.renderModal()}
        {this.renderPhotoSelection()}
        {this.renderActionsSheet()}
        {this.renderVideoModal()}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  data: user.data,
  postData: user.Posts,
  categoriesData: user.categories,
});

const actions = {
  getPostRequest,
  createPostRequest,
  likePostRequest,
  getPostSuccess,
  updatePostRequest,
};

export default connect(mapStateToProps, actions)(HomeTab);
