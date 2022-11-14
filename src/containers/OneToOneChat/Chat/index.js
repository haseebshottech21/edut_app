import React, {PureComponent} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  LogBox,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image as ImageCompressor} from 'react-native-compressor';
import ActionSheetCustom from 'react-native-actionsheet';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Actions,
} from 'react-native-gifted-chat';
import DocumentPicker from 'react-native-document-picker';
import AudioRecorderPlayer, {
  AVEncodingOption,
  AudioEncoderAndroidType,
} from 'react-native-audio-recorder-player';
import {connect} from 'react-redux';
import {CustomNavbar} from '../../../components';
import {Colors, Metrics} from '../../../theme';
import VideoPlayer from '../../../components/VideoPlayer';
import Loader from '../../../components/Loader';
import {postChatAttachments} from '../../../actions/OneToOneChat';
import {VoiceMessageAttachment} from '../../../components/AudioRecording/index';
import Utils from '../../../util';
import styles from './styles';

const audioRecorderPlayer = new AudioRecorderPlayer();
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
LogBox.ignoreAllLogs();
class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      textMsg: '',
      recordingActive: false,
      recordSecs: 0,
      recordTime: 0,
      chatKey: false,
      attachmentLoading: false,
      loadEarlier: true,
      isLoadingEarlier: false,
    };
    this.textMessage = React.createRef();
  }
  componentDidMount = () => {
    // this.connectToSocket();
    if (this.props.socketRef) {
      this.onGetMessage();
    }
  };
  onGetMessage = () => {
    this.props.socketRef.emit('get_messages', {
      receiver_id: this.props.route.params.group_id,
      sender_id: this.props.data.id,
    });
    this.props.socketRef.emit('mark-read', {
      sender_id: this.props.data.id,
      receiver_id: this.props.route.params.group_id,
    });
    let addMsg = [];
    this.props.socketRef.on('response', res => {
      LayoutAnimation.linear();
      console.log('res.object_type', res.object_type, 'res.object_type');
      if (res.object_type == 'send_message') {
        let msg;
        if (res.data[0]?.media_type && res.data[0]?.media_type !== null) {
          if (res.data[0]?.media_type == 'image') {
            msg = [
              {
                _id: Date.now(),
                image: res.data[0]?.media,
                user: {
                  _id: res.data[0].sender_id,
                  name: res.data[0].first_name,
                  avatar: res.data[0].image,
                },
              },
            ];
          } else if (res.data[0]?.media_type == 'video') {
            msg = [
              {
                _id: Date.now(),
                video: res.data[0]?.media,
                user: {
                  _id: res.data[0].sender_id,
                  name: res.data[0].first_name,
                  avatar: res.data[0].image,
                },
              },
            ];
          } else if (res.data[0]?.media_type == 'audio') {
            msg = [
              {
                _id: Date.now(),
                audio: res.data[0]?.media,
                user: {
                  _id: res.data[0].sender_id,
                  name: res.data[0].first_name,
                  avatar: res.data[0].image,
                },
              },
            ];
          } else if (res.data[0]?.media_type == 'application') {
            msg = [
              {
                _id: Date.now(),
                document: res.data[0]?.media,
                user: {
                  _id: res.data[0].sender_id,
                  name: res.data[0].first_name,
                  avatar: res.data[0].image,
                },
              },
            ];
          } else if (res.data[0]?.media_type == 'text') {
            msg = [
              {
                _id: Date.now(),
                document: res.data[0]?.media,
                user: {
                  _id: res.data[0].sender_id,
                  name: res.data[0].first_name,
                  avatar: res.data[0].image,
                },
              },
            ];
          }
        } else {
          msg = [
            {
              _id: Date.now(),
              text: res.data[0].message,
              user: {
                _id: res.data[0].sender_id,
                name: res.data[0].first_name,
                avatar: res.data[0].image,
              },
            },
          ];
        }
        this.setState(prevState => ({
          messages: [...msg, ...prevState.messages],
        }));
      } else if (res.object_type == 'get_messages') {
        res.data.map((item, index) => {
          let msg;
          if (item?.media_type && item?.media_type !== null) {
            if (item?.media_type == 'image') {
              msg = {
                _id: item?.id,
                image: item?.media,
                user: {
                  _id: item.sender_id,
                  name: item.first_name,
                  avatar: item.image,
                },
              };
            } else if (item?.media_type == 'video') {
              msg = {
                _id: item?.id,
                video: item?.media,
                user: {
                  _id: item.sender_id,
                  name: item.first_name,
                  avatar: item.image,
                },
              };
            } else if (item?.media_type == 'audio') {
              msg = {
                _id: item?.id,
                audio: item?.media,
                user: {
                  _id: item.sender_id,
                  name: item.first_name,
                  avatar: item.image,
                },
              };
            } else if (item?.media_type == 'application') {
              msg = {
                _id: item?.id,
                document: item?.media,
                user: {
                  _id: item.sender_id,
                  name: item.first_name,
                  avatar: item.image,
                },
              };
            } else if (item?.media_type == 'text') {
              msg = {
                _id: item?.id,
                document: item?.media,
                user: {
                  _id: item.sender_id,
                  name: item.first_name,
                  avatar: item.image,
                },
              };
            }
          } else {
            msg = {
              _id: item.id,
              text: item.message,
              user: {
                _id: item.sender_id,
                name: item.first_name,
                avatar: item.image,
              },
            };
          }
          addMsg.push(msg);
        });
        console.log('addMsg', addMsg, 'addMsg');
        this.setState({messages: addMsg?.reverse()});
      } else {
      }
      this.setState({attachmentLoading: false, loadEarlier: false});
    });
    this.props.socketRef.on('error', res => {
      this.setState({attachmentLoading: false});
    });
  };
  sendMessage = async (attachment, message) => {
    const assembleMedia = attachment && attachment !== null ? attachment : null;
    const payload = {
      sender_id: this.props.data.id,
      receiver_id: this.props.route.params.group_id,
      message: message ? message[0].text : '',
      media: assembleMedia !== null ? assembleMedia?.media : '',
      media_type: assembleMedia !== null ? assembleMedia?.media_type : '',
    };
    console.log('payload', payload);
    await this.props.socketRef.emit('send_message', {
      sender_id: this.props.data.id,
      receiver_id: this.props.route.params.group_id,
      message: message ? message[0].text : '',
      media: assembleMedia !== null ? assembleMedia?.media : '',
      media_type: assembleMedia !== null ? assembleMedia?.media_type : '',
    });
    await this.props.socketRef.emit('mark-read', {
      sender_id: this.props.data.id,
      receiver_id: this.props.route.params.group_id,
    });
    if (assembleMedia !== null) {
      this.setState({attachmentLoading: false});
    }
  };
  pickerActionSheet() {
    return (
      <View>
        <ActionSheetCustom
          ref={pickerRef => (this.PickerActionSheet = pickerRef)}
          title={'Select a Option'}
          options={[
            'Take a Photo',
            'Upload Photo',
            'Upload Video',
            'Upload Document',
            'Cancel',
          ]}
          cancelButtonIndex={4}
          onPress={index => {
            this.ActionsSheetPress(index);
          }}
          styles={styles}
        />
      </View>
    );
  }
  ActionsSheetPress = index => {
    if (index === 0) {
      this.requestCameraPermission();
    }
    if (index === 1) {
      this.openGallery();
    }
    if (index === 2) {
      this.selectVideo();
    }
    if (index === 3) {
      this.selectDocument();
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
          const source = response?.assets[0];
          const result = await ImageCompressor.compress(source?.uri, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          const payload = {
            uri: result,
            type: source?.type,
            name: source?.fileName,
          };
          this.onSendMediaAttachments(payload);
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
            const fileInfo = response?.assets[0];
            const payload = {
              uri: fileInfo?.uri,
              type: fileInfo?.type,
              name: fileInfo?.fileName,
            };
            this.onSendMediaAttachments(payload);
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
          const source = response?.assets[0];
          const result = await ImageCompressor.compress(source.uri, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          const payload = {
            uri: result,
            type: source?.type,
            name: source?.fileName,
          };
          this.onSendMediaAttachments(payload);
        }
      });
    } catch (err) {
      // console.warn(err);
    }
  };
  selectDocument = async () => {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
      //There can me more options as well find above
    });
    // await FileViewer.open(res.uri);
    const payload = {
      uri: res?.uri,
      type: res?.type,
      name: res?.name,
    };
    this.onSendMediaAttachments(payload);
  };
  renderSend(props) {
    const {recordingActive} = this.state;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{top: -10}}
          onPress={() => this.PickerActionSheet.show()}>
          <AntDesign name={'paperclip'} size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{top: -8, marginLeft: 12}}
          onPressOut={() => this.startRecording()}>
          <IonIcons name={'mic'} size={25} color={Colors.text.blue} />
        </TouchableOpacity>
        <Send {...props}>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginRight: 5,
              marginBottom: 8,
            }}>
            <Image
              source={require('./send.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                tintColor: Colors.blue,
              }}
            />
          </View>
        </Send>
      </>
    );
  }
  renderInputToolbar = props => {
    const {recordingActive, recordTime} = this.state;
    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };
    return (
      <>
        {!recordingActive ? (
          <InputToolbar
            {...props}
            containerStyle={styles.inputContainer}
            placeholderTextColor="black"
          />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <Animatable.View
                  easing={'ease-in'}
                  duration={1000}
                  animation={fadeIn}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IonIcons name={'mic'} size={25} color={Colors.text.blue} />
                  <Text style={{color: 'black', marginLeft: 15}}>
                    {recordTime}
                  </Text>
                </Animatable.View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.deleteAudioRecording()}
                    style={{
                      alignItems: 'center',
                      marginRight: 20,
                      marginBottom: 8,
                    }}>
                    <IonIcons
                      name={'trash'}
                      size={25}
                      color={Colors.text.red}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.onStopRecord()}
                    style={{
                      alignItems: 'center',
                      marginRight: 5,
                      marginBottom: 8,
                    }}>
                    <Image
                      source={require('./send.png')}
                      style={{
                        height: 25,
                        width: 25,
                        resizeMode: 'contain',
                        tintColor: Colors.blue,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </>
    );
  };
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        onPress={() => this.onMessagePress(props.currentMessage)}
        textStyle={{
          left: {
            backgroundColor: Colors.black,
            color: 'white',
          },
          right: {
            marginHorizontal: Metrics.baseMargin,
            backgroundColor: Colors.blue,
          },
        }}
        customTextStyle={{
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.blue,
          borderRadius: 4,
          padding: 8,
          paddingHorizontal: 10,
        }}
        wrapperStyle={{
          right: {
            backgroundColor: 'transparent',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4,
          },
          left: {
            backgroundColor: 'transparent',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4,
          },
        }}
        linkStyle={{
          right: {
            color: 'red',
          },
          left: {
            color: 'red',
          },
        }}
      />
    );
  }
  renderMessageVideo(props) {
    console.log('props.currentMessage.video', props.currentMessage.video);
    return (
      <View style={{height: Metrics.screenHeight * 0.2}}>
        <VideoPlayer
          video={props.currentMessage.video}
          style={{
            width: Metrics.screenWidth * 0.6,
            height: Metrics.screenHeight * 0.2,
          }}
          mediaPlaybackRequiresUserAction={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
          domStorageEnabled={true}
          injectedJavaScript={`
               document.getElementsByTagName("video")[0].removeAttribute("autoplay");
               document.getElementsByTagName("video")[0].style.objectFit = "cover";
           `}
          allowFileAccess={false}
        />
      </View>
    );
  }
  renderMessageAudio(props) {
    console.log('props.currentMessage.audio', props.currentMessage.audio);
    return (
      <VoiceMessageAttachment
        audio_length={0}
        asset_url={props.currentMessage.audio}
        type={'voice-message'}
      />
    );
  }
  get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }
  openCurrentFile = async file => {
    // console.log(file);
    Utils.openLinkInBrowser(file);
    // await Linking.openURL(file);
    // await FileViewer.open(file);
  };
  renderMessageDocument(props) {
    console.log('props', props.currentMessage.document);
    let extension;
    if (props.currentMessage.document) {
      extension = this.get_url_extension(props.currentMessage.document);
    }
    console.log('extension', extension);
    return (
      <>
        {props.currentMessage.document && extension == 'pdf' ? (
          <TouchableOpacity
            style={{marginVertical: 10}}
            activeOpacity={0.8}
            onPress={() => this.openCurrentFile(props.currentMessage.document)}>
            <FontAwesome5 name={'file-pdf'} size={70} color={Colors.text.red} />
          </TouchableOpacity>
        ) : props.currentMessage.document &&
          (extension == 'xls' || extension == 'xlsx') ? (
          <TouchableOpacity
            style={{marginVertical: 10}}
            activeOpacity={0.8}
            onPress={() => this.openCurrentFile(props.currentMessage.document)}>
            <FontAwesome5
              name={'file-excel'}
              size={70}
              color={Colors.text.green}
            />
          </TouchableOpacity>
        ) : props.currentMessage.document &&
          (extension == 'doc' || extension == 'docx') ? (
          <TouchableOpacity
            style={{marginVertical: 10}}
            activeOpacity={0.8}
            onPress={() => this.openCurrentFile(props.currentMessage.document)}>
            <FontAwesome5
              name={'file-word'}
              size={70}
              color={Colors.text.blue}
            />
          </TouchableOpacity>
        ) : props.currentMessage.document &&
          (extension == 'ppt' || extension == 'pptx') ? (
          <TouchableOpacity
            style={{marginVertical: 10}}
            activeOpacity={0.8}
            onPress={() => this.openCurrentFile(props.currentMessage.document)}>
            <FontAwesome5
              name={'file-powerpoint'}
              size={70}
              color={Colors.text.yellow}
            />
          </TouchableOpacity>
        ) : props.currentMessage.document && extension == 'txt' ? (
          <TouchableOpacity
            style={{marginVertical: 10}}
            activeOpacity={0.8}
            onPress={() => this.openCurrentFile(props.currentMessage.document)}>
            <FontAwesome
              name={'file-text'}
              size={70}
              color={Colors.text.white}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  }
  startRecording = async () => {
    console.log('startRecording');
    this.setState({recordingActive: true});
    const audioSet = {
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    };
    await audioRecorderPlayer.startRecorder(null, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
  };
  onPlayPause = async () => {
    // this.setState({ recordingPause: true });
    await audioRecorderPlayer.pauseRecorder();
  };
  onStopRecord = async () => {
    console.log('onStopRecord called');
    this.setState({recordingActive: false});
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({recordSecs: 0});
    const payload = {
      uri: result,
      type: 'audio/m4a',
      name: Date.now() + 'Audio.m4a',
    };
    this.onSendMediaAttachments(payload);
  };
  deleteAudioRecording = async () => {
    this.setState({recordingActive: false});
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({recordSecs: 0});
  };
  onSendMediaAttachments = async payload => {
    this.setState({attachmentLoading: true});
    let formData = new FormData();
    formData.append('media', payload);
    this.props.postChatAttachments(formData, res => {
      if (res) {
        this.sendMessage(res);
      }
      this.setState({attachmentLoading: false});
    });
  };
  render() {
    const {attachmentLoading, recordingActive} = this.state;
    return (
      <View key={this.state.chatKey} style={styles.container}>
        <Loader loading={attachmentLoading} />
        <CustomNavbar
          title={this.props.route.params.group_name}
          titleBackgroundColor="white"
          hasBack
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.sendMessage(null, messages)}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          alignTop={true}
          user={{
            _id: this.props.data.id,
            name: this.props.data.first_name,
            avatar: this.props.data.image,
          }}
          renderUsernameOnMessage={true}
          renderSend={props => this.renderSend(props)}
          textInputStyle={styles.inputStyle}
          renderInputToolbar={this.renderInputToolbar}
          renderMessageVideo={props => this.renderMessageVideo(props)}
          renderMessageAudio={props => this.renderMessageAudio(props)}
          renderCustomView={props => this.renderMessageDocument(props)}
          alwaysShowSend
          renderBubble={props => this.renderBubble(props)}
          showAvatarForEveryMessage={true}
          listViewProps={styles.listView}
          showUserAvatar
          inverted={true}
        />
        {this.pickerActionSheet()}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
  socketRef: user.socketRef,
});
const actions = {postChatAttachments};

export default connect(mapStateToProps, actions)(Chat);
