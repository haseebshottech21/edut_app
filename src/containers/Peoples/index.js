// @flow
import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TabBar,
  ButtonView,
  SearchBar,
  Loader,
} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {FollowingList} from '../../constants';
import {getPeoplesRequest} from '../../actions/UserActions';
import {followPeopleRequest} from '../../actions/ProfileActions';

import util from '../../util';

class Peoples extends React.Component {
  constructor(props) {
    super(props);
    console.log('checkkkkkk', this.props.route.params);

    this.state = {
      modal: false,
      selectedTab: 1,
      loading: false,
      loader: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};
  ListView({item, index, navigation}) {
    return (
      <ListItem
        item={item}
        navigation={this.props.navigation}
        onFollow={() => this.onFollow(item)}
      />
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
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (text = '') => {
    util.showLoader(this);

    const payload = {
      role: 'user',
      search: text,
    };
    this.props.getPeoplesRequest(payload, res => {
      if (res) {
        console.log('responded', res);
        util.hideLoader(this);
        this.setState({data: res});
      } else {
        this.setState({data: []});
      }
      util.hideLoader(this);
    });
  };

  componentWillUnmount() {}

  render() {
    const {selectedTab, loading, loader} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Peoples"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <SearchBar
          ref={ref => {
            this.myRef = ref;
          }}
          placeholder="Search peoples"
          value={this.state.searchValue}
          hasSearch={false}
          onSearchText={text =>
            this.setState({text: text}, this.fetchData(text))
          }
          hasRefresh={false}
          containerStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            marginHorizontal: Metrics.doubleBaseMargin,
          }}
          searchWrapper={{
            backgroundColor: Colors.white,
            alignSelf: 'center',
            borderRadius: 18,
            ...AppStyles.flexRow,
            marginVertical: 5,
          }}
        />
        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          data={this.state.data}
          renderItem={(item, index) =>
            this.ListView(item, index, this.props.navigation)
          }
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
        />

        <Loader loading={loader} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {getPeoplesRequest, followPeopleRequest};

export default connect(mapStateToProps, actions)(Peoples);
