// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import PhotosItem from './PhotosItem';
import VidoesItem from './VidoesItem';
import Modal from 'react-native-modal';
import {FollowingList} from '../../constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  uploadMediaRequest,
  getMediaRequest,
} from '../../actions/ProfileActions';
import {connect} from 'react-redux';
import util from '../../util';
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    console.log('checkkkkkk', this.props.route.params);

    this.state = {
      modal: false,
      selectedTab: 1,
      loading: false,
      selectedVideo: '',
      selectedImage: '',
      photoData: [],
      videosData: [],
    };
  }

  static propTypes = {};

  static defaultProps = {};
  componentDidMount() {
    this.fetchData();
  }
  renderPhoto({item, index, navigation}) {
    return <PhotosItem item={item} navigation={this.props.navigation} />;
  }
  selectVideo = async () => {
    try {
      const options = {
        mediaType: 'video',
        includeBase64: true,
        durationLimit: 10,
      };
      launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          console.log(response);
          if (response.assets[0].duration > 90) {
            util.topAlertError('Video File should be less than 90 seconds');
          } else {
            this.setState(
              {
                selectedVideo: response.assets[0].uri,
                type: response.assets[0].type,
                fileName: response.assets[0].fileName,
              },
              () => {
                this.uploadVideo();
              },
            );
          }
        }
      });
    } catch (err) {
      console.log(err);
      // console.warn(err);
    }
  };
  selectImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: true,
      };
      launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          console.log(response);

          this.setState(
            {
              selectedImage: response.assets[0].uri,
              type: response.assets[0].type,
              fileName: response.assets[0].fileName,
            },
            () => {
              this.uploadImage();
            },
          );
        }
      });
    } catch (err) {
      console.log(err);
      // console.warn(err);
    }
  };
  uploadVideo = () => {
    util.showLoader(this);
    const formData = new FormData();

    const payload = {
      uri: this.state.selectedVideo,
      type: this.state.type,
      name: this.state.fileName,
    };
    formData.append('media', payload);
    this.props.uploadMediaRequest(formData, res => {
      if (res) {
        util.hideLoader(this);

        this.fetchData();
      }
      util.hideLoader(this);
    });
  };
  uploadImage = () => {
    util.showLoader(this);
    const formData = new FormData();

    const payload = {
      uri: this.state.selectedImage,
      type: this.state.type,
      name: this.state.fileName,
    };
    formData.append('media', payload);
    this.props.uploadMediaRequest(formData, res => {
      if (res) {
        util.hideLoader(this);
        this.fetchData();
      }
      util.hideLoader(this);
    });
  };
  renderVideos({item, index, navigation}) {
    return <VidoesItem item={item} navigation={this.props.navigation} />;
  }

  fetchData = () => {
    util.showLoader(this);

    const payload = {
      user_id: this.props.route.params.user_id,
    };
    this.props.getMediaRequest(payload, res => {
      if (res) {
        console.log(res, 'checkkkkkk');
        util.hideLoader(this);
        this.setState({photoData: res.images, videosData: res.videos});
      }
      util.hideLoader(this);
    });
  };
  onFocusFunction = () => {
    this.fetchData;
    // alert(‘called’); // do some stuff on every screen focus
  };
  componentWillUnmount() {}

  renderTabBar() {
    const {selectedTab} = this.state;
    return (
      <View style={styles.TabContainer}>
        <ButtonView
          style={[
            {
              flex: 1,
              alignItems: 'center',

              paddingVertical: 10,
            },
            selectedTab == 1
              ? {backgroundColor: Colors.blue}
              : {backgroundColor: Colors.white},
          ]}
          onPress={() => this.setState({selectedTab: 1})}>
          <Text size="xxSmall" color={selectedTab == 1 ? 'white' : 'blue'}>
            Photos
          </Text>
        </ButtonView>

        <ButtonView
          style={[
            {
              flex: 1,
              alignItems: 'center',

              paddingVertical: 10,
            },
            selectedTab == 2
              ? {backgroundColor: Colors.blue}
              : {backgroundColor: Colors.white},
          ]}
          onPress={() => this.setState({selectedTab: 2})}>
          <Text size="xxSmall" color={selectedTab == 2 ? 'white' : 'blue'}>
            Videos
          </Text>
        </ButtonView>
      </View>
    );
  }
  renderHeader = () => {
    const {selectedTab} = this.state;
    return (
      <View style={{marginHorizontal: Metrics.baseMargin}}>
        <ButtonView
          style={{
            backgroundColor: Colors.blue,
            alignSelf: 'flex-end',
            borderRadius: 20,
            margin: 10,
            padding: 5,
            //  paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            this.state.selectedTab == 1
              ? this.selectImage()
              : this.selectVideo()
          }>
          <Text
            color="white"
            type="bold"
            size="xxSmall"
            style={{marginHorizontal: 10}}>
            Add {selectedTab == 1 ? 'Photo' : 'Videos'}
          </Text>
          <Text size="xLarge" style={{marginHorizontal: 10}}>
            +
          </Text>
        </ButtonView>
      </View>
    );
  };
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.alignItemsCenter, AppStyles.mTop30]}>
        <Text color="black">No Data found</Text>
      </View>
    );
  };

  render() {
    const {selectedTab, loading} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title={selectedTab == 1 ? 'Photos' : 'Videos'}
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {this.renderTabBar()}
        {this.props.route.params?.showAddButton ? this.renderHeader() : null}

        {selectedTab == 1 ? (
          <FlatList
            contentContainerStyle={{
              marginHorizontal: 10,
            }}
            data={this.state.photoData}
            renderItem={(item, index) =>
              this.renderPhoto(item, index, this.props.navigation)
            }
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.fetchData}
                tintColor="#000"
                titleColor="#000"
              />
            }
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderEmpty}
          />
        ) : (
          <FlatList
            data={this.state.videosData}
            renderItem={(item, index) =>
              this.renderVideos(item, index, this.props.navigation)
            }
            numColumns={2}
            // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
            showsVerticalScrollIndicator={false}
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
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({user}) => ({
  data: user.data,
});
const actions = {uploadMediaRequest, getMediaRequest};

export default connect(mapStateToProps, actions)(Gallery);
