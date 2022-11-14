// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TabBar,
  ButtonView,
  SearchBar,
} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList, PLACEHOLDER_IMAGE} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {FollowingList} from '../../constants';
import {getPeoplesRequest} from '../../actions/UserActions';
import util from '../../util';

class TherapistTab extends React.Component {
  constructor(props) {
    super(props);
    console.log('checkkkkkk', this.props.route.params);

    this.state = {
      modal: false,
      selectedTab: 1,
      loading: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};
  ListView({item, index, navigation}) {
    return <ListItem item={item} navigation={this.props.navigation} />;
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (text = '') => {
    util.showLoader(this);

    const payload = {
      role: 'therapist',
      search: text,
    };
    this.props.getPeoplesRequest(payload, res => {
      if (res) {
        console.log('responded', res);
        util.hideLoader(this);
        this.setState({data: res});
      }
      util.hideLoader(this);
    });
  };
  render() {
    const {selectedTab, loading} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Therapist"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <SearchBar
          ref={ref => {
            this.myRef = ref;
          }}
          placeholder="Search Therapist"
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
          //  data={[{id: 1, name: 'Therapist Name', image: PLACEHOLDER_IMAGE}]}
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
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({}) => ({});

const actions = {getPeoplesRequest};

export default connect(mapStateToProps, actions)(TherapistTab);
