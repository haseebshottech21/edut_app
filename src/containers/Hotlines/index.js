// @flow
import {connect} from 'react-redux';

import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList, RefreshControl} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {HelpLines} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {challengeMessage} from '../../constants';
import {getHotlinesRequest} from '../../actions/AppInfoActions';
import util from '../../util';

class Hotlines extends React.Component {
  state = {
    modal: true,
    loading: false,
    data: [],
  };
  static propTypes = {};

  static defaultProps = {};
  listView = ({item, index}) => {
    return <ListItem item={item} />;
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }

  fetchData = () => {
    util.showLoader(this);

    this.props.getHotlinesRequest(res => {
      if (res) {
        util.hideLoader(this);

        this.setState({
          data: res,
        });
      }
      util.hideLoader(this);
    });
  };
  renderHeader = () => {
    return (
      <View style={{marginHorizontal: Metrics.baseMargin}}>
        <Text color="blue" size="normal" type="bold">
          Hotlines
        </Text>
        <Text
          type="regular"
          size="xxSmall"
          color="black"
          style={AppStyles.mTop10}>
          You are not alone Help is availabe
        </Text>
      </View>
    );
  };
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.centerInner, {marginTop: 20}]}>
        <Text color="black">No found</Text>
      </View>
    );
  };
  render() {
    const {loading} = this.state;
    console.log(this.state.data);
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="HotLines"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        {this.renderHeader()}
        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          //  data={HelpLines}
          data={this.state.data}
          renderItem={this.listView}
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
          extraData={this.state}
          ListEmptyComponent={this.renderEmpty}
        />
      </ImageBackground>
    );
  }
}
const mapStateToProps = () => ({});

const actions = {getHotlinesRequest};

export default connect(mapStateToProps, actions)(Hotlines);
