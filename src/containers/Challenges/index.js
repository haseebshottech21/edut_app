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
  Loader,
} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {challengeMessage} from '../../constants';
import MyChallenge from '../MyChallenge';

import {userChallengeRequest} from '../../actions/ChallengeActions';
import Util from '../../util';
class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedTab: 1,
      loading: false,
      data: [],
    };
  }

  static propTypes = {};

  static defaultProps = {};
  listView({item, index, navigation}) {
    return <ListItem item={item} navigation={this.props.navigation} />;
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }
  fetchData = () => {
    Util.showLoader(this);
    const payload = {
      type: 'available',
    };
    if (this.state.selectedTab == 1) {
      this.props.userChallengeRequest(payload, res => {
        if (res) {
          Util.hideLoader(this);
          this.setState({data: res});
        } else {
          Util.hideLoader(this);
        }
      });
    }
  };
  onFocusFunction = () => {
    const {params} = this.props.route;
    if (params) {
      this.setState({selectedTab: 2});
    } else {
      this.setState({selectedTab: 1}, () => {
        this.fetchData();
      });
    }
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
            Available Challenge
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
            My Challenge
          </Text>
        </ButtonView>
      </View>
    );
  }
  renderModal() {
    const {currentLanguage, screenText} = this.props;

    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({modal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <Text
            textAlign="center"
            size="large"
            color="blue"
            type="bold"
            style={{marginVertical: Metrics.baseMargin}}>
            Note
          </Text>
          <Text
            textAlign="center"
            size="xSmall"
            type="medium"
            style={{
              letterSpacing: 1,

              marginBottom: Metrics.baseMargin,
              marginHorizontal: Metrics.doubleBaseMargin,
            }}
            color="black">
            {challengeMessage}
          </Text>

          <ButtonView
            style={{
              marginBottom: 20,
              alignItems: 'center',

              backgroundColor: Colors.blue,

              paddingVertical: 10,
              borderRadius: 20,
              width: 150,
              alignSelf: 'center',
            }}>
            <Text
              color="white"
              size="small"
              type="bold"
              onPress={() => this.setState({modal: false})}>
              Done
            </Text>
          </ButtonView>
        </View>
      </Modal>
    );
  }
  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={AppStyles.alignItemsCenter}>
        <Text color="black">No Data found</Text>
      </View>
    );
  };
  render() {
    const {selectedTab, loading} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="30 Days Challenge"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
        />
        {this.renderTabBar()}
        {selectedTab == 1 ? (
          <FlatList
            contentContainerStyle={{marginVertical: 20, paddingBottom: 40}}
            data={this.state.data}
            renderItem={(item, index) =>
              this.listView(item, index, this.props.navigation)
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
            extraData={this.state}
            ListEmptyComponent={this.renderEmpty}
          />
        ) : (
          <MyChallenge navigation={this.props.navigation} />
        )}
        {/*this.renderModal()*/}
      </ImageBackground>
    );
  }
}
const mapStateToProps = () => ({});

const actions = {userChallengeRequest};

export default connect(mapStateToProps, actions)(Challenges);
