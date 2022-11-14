// @flow
import _, { findIndex } from 'lodash';
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
  PLACEHOLDER_IMAGE,
  DATE_FORMAT1,
} from '../../constants';
import {
  Text,
  ButtonView,
  CustomNavbar,
  Avatar,
  SearchBar,
} from '../../components';
import { Images, AppStyles, Metrics, Colors } from '../../theme';
import styles from './styles';
import Util from '../../util';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import { likePostRequest, getPeoplesRequest } from '../../actions/UserActions';
import {
  sharePostRequest,
} from '../../actions/ProfileActions';
import util from '../../util';
import ListItem from './Item';
import VideoPlayer from '../../components/VideoPlayer';
class Testimony extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      postData: [],
    };
  }

  componentDidMount() {
    const postData = this.props.route.params.postData;
    this.setState({ postData: postData });
    this.fetchPeoples();
  }
  likePost = item => {
    const payload = {
      post_id: item.id,
    };
    this.props.likePostRequest(payload, res => {
      if (res) {
        console.log('cmpooooo', res);
        const Index = findIndex(this.state.postData, o => o.id == item.id);

        let tempData = _.cloneDeep(this.state.postData);
        tempData[Index].is_like = res.status;
        this.setState({ postData: tempData });
      }
    });
  };
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

  _onSubmit = () => {
    const { navigation, route } = this.props;
    const { userType } = route.params;

    if (this._validateForm()) {
      this.props.selectUserType(userType);
      if (userType == 'user') {
        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'home' }],
            params: userType,
          });
        }, 0);
      } else {
        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'driverHome' }],
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
          image={item?.userimage}
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
              {item?.username}
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
  renderDocs = item => {
    return (
      <View style={styles.docView}>
        <Image style={styles.imageDoc} source={{ uri: PLACEHOLDER_IMAGE }} />

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
          this.setState({ selectedMood: item, showDropDown: false })
        }>
        <Text color="blue">{item}</Text>
      </TouchableOpacity>
    );
  };
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
  render() {
    const { errors, loading } = this.state;
    const { navigation } = this.props;
    console.log(this.state.video);

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="My Testimony"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.postData}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
        />
        {this.renderModal()}
        {this.renderVideoModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = { likePostRequest, sharePostRequest, getPeoplesRequest };

export default connect(mapStateToProps, actions)(Testimony);
