// @flow
import {connect} from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import React, {Component} from 'react';
import {Images, AppStyles} from '../../theme';
import {CustomNavbar} from '../../components';
import {getPaymentHistoryRequest} from '../../actions/UserActions';
import util from '../../util';
const dummyData = [
  {
    detail: 'Dr. John Doe',
    date: 'Feb 28, 2022',
    price: 100,
  },
  {
    detail: 'Dr. Ross Geller',
    date: 'Feb 28, 2022',
    price: 100,
  },
  {
    detail: 'Dr. Chandler Bing',
    date: 'Feb 28, 2022',
    price: 100,
  },
  {
    detail: 'Dr. Joey Tribbani',
    date: 'Feb 28, 2022',
    price: 100,
  },
];

class PaymentsHistory extends Component {
  state = {
    loading: false,
    data: [],
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  fetchData = () => {
    //  util.showLoader(this);
    this.props.getPaymentHistoryRequest({}, res => {
      if (res) {
        util.hideLoader(this);
        this.setState({data: res});
      }
      util.hideLoader(this);
    });
  };
  _renderItem = ({item}) => {
    const {name, payment_date, total} = item;

    return (
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: 15,
          padding: 10,
          borderRadius: 10,
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            <Text style={{color: 'black'}}>{name}</Text>
            <Text style={{marginTop: 6, color: 'black'}}>{payment_date}</Text>
          </View>
          <Text style={{color: 'black'}}>${total}</Text>
        </View>
      </View>
    );
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
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
        source={Images.homeBackground}>
        <CustomNavbar
          title="Payments History"
          hasBack
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.data}
          style={{paddingHorizontal: 20}}
          renderItem={this._renderItem}
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
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {getPaymentHistoryRequest};

export default connect(mapStateToProps, actions)(PaymentsHistory);
