// @flow
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ImageBackground,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import {
  DATE_FORMAT1,
} from '../../constants';
import {
  Text,
  ButtonView,
  CustomNavbar,
  Loader,
  Avatar,
  SearchBar,
} from '../../components';
import { Images, AppStyles, Metrics, Colors } from '../../theme';
import styles from './styles';
import {
  viewProfileRequest,
  sharePostRequest,
} from '../../actions/ProfileActions';
import { likePostRequest, getPeoplesRequest } from '../../actions/UserActions';
import Modal from 'react-native-modal';
import util from '../../util';
import ReadMore from 'react-native-read-more-text';
import ListItem from './Item';
import VideoPlayer from '../../components/VideoPlayer';
class TherapistProfileTab extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      loading: false,
      userItem: {},
      postData: [],
      data: [],
      post_id: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
      this.fetchPeoples();
    });
  }
  fetchPeoples = (text = '') => {
    util.showLoader(this);

    const payload = {
      role: '',
      search: text,
    };
    this.props.getPeoplesRequest(payload, res => {
      if (res) {
        console.log('responded', res);
        util.hideLoader(this);
        this.setState({ data: res });
      } else {
        this.setState({ data: [] });
      }
      util.hideLoader(this);
    });
  };

  fetchData = () => {
    const { id } = this.props.data;

    const payload = {
      user_id: id,
    };
    util.showLoader(this);

    this.props.viewProfileRequest(payload, res => {
      if (res) {
        console.log('componenntnnn', res);
        util.hideLoader(this);
        this.setState({
          userItem: {
            encouragers: res.encouragers,
            encouraging: res.encouraging,
            expeirence: res.expeirence,
            hourly_rate: res.hourly_rate,
            id: res.id,
            image: res.image,
            name: res.name,
            story: res.story,
            city: res.city,
            country: res.country,
            state: res.state,
            schedules: res.schedules,
            specilities: res.specilities,
            certificates: res.certificates,
          },
          postData: res.post,
        });
        util.hideLoader(this);
      }
    });
  };
  renderHeader = () => {
    const { userItem } = this.state;

    return (
      <View style={AppStyles.mTop15}>
        <Avatar
          image={userItem.image}
          style={{ height: 100, width: 100, borderRadius: 50 }}
          imageStyle={{ height: 100, width: 100 }}
        />
        <ButtonView
          style={styles.uploadView}
          // onPress={() => this.props.navigation.navigate('completeProfile')}
          onPress={() =>
            this.props.navigation.navigate('updateTherapistProfile1')
          }>
          <Image source={Images.edit} style={styles.uploadIcon} />
        </ButtonView>
        <Text
          textAlign="center"
          color="black"
          size="large"
          type="semi_bold"
          style={AppStyles.marginVerticalBase}>
          {userItem.name}
        </Text>
      </View>
    );
  };
  renderButtonItem3 = () => {
    const { userItem } = this.state;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            marginHorizontal: 10,
          }}
          onPress={() =>
            this.props.navigation.navigate('following', {
              user_id: userItem.id,
              selectedTab: 1,
            })
          }>
          <Text
            color="white"
            size="xxSmall"
            type="bold"
          //  onPress={() => this.setState({modal: false})}
          >
            Encouraging
          </Text>
          <Text color="white" size="small" style={AppStyles.mTop2}>
            {userItem?.encouraging}
          </Text>
        </ButtonView>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
          }}
          onPress={() =>
            this.props.navigation.navigate('following', {
              user_id: userItem.id,
              selectedTab: 2,
            })
          }>
          <Text
            color="white"
            size="xxSmall"
            type="bold"
          //  onPress={() => this.setState({modal: false})}
          >
            Encouragers
          </Text>
          <Text color="white" size="small" style={AppStyles.mTop2}>
            {userItem?.encouragers}
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderButtonItem2 = () => {
    const { userItem } = this.state;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 23,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            marginHorizontal: 10,
          }}
          onPress={() =>
            this.props.navigation.navigate('about', {
              userItem: userItem,
            })
          }>
          <Text
            color="white"
            size="xxSmall"
            type="bold"
          //  onPress={() => this.setState({modal: false})}
          >
            About
          </Text>
        </ButtonView>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            paddingVertical: 23,
          }}
          onPress={() =>
            this.props.navigation.navigate('gallery', {
              user_id: userItem.id,
              showAddButton: true,
            })
          }>
          <Text
            color="white"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="bold">
            Gallery
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderButtonItem1 = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 23,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            marginHorizontal: 10,
          }}
        //  onPress={() => this.props.navigation.navigate('about')}
        >
          <Text
            color="white"
            size="xxSmall"
            type="bold"
          //  onPress={() => this.setState({modal: false})}
          >
            Get featured
          </Text>
        </ButtonView>
        <ButtonView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 15,
            borderRadius: 5,
            width: Metrics.screenWidth / 2 - 30,
            paddingVertical: 23,
          }}
        //  onPress={() => this.props.navigation.navigate('gallery')}
        >
          <Text
            color="white"
            size="xxSmall"
            style={AppStyles.mTop2}
            type="bold">
            Get Verified
          </Text>
        </ButtonView>
      </View>
    );
  };
  likePost = item => {
    const payload = {
      post_id: item.id,
    };
    this.props.likePostRequest(payload, res => {
      if (res) {
        this.fetchData();
      }
    });
  };
  sharePost = item => {
    const payload = {
      post_id: this.state.post_id,
      shared_to: item.id,
    };
    this.props.sharePostRequest(payload, res => {
      if (res) {
        this.setState({ modal: false }, () => {
          util.topAlert('Posrt Share successfully');
        });
        //this.props.navigation.goBack();
      }
    });
  };
  renderUser = item => {
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
          <View style={[{ marginLeft: 10, alignItems: 'center' }]}>
            <Text color="black" size="xSmall" type="semi_bold">
              {item.username}
            </Text>
            <Text
              color="black"
              size="xxSmall"
              type="thin"
              style={[AppStyles.mTop2]}>
              {util.getFormattedDateTime(item?.post_date, DATE_FORMAT1)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  ListView({ item, index, navigation }) {
    return (
      <ListItem
        item={item}
        navigation={this.props.navigation}
        closeModal={() =>
          this.setState({ modal: false }, () => {
            this.sharePost(item);
          })
        }
      />
    );
  }
  renderModal() {
    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({ modal: false })}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <Text
            textAlign="center"
            size="large"
            color="blue"
            type="bold"
            style={{ marginVertical: Metrics.baseMargin }}>
            Share Post
          </Text>

          <SearchBar
            ref={ref => {
              this.myRef = ref;
            }}
            placeholder="Search User"
            value={this.state.searchValue}
            hasSearch={false}
            onSearchText={text =>
              this.setState({ text: text }, this.fetchPeoples(text))
            }
            hasRefresh={false}
            containerStyle={{
              marginHorizontal: Metrics.baseMargin,
            }}
            searchWrapper={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              marginHorizontal: Metrics.baseMargin,
              backgroundColor: Colors.white,

              alignSelf: 'center',
              borderRadius: 18,
              ...AppStyles.flexRow,
              marginVertical: 10,
            }}
          />
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={this.state.data}
            renderItem={(item, index) =>
              this.ListView(item, index, this.props.navigation)
            }
            // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    );
  }
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
            size="xSmall"
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
          onPress={() => this.setState({ modal: true, post_id: item.id })}>
          <Image
            source={Images.share}
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          />

          <Text
            color="blue"
            size="xSmall"
            type="semi_bold"
            textAlign="center"
            style={AppStyles.mLeft10}>
            Share
          </Text>
        </ButtonView>
      </View>
    );
  }
  renderPosts = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          margin: 24,
          padding: 20,
        }}>
        {this.renderUser(item)}
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
            {item?.description}
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

        {this.renderActionButton(item)}
      </View>
    );
  };

  renderHeaderComponent() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderButtonItem1()}
        {this.renderButtonItem2()}
        {this.renderButtonItem3()}
      </View>
    );
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
  render() {
    const { errors, loading, userItem } = this.state;
    const { navigation } = this.props;
    console.log(this.state.video);

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title={userItem.name}
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={this.state.postData}
          ListHeaderComponent={() => this.renderHeaderComponent()}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
        />
        <Loader loading={loading} />
        {this.renderModal()}
        {this.renderVideoModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  data: user.data,
});
const actions = {
  viewProfileRequest,
  likePostRequest,
  getPeoplesRequest,
  sharePostRequest,
};

export default connect(mapStateToProps, actions)(TherapistProfileTab);
