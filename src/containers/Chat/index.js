import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { CustomNavbar } from '../../components';
import { Colors, Images, Metrics } from '../../theme';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat';
import styles from './styles';
import { connect } from 'react-redux';

// const messages = [
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
//   {
//     sentBy: 'other',
//     text: 'Hello',
//     name: 'John Doe',
//     time: '12:00 PM',
//     image:
//       'https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//   },
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
//   {
//     sentBy: 'other',
//     text: 'Hello',
//     name: 'John Doe',
//     time: '12:00 PM',
//     image:
//       'https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//   },
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
//   {
//     sentBy: 'other',
//     text: 'Hello',
//     name: 'John Doe',
//     time: '12:00 PM',
//     image:
//       'https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//   },
//   {
//     sentBy: 'me',
//     text: 'Hello',
//     time: '12:00 PM',
//   },
// ];

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      isLoadingEarlier: false,
    };
  }
  componentDidMount = () => {
    this.onGetMessage();
  };
  connectToSocket = async () => {
    try {
      await this.socket.on('connect', ev => {
      });
    } catch (error) {
    }

    this.onGetMessage();
  };
  onGetMessage = () => {
    this.props.socketRef.emit('get_messages', {
      group_id: this.props.route.params.group_id,
      sender_id: this.props.data.id,
    });
    let addMsg = [];
    this.props.socketRef.on('response', res => {
      console.log('res', res);
      if (res.data?.length <= 1) {
        let msg;
        if (res?.data[0]?.group_id == this.props.route.params.group_id) {
          msg = [{
            _id: Date.now(),
            text: res.data[0].message,
            user: {
              _id: res.data[0].sender_id,
              name: res.data[0].first_name,
              avatar: res.data[0].image,
            },
          }];
          this.setState((prevState) => ({ messages: [...msg, ...prevState.messages] }));
        }
      } else {
        console.log('res.data', res.data)
        res.data.map((item, index) => {
          let msg;
          if (item?.group_id == this.props.route.params.group_id) {
            msg = {
              _id: item.id,
              text: item.message,
              user: {
                _id: item.sender_id,
                name: item.first_name,
                avatar: item.image,
              },
            }
            addMsg.push(msg);
          }
        });
        this.setState({ messages: addMsg?.reverse(), loadEarlier: false });
      }
    });
  };
  sendMessage = async message => {
    await this.props.socketRef.emit('send_message', {
      sender_id: this.props.data.id,
      group_id: this.props.route.params.group_id,
      message: message[0].text,
      media: null,
      media_type: null
    });
  };
  renderSend(props) {
    return (
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
    );
  }

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        placeholderTextColor="black"
      />
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
  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          title={this.props.route.params.group_name}
          titleBackgroundColor="white"
          hasBack
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.sendMessage(messages)}
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
          alwaysShowSend
          renderBubble={props => this.renderBubble(props)}
          showAvatarForEveryMessage={true}
          listViewProps={styles.listView}
          showUserAvatar
          inverted={true}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  data: user.data,
  socketRef: user.socketRef
});
const actions = {};

export default connect(mapStateToProps, actions)(Chat);
