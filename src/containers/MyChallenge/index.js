// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  FlatList,
  AppState,
  RefreshControl,
} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {challengeMessage} from '../../constants';
import {userChallengeRequest} from '../../actions/ChallengeActions';
import {connect} from 'react-redux';
import Util from '../../util';

class MyChallenge extends React.Component {
  state = {
    modal: true,
    selectedTab: 1,
    data: [],
    loading: false,
  };
  static propTypes = {};

  static defaultProps = {};
  listView({item, index, navigation}) {
    return <ListItem item={item} navigation={this.props} />;
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Util.showLoader(this);
    const payload = {
      type: 'mychallenge',
    };
    this.props.userChallengeRequest(payload, res => {
      if (res) {
        Util.hideLoader(this);
      } else {
        Util.hideLoader(this);
      }
    });
  };

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
  renderEmpty() {
    return (
      <View style={AppStyles.alignItemsCenter}>
        <Text color="black">No Data found</Text>
      </View>
    );
  }
  render() {
    const {loading} = this.state;
    console.log(this.props);
    const {data} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <FlatList
          contentContainerStyle={{marginVertical: 20, paddingBottom: 40}}
          data={data}
          renderItem={(item, index) => this.listView(item, index, this.props)}
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
        {/*this.renderModal()*/}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({challenge}) => ({
  data: challenge.data,
});
const actions = {userChallengeRequest};

export default connect(mapStateToProps, actions)(MyChallenge);
