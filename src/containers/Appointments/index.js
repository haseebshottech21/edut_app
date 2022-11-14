// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {FollowingList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {bookingsRequest} from '../../actions/UserActions';
import {connect} from 'react-redux';
import util from '../../util';

class Appointments extends React.Component {
  state = {
    modal: true,
    loading: false,
    data: [],
  };
  static propTypes = {};

  static defaultProps = {};
  listView = ({item, index}) => {
    return (
      <ListItem item={item} index={index} navigation={this.props.navigation} />
    );
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={AppStyles.alignItemsCenter}>
        <Text color="black">No Appointments found</Text>
      </View>
    );
  };
  onFocusFunction = () => {
    util.showLoader(this);
    this.props.bookingsRequest({}, res => {
      if (res) {
        util.hideLoader(this);
        this.setState({data: res});
      }
      util.hideLoader(this);
    });
  };

  render() {
    const {loading} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="My Appointments"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          data={this.state.data}
          renderItem={this.listView}
          // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.onFocusFunction}
              tintColor="#000"
              titleColor="#000"
            />
          }
          ListEmptyComponent={this.renderEmpty}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user,
});
const actions = {bookingsRequest};

export default connect(mapStateToProps, actions)(Appointments);
