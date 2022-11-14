// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TabBar,
  ButtonView,
  Loader,
} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import ListItem from './Item';
import FollowersItem from './FollowersItem';
import Modal from 'react-native-modal';
import {FollowingList} from '../../constants';
import MyChallenge from '../MyChallenge';
import {connect} from 'react-redux';
import {
  followPeopleRequest,
  encouragerListRequest,
} from '../../actions/ProfileActions';
import util from '../../util';

class Following extends React.Component {
  constructor(props) {
    super(props);
    console.log('checkkkkkk', this.props.route.params);

    this.state = {
      modal: false,
      selectedTab: 1,
      Encouraging: [],
      Encouragers: [],
      loading: false,
      loader: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};
  followingListView({item, index, navigation}) {
    return (
      <ListItem
        item={item}
        navigation={this.props.navigation}
        onFollow={() => this.onFollow(item)}
      />
    );
  }
  followerListView({item, index, navigation}) {
    return (
      <FollowersItem
        item={item}
        navigation={this.props.navigation}
        onFollow={() => this.onFollow(item)}
      />
    );
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }
  fetchData = () => {
    util.showLoader(this);
    const payload = {
      user_id: this.props.route.params.user_id,
    };
    this.props.encouragerListRequest(payload, res => {
      if (res) {
        util.hideLoader(this);
        this.setState({
          Encouraging: res.encouraging,
          Encouragers: res.encouragers,
        });
      }
      util.hideLoader;
    });
  };
  onFocusFunction = () => {
    const {selectedTab} = this.props.route.params;
    this.setState({selectedTab: selectedTab});
    this.fetchData();
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
            Encouraging
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
            Encouragers
          </Text>
        </ButtonView>
      </View>
    );
  }
  onFollow = item => {
    this.setState({loader: true});
    const payload = {
      following_id: item.id,
    };
    this.props.followPeopleRequest(payload, res => {
      if (res) {
        this.setState({loader: false});
        this.fetchData();
      }
      this.setState({loader: false});
    });
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
          title="Follow"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {this.renderTabBar()}
        {selectedTab == 1 ? (
          <FlatList
            contentContainerStyle={{marginVertical: 20, paddingBottom: 40}}
            data={this.state.Encouraging}
            renderItem={(item, index) =>
              this.followingListView(item, index, this.props.navigation)
            }
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
        ) : (
          <FlatList
            contentContainerStyle={{marginVertical: 20, paddingBottom: 40}}
            data={this.state.Encouragers}
            renderItem={(item, index) =>
              this.followerListView(item, index, this.props.navigation)
            }
            ListEmptyComponent={this.renderEmpty}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.fetchData}
                tintColor="#000"
                titleColor="#000"
              />
            }
          />
        )}
        <Loader loader={this.state.loader} />
      </ImageBackground>
    );
  }
}
const mapStateToProps = () => ({});

const actions = {followPeopleRequest, encouragerListRequest};

export default connect(mapStateToProps, actions)(Following);
