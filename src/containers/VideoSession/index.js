import React, {Component} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import {Images} from '../../theme';

const config = require('../../config/agora.config.json');
import styles from './styles';
import {requestToEndSessionRequest} from '../../actions/UserActions';
import {connect} from 'react-redux';

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  switchCamera: boolean;
  switchRender: boolean;
}

class VideoSession extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    const {item} = this.props.route.params;
    console.log(this.props.route.params);
    this.state = {
      channelId: item.channel,
      isJoined: false,
      remoteUid: [],
      switchCamera: true,
      switchRender: true,
      showText: false,
      uuid: this.props.route.params.uuid,
      token: item.token,
    };
  }

  // UNSAFE_componentWillMount() {
  //   this._initEngine();
  // }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId),
    );
    this._addListeners();

    await this._engine.enableVideo();

    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener('Warning', warningCode => {
      console.info('Warning', warningCode);
    });
    this._engine?.addListener('Error', errorCode => {
      console.info('Error', errorCode);
    });
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      this.setState({
        isJoined: true,
        remoteUid: [...this.state.remoteUid, uid],
      });
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      this.setState({remoteUid: [...this.state.remoteUid, uid]});
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      this.setState({
        remoteUid: this.state.remoteUid.filter(value => value !== uid),
      });
    });
    this._engine?.addListener('LeaveChannel', stats => {
      console.info('LeaveChannel', stats);
      this.setState({isJoined: false, remoteUid: []});
    });
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelId,
      null,
      this.state.uuid,
    );
  };

  _leaveChannel = async () => {
    await this._engine
      ?.leaveChannel()
      .then(check => {
        console.log('leave channel');
      })
      .catch(error => {
        console.log(error);
      });
  };

  _switchCamera = () => {
    const {switchCamera} = this.state;
    this._engine
      ?.switchCamera()
      .then(() => {
        this.setState({switchCamera: !switchCamera});
      })
      .catch(err => {
        console.warn('switchCamera', err);
      });
  };

  _switchRender = () => {
    const {switchRender, remoteUid} = this.state;
    this.setState({
      switchRender: !switchRender,
      remoteUid: remoteUid.reverse(),
    });
  };
  componentDidMount() {
    this._initEngine().then(this._joinChannel);
    setTimeout(() => {
      this.setState({showText: true});
    }, 500);
  }
  endSession = () => {
    const payload = {
      booking_id: this.props.route.params.booking_id,
    };
    this.props.requestToEndSessionRequest(payload, res => {
      if (res) {
        this._engine.destroy().then(this.props.navigation.goBack());
      }
    });
  };
  render() {
    const {channelId, isJoined, switchCamera} = this.state;
    const {type} = this.props.route.params;
    console.log(this.state.uuid, this.state.channelId, this.state.token);
    return (
      <View style={styles.container}>
        {this._renderVideo()}
        <View style={styles.float}>
          <TouchableOpacity onPress={this._switchCamera}>
            <Image
              source={Images.refresh}
              style={{height: 50, width: 50}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          // style={{position: 'absolute', right: 500}}
          //  onPress={type == 'user' ? this._leaveChannel : this._joinChannel}
          onPress={
            type == 'user'
              ? () => this._leaveChannel().then(this.props.navigation.goBack())
              : () => this.endSession()
          }
          style={{alignSelf: 'center'}}>
          <Image
            source={Images.Phone}
            style={{height: 50, width: 50}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderVideo = () => {
    const {remoteUid} = this.state;
    return (
      <View style={styles.container}>
        {this.state.showText && (
          <RtcLocalView.SurfaceView style={styles.local} />
        )}
        {remoteUid !== undefined && (
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.remote}
                onPress={this._switchRender}>
                <RtcRemoteView.SurfaceView
                  style={styles.container}
                  uid={value}
                  zOrderMediaOverlay={true}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };
}
const mapStateToProps = ({user}) => ({
  user: user,
});
const actions = {
  requestToEndSessionRequest,
};

export default connect(mapStateToProps, actions)(VideoSession);
