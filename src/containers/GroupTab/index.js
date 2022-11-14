import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ButtonView, CustomNavbar} from '../../components';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import {connect} from 'react-redux';
import {
  prayerGroupRequest,
  joinGroupRequest,
} from '../../actions/GroupActions.js';
import util from '../../util';
import * as Animatable from 'react-native-animatable';
import {PLACEHOLDER_IMAGE} from '../../constants';
import styles from './styles';

class GroupTab extends Component {
  state = {
    selection: 'your',
    MyGroupData: [],
    ExploreData: [],
    loading: false,
    width: 0,
    showText: false,
    verseData: '',
    count: 0,
    // text: '',
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getCountOfMessages();
      this.fetchData();
    });
    setInterval(() => {
      this.setState({showText: !this.state.showText});
    }, 2000);
  }

  fetchData = () => {
    util.showLoader(this);

    this.props.prayerGroupRequest(res => {
      if (res) {
        util.hideLoader(this);
        console.log('checkkkkkkk', res);
        this.setState({
          MyGroupData: res.your_group,
          ExploreData: res.explorer_groups,
          verseData: res.verse.verse_description,
        });
      }
      util.hideLoader(this);
    });
  };
  getCountOfMessages = () => {
    this.props.socketRef.emit('unread-count', {
      sender_id: this.props.data.id,
    });
    this.props.socketRef.on('response', res => {
      if (res?.object_type == 'unread-count') {
        console.log('res?.object_type == unread-count', res?.data);
        if (res?.data) {
          this.setState({count: res?.data});
        } else {
          this.setState({count: 0});
        }
      }
    });
    this.props.socketRef.on('error', res => {
      console.log('error', res);
      this.setState({count: 0});
    });
  };
  _renderYourGroup = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('Chat', {
            group_id: item.id,
            group_name: item.name,
          })
        }
        style={{
          padding: 15,
          paddingHorizontal: 10,
          borderRadius: 5,
          borderColor: Colors.blue,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: 45,
            height: 45,
            resizeMode: 'contain',
            borderRadius: 45,
          }}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: 20,
            color: Colors.blue,
            fontWeight: '400',
            fontSize: 12,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  // componentDidMount() {
  //   setTimeout(() => {
  //     LayoutAnimation.spring();
  //     this.setState({
  //       text: 'Lorem Ipsum is simply dummy text of the printing and typesetting did',
  //     });
  //   }, 1500);
  // }
  _renderExploreGroup = ({item, index}) => {
    return (
      <View
        style={{
          padding: 15,
          paddingHorizontal: 10,
          borderRadius: 5,
          borderColor: Colors.blue,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          marginBottom: 10,
          marginHorizontal: 20,
        }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: 45,
            height: 45,
            resizeMode: 'contain',
            borderRadius: 45,
          }}
        />

        <Text
          style={{
            flex: 1,
            marginLeft: 20,
            color: Colors.blue,
            fontWeight: '400',
            fontSize: 12,
          }}>
          {item.name}
        </Text>
        <ButtonView
          style={{
            padding: 7.5,
            backgroundColor: Colors.blue,
            borderRadius: 30,
          }}
          onPress={() => this.onJoinGroup(item)}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>
            Join Group
          </Text>
        </ButtonView>
      </View>
    );
  };
  onJoinGroup = item => {
    util.showLoader(this);
    const payload = {
      group_id: item.id,
    };
    this.props.joinGroupRequest(payload, res => {
      if (res) {
        this.fetchData();
        this.setState({selection: 'your'});
      }
      util.hideLoader(this);
    });
  };
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.centerInner, {marginTop: 20}]}>
        <Text color="black">No Group found</Text>
      </View>
    );
  };
  render() {
    const {selection, loading, count} = this.state;
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <CustomNavbar
          title="Prayer Group"
          titleBackgroundColor="white"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            // marginHorizontal: 20,
            // marginTop: 10,
            margin: 20,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{marginLeft: 10, color: 'black', fontWeight: 'bold'}}>
            Verse of the Day
          </Text>
          {/*<Text style={{marginTop: 10, color: 'gray', textAlign: 'center'}}>
            this.state.text
        </Text>*/}
          {/* <TouchableOpacity
            onPress={() =>
              this.setState({fontSize: (this.state.fontSize || 10) + 5})
            }>*/}
          {this.state.showText ? (
            <Animatable.Text
              easing={'ease-in'}
              duration={1000}
              // transition="start"
              animation={'bounceInLeft'}
              // style={{width: this.state.width}}
              numberOfLines={this.state.width}>
              {this.state.verseData}
            </Animatable.Text>
          ) : null}
          {/*</TouchableOpacity>*/}
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            borderColor: Colors.blue,
            borderWidth: 1,
            borderRadius: 5,
            overflow: 'hidden',
            marginHorizontal: 20,
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({selection: 'your'})}
            activeOpacity={0.8}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selection === 'your' ? Colors.blue : 'white',
            }}>
            <Text
              style={{
                color: selection === 'explore' ? Colors.blue : 'white',
                fontWeight: '500',
              }}>
              Your Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({selection: 'explore'})}
            activeOpacity={0.8}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selection === 'explore' ? Colors.blue : 'white',
            }}>
            <Text
              style={{
                color: selection === 'your' ? Colors.blue : 'white',
                fontWeight: '500',
              }}>
              Explore Group
            </Text>
          </TouchableOpacity>
        </View>
        {selection === 'your' ? (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              activeOpacity={0.8}
              style={{
                height: 30,
                paddingHorizontal: 10,
                borderRadius: 30,
                backgroundColor: Colors.blue,
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginRight: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Create Group +
              </Text>
            </TouchableOpacity>
            <FlatList
              style={{marginHorizontal: 20, marginTop: 20}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              data={this.state.MyGroupData}
              ListEmptyComponent={this.renderEmpty}
              renderItem={this._renderYourGroup}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.fetchData}
                  tintColor="#000"
                  titleColor="#000"
                />
              }
              bounces={false}
            />
          </View>
        ) : (
          <FlatList
            style={{marginTop: 20}}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{paddingBottom: 140}}
            data={this.state.ExploreData}
            renderItem={this._renderExploreGroup}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.fetchData}
                tintColor="#000"
                titleColor="#000"
              />
            }
            ListEmptyComponent={this.renderEmpty}
          />
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.uploadImagePlacement}
          onPress={() => this.props.navigation.navigate('ChatList')}>
          <Animatable.View
            easing={'ease-in'}
            animation={'bounceInRight'}
            style={styles.uploadImage}
            useNativeDriver={true}>
            <IonIcons
              name={'chatbubble-ellipses'}
              size={60}
              color={Colors.text.blue}
            />
            {count !== 0 ? (
              <View style={styles.countPlacement}>
                <Text style={{color: '#000'}}>{count}</Text>
              </View>
            ) : null}
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = ({user}) => ({
  data: user.data,
  socketRef: user.socketRef,
});

const actions = {prayerGroupRequest, joinGroupRequest};

export default connect(mapStateToProps, actions)(GroupTab);
