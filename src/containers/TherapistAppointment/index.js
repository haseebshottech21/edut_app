// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {DATE_FORMAT1, DATE_FORMAT_TIME1, FollowingList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {
  bookingsRequest,
  startSessionRequest,
  requestToStartSessionRequest,
} from '../../actions/UserActions';
import {connect} from 'react-redux';
import util from '../../util';

class TherapistAppointment extends React.Component {
  state = {
    modal: true,
  };
  static propTypes = {};

  static defaultProps = {};
  listView = ({item, index}) => {
    return (
      <ListItem
        item={item}
        index={index}
        navigation={this.props.navigation}
        btnPress={() => this.startSession(item)}
      />
    );
  };
  startSession = item => {
    var date1 = util.getFormattedDateTime(item.booking_date, DATE_FORMAT1);
    console.log(date1);

    const payload = {
      isPublisher: true,
      sender_id: item.therapist_id,
      reciever_id: item.user_id,
      booking_id: item.id,
      name: item.name,
    };
    const newParam = JSON.stringify(payload);

    const data = {
      booking_id: item.id,
    };
    util.showLoader(this);

    this.props.requestToStartSessionRequest(data, res => {
      if (res) {
        util.hideLoader(this);
        this.props.startSessionRequest(newParam, newres => {
          if (newres) {
            util.hideLoader(this);

            console.log('inComonent', newres);
            this.props.navigation.navigate('videoSession', {
              item: newres,
              type: 'therapist',
              uuid: item.therapist_id,
              booking_id: item.id,
            });
          }
          util.hideLoader(this);
        });
      }
      util.hideLoader(this);
    });
    // this.props.startSessionRequest(newParam, res => {
    //   if (res) {
    //     util.hideLoader(this);

    //     console.log('inComonent', res);
    //     this.props.navigation.navigate('videoSession', {
    //       item: res,
    //       type: 'therapist',
    //       uuid: item.therapist_id,
    //     });
    //   }
    //   util.hideLoader(this);
    // });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }
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
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={AppStyles.alignItemsCenter}>
        <Text color="black">No Appointments found</Text>
      </View>
    );
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
const actions = {
  bookingsRequest,
  startSessionRequest,
  requestToStartSessionRequest,
};

export default connect(mapStateToProps, actions)(TherapistAppointment);
