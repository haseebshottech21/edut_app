// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import {Text, Image, CustomNavbar, TabBar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {ChallengeDetailList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {MyChallengeDetailList} from '../../constants';
import {connect} from 'react-redux';
import {userChallengeStatusRequest} from '../../actions/ChallengeActions';
import util from '../../util';
class MyChallengeDetail extends React.Component {
  state = {
    modal: false,
    feedBack: '',
  };
  static propTypes = {};

  static defaultProps = {};
  listView({item, index}) {
    return <ListItem item={item} index={index} />;
  }
  renderHeader = () => {
    const {title} = this.props.route.params.item;
    return (
      <View style={{marginHorizontal: Metrics.baseMargin, marginTop: 20}}>
        <Text color="blue" type="bold">
          {title}
        </Text>
        <Text
          type="regular"
          size="xxSmall"
          color="black"
          style={AppStyles.marginVerticalBase}>
          We`ve desingnated one easy task per day,so you'll never feel too
          overwhelmed
        </Text>
        <Text color="blue" size="xxSmall" type="bold">
          Tasks
        </Text>
      </View>
    );
  };
  isCheckAllAnswer(el, index, arr) {
    if (index === 0) {
      return true;
    } else {
      return el.status === arr[index - 1].status && arr[index - 1].status == 1;
    }
  }
  sentFeedBack = () => {
    const {my_challenge_id} = this.props.route.params.item;

    if (this.state.feedBack == '') {
      util.topAlertError('FeedBack is REquired');
    } else {
      const payload = {
        // type: 'task',
        type: 'feedback',
        challenge_id: my_challenge_id,
        feedback: this.state.feedBack,
      };
      this.props.userChallengeStatusRequest(payload, res => {
        if (res) {
          this.setState({modal: false});
          util.topAlert('Feed back sent successfully');
        }
      });
    }
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
            Feed Back
          </Text>
          <RNTextInput
            style={{
              marginVertical: 10,
              padding: 10,
              backgroundColor: Colors.white,
              width: Metrics.screenWidth - 100,
              height: Metrics.screenHeight * 0.15,
              borderRadius: 10,
              color: 'black',
              textAlignVertical: 'top',
              alignSelf: 'center',
              borderColor: 'gray',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            multiline
            placeholderTextColor={Colors.white2}
            onChangeText={value => this.setState({feedBack: value})}
          />
          <ButtonView
            style={{
              marginBottom: 20,
              alignItems: 'center',

              backgroundColor: Colors.blue,

              paddingVertical: 10,
              borderRadius: 20,
              width: 150,
              alignSelf: 'center',
            }}
            onPress={this.sentFeedBack}>
            <Text color="white" size="small" type="bold">
              Done
            </Text>
          </ButtonView>
        </View>
      </Modal>
    );
  }
  render() {
    const {my_challenge_id} = this.props.route.params.item;
    const {data} = this.props;
    const Index = _.findIndex(data, o => o.my_challenge_id === my_challenge_id);
    console.log(Index);
    let taskData = data[Index].tasks;
    let result = data[Index].tasks.every(this.isCheckAllAnswer);
    console.log(result, 'checllll');

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="30 Days Challenge"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {this.renderHeader()}
        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          data={taskData}
          renderItem={this.listView}
          // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            result == true && (
              <TouchableOpacity
                onPress={() => this.setState({modal: !this.state.modal})}
                style={{
                  marginVertical: 20,
                }}>
                <Text
                  color="blue"
                  size="xxSmall"
                  type="bold"
                  style={{alignSelf: 'center'}}>
                  What did you take away from this challenge?
                </Text>
              </TouchableOpacity>
            )
          }
        />
        {this.renderModal()}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({challenge}) => ({
  data: challenge.data,
});
const actions = {userChallengeStatusRequest};

export default connect(mapStateToProps, actions)(MyChallengeDetail);
