// @flow
import { connect } from 'react-redux';
import React from 'react';
import { View, ImageBackground, FlatList, RefreshControl } from 'react-native';
import { Text, CustomNavbar } from '../../components';
import styles from './styles';
import { Images, AppStyles } from '../../theme';
import ListItem from './Item';
import { getNotificationsRequest } from '../../actions/AppInfoActions';
import util from '../../util';

class Notification extends React.Component {
  static propTypes = {};
  state = {
    loading: false,
  };
  static defaultProps = {};
  listView({ item, index }) {
    return <ListItem item={item} />;
  }

  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={AppStyles.alignItemsCenter}>
        <Text color="black">No Notifications found</Text>
      </View>
    );
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchData = () => {
    util.showLoader(this);
    this.props.getNotificationsRequest({}, res => {
      if (res) {
        util.hideLoader(this);
        console.log('res', res)
        this.setState({ data: res });
      }
      util.hideLoader(this);
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Notification"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          contentContainerStyle={{ marginVertical: 20, paddingBottom: 40 }}
          data={this.state.data}
          renderItem={this.listView}
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

const actions = { getNotificationsRequest };

export default connect(mapStateToProps, actions)(Notification);
