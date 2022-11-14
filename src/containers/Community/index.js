// @flow
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { Component } from 'react';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  DATE_FORMAT1,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
  POST_LIST,
} from '../../constants';
import {
  Text,
  ButtonView,
  TextInput,
  CustomNavbar,
  Loader,
  Avatar,
} from '../../components';
import { Images, AppStyles, Metrics, Colors, Fonts } from '../../theme';
import styles from './styles';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import {
  getPostRequest,
  createPostRequest,
  likePostRequest,
  getPostSuccess,
  updatePostRequest,
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
import VideoRecording from '../HomeTab/videoRecording';
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
class Community extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      city: 'City',
      postModal: false,
      videoRecordingModal: false,
      moods: ['Anxiety', 'Depression', 'Tention'],
      selectedMood: 'Anxiety',
      showDropDown: false,
      loading: false,
      PhotoData: [],
      category: '',
      Des: '',
      isUpdate: false,
      post_id: '',
      video: '',
      postUploadLoading: false,
      changeCam: '',
      recording: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  getVideoDurations = duration => {
    getVideoDuration = Number(duration);
  };
  renderVideoModal() {
    return (
      <Modal
        isVisible={this.state.videoModal}
        onBackdropPress={() => this.setState({ videoModal: false })}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'#000'}
        // style={AppStyles.justifyContentCenter}
        style={{ alignSelf: 'center' }}>
        <View
          style={[
            AppStyles.centerInner,
            AppStyles.flex,
            {
              width: Metrics.screenWidth,
              // backgroundColor: 'red',
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
  likePost = item => {
    const payload = {
      post_id: item.id,
    };
    this.props.likePostRequest(payload, res => {
      if (res) {
      }
    });
  };
  fetchData = () => {
    util.showLoader(this);
    const payload = {
      type: 'community',
    };
    this.props.getPostRequest(payload, res => {
      if (res) {
        util.hideLoader(this);
      }
      util.hideLoader(this);
    });
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
  ActionsSheetPress = index => {
    // if (index === 0) {
    //   this.openCamera();
    // }
    // if (index === 1) {
    //   this.openGallery();
    // }
    // if (index === 2) {
    //   this.selectVideo();
    // }
    if (index === 0) {
      this.openCamera();
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
  selectVideo = async () => {
    try {
      const options = {
        mediaType: 'video',
        includeBase64: true,
        durationLimit: 10,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          if (response.assets[0].duration > 90) {
            util.topAlertError('Video File should be less than 90 seconds');
          } else {
            // const result = await VideoCompressor.compress(
            //   response.assets[0].uri,
            //   {
            //     compressionMethod: 'auto',
            //   },
            // );
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
      launchCamera(options, async response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
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
      // }
      console.warn(err);
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
  renderActionsSheet = () => {
    return (
      <View>
        <ActionSheetCustom
          ref={o => (this.ActionSheet = o)}
          title={'Your Post'}
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

  _onSubmit = () => {
    if (this.state.Des == '') {
      util.topAlertError('Please type Description');
    }
    // else if (_.isEmpty(this.state.PhotoData)) {
    //   util.topAlertError('Please upload Picture');
    // }
    else if (this.state.category == '') {
      util.topAlertError('Please Category Type');
    } else {
      this.setState({ postUploadLoading: !this.state.postUploadLoading });
      const formData = new FormData();
      formData.append('title', 'Sapmle');
      formData.append('description', this.state.Des);

      // formData.append('category_id', this.state.selectedCategoryId);
      formData.append('category_id', this.state.category);
      formData.append('type', 'community');

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
          this.setState({ postModal: false, postUploadLoading: false }, () => {
            this.fetchData();
          });
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
    // else if (_.isEmpty(this.state.PhotoData)) {
    //   util.topAlertError('Please upload Picture');
    // }
    else if (this.state.category == '') {
      util.topAlertError('Please Category Type');
    } else {
      this.setState({ postUploadLoading: !this.state.postUploadLoading });
      const formData = new FormData();
      formData.append('title', 'Sapmle');
      formData.append('description', this.state.Des);
      formData.append('post_id', this.state.post_id);

      // formData.append('category_id', this.state.selectedCategoryId);

      formData.append('category_id', this.state.category);

      formData.append('type', 'community');

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
          this.setState({ postModal: false, postUploadLoading: false }, () => {
            this.fetchData();
          });
        } else {
          this.setState({ postUploadLoading: false });
        }
      });
    }
  };
  openEditModal = () => {
    this.setState({ postModal: true });
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
          image={item.userimage}
          style={{
            alignSelf: 'flex-start',
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          imageStyle={{ height: 50, width: 50 }}
        />
        <View
          style={[
            AppStyles.flexRow,
            { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
          ]}>
          <View
            style={[
              {
                marginLeft: 10,
                alignItems: 'flex-start',
              },
            ]}>
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
                    category: item.category,
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
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          />

          <Text color="gray" size="xxSmall" style={[AppStyles.mLeft10]}>
            Comments {item.comments}
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
            style={{ marginVertical: 10 }}>
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
          <Image
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
    return (
      <View>
        {/*<View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text
            color="blue"
            size="large"
            type="bold"
            style={{marginLeft: 10, textDecorationLine: 'underline'}}>
            HI JOHN
          </Text>
          <Text color="black" style={{marginLeft: 10}} type="semi_bold">
            Topic of the Day
          </Text>
    </View>*/}
        <ButtonView
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 20,
            marginTop: 10,
            padding: 20,
          }}
          onPress={() => this.setState({ postModal: true })}>
          {
            // <View
            //   style={{
            //     flexDirection: 'row',
            //     alignItems: 'center',
            //     justifyContent: 'space-between',
            //   }}>
            //   <Text color="gray" size="small" style={{width: 200}}>
            //     Tell us about your childhood dreams
            //   </Text>
            //   <Image
            //     source={Images.edit}
            //     style={{
            //       height: 15,
            //       width: 15,
            //       //  alignSelf: 'flex-end',
            //       marginTop: -10,
            //     }}
            //   />
            // </View>
          }

          <Text
            color="blue"
            style={{ textDecorationLine: 'underline', marginTop: 10 }}>
            {'Create Post'}
          </Text>
        </ButtonView>
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
          style={{ alignSelf: 'center', height: 40, width: 40 }}
        />
      </ButtonView>
    );
  }
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
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.centerInner, { marginTop: 20 }]}>
        <Text color="black">No Post found</Text>
      </View>
    );
  };
  renderListContent = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({ selectedMood: item, showDropDown: false })
        }>
        <Text color="blue">{item}</Text>
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
            category: '',
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
            <RNTextInput
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: Colors.white,
                width: Metrics.screenWidth - 100,
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
              placeholder={`Whats's going on your mind `}
              placeholderTextColor={Colors.white2}
              onChangeText={value => this.setState({ category: value })}
              value={this.state.category}
            />
            {
              // <ButtonView
              //   style={styles.input}
              //   onPress={() =>
              //     this.setState({showDropDown: !this.state.showDropDown})
              //   }>
              //   <Text color="blue" size="xSmall">
              //     {this.state.selectedMood}
              //   </Text>
              //   <Image
              //     source={Images.dropdown}
              //     style={{height: 20, width: 20, marginTop: 5}}
              //     resizeMode="contain"
              //   />
              // </ButtonView>
              // {this.state.showDropDown && (
              //   <View style={styles.dropdownView}>
              //     {this.state.moods.map((item, index) => {
              //       return this.renderListContent(item);
              //     })}
              //   </View>
              // )}
            }

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

        })
        .catch(error => {

        })
        .finally(() => {

        });
    } else if (openWhichEditor == 'video') {
      VESDK.openEditor(
        {
          uri: this.state?.PhotoData[0]?.videoUrl,
        },
        configuration,
        serialization,
      )
        .then(async result => {
          if (result !== null) {
            // const finalVideo = await VideoCompressor.compress(result?.video, {
            //   compressionMethod: 'auto',
            // });
            let item = {
              ...this.state?.PhotoData[0],
              type: `video/${result?.video?.slice(
                result?.video?.lastIndexOf('.') + 1,
              )}`,
              name: `post${Date.now()}.${result?.video.slice(
                result?.video?.lastIndexOf('.') + 1,
              )}`,
              videoUrl: result?.video,
              imageURL: result?.video,
            };
            this.setState({
              PhotoData: [item],
            });
          }
        })
        .catch(error => {

        })
        .finally(() => {
        });
    }
  };
  takeVideo = async camera => {
    const options = { quality: 0.5, maxDuration: 12, base64: true };
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
        <CustomNavbar
          title="Personal Growth"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
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
        <FlatList
          data={postData}
          ListHeaderComponent={this.listHeader}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
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
});

const actions = {
  getPostRequest,
  createPostRequest,
  likePostRequest,
  getPostSuccess,
  updatePostRequest,
};

export default connect(mapStateToProps, actions)(Community);
