// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  FlatList,
  TextInput as RNTextInput,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TabBar,
  ButtonView,
  TextInput,
} from '../../components';
import {connect} from 'react-redux';

import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {ChallengeDetailList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {challengeMessage} from '../../constants';
import _ from 'lodash';
import util from '../../util';
import {userTakeChallengeRequest} from '../../actions/ChallengeActions';

class ChallengeDetail extends React.Component {
  state = {
    modal: false,
    question1: '',
    question2: '',
  };

  static propTypes = {};

  static defaultProps = {};
  listView({item, index}) {
    return <ListItem item={item} index={index} />;
  }
  renderHeader = () => {
    const {title} = this.props.route.params.item;

    return (
      <View style={{marginHorizontal: Metrics.baseMargin}}>
        <ButtonView
          style={{
            backgroundColor: Colors.blue,
            alignSelf: 'flex-end',
            borderRadius: 20,
            margin: 10,
            padding: 5,
            paddingVertical: 12,
          }}
          onPress={
            () => this.setState({modal: true})
            // this.props.navigation.navigate('challenge', {selectedTab: 2})
          }>
          <Text
            color="white"
            type="bold"
            size="xxSmall"
            style={{marginHorizontal: 10}}>
            Take this Challenge
          </Text>
        </ButtonView>
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
  startChallenge = () => {
    const {question1, question2} = this.state;
    if (question1 == '' || question2 == '') {
      util.topAlertError('Please Answer All Questions');
    } else {
      const payload = {
        therapist_challenge_id: this.props.route.params.item.id,
        data: question1 + ',' + question2,
      };
      this.props.userTakeChallengeRequest(payload, res => {
        if (res) {
          this.setState({modal: false}, () => {
            setTimeout(() => {
              this.props.navigation.navigate('challenge', {
                selectedTab: 2,
              });
            }, 500);
          });
        }
      });
      //
    }
  };
  renderModal = () => {
    const {title} = this.props.route.params.item;
    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({modal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <View
            style={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
            <Text
              color="blue"
              type="bold"
              textAlign="center"
              style={{marginVertical: 10}}>
              {title}
            </Text>
            <Text color="black" size="xxSmall" style={AppStyles.mTop10}>
              Why are You taking this Challenge?
            </Text>
            <RNTextInput
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: Colors.white,
                width: Metrics.screenWidth - 100,
                // height: Metrics.screenHeight * 0.15,
                borderRadius: 20,
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
              placeholderTextColor={Colors.white2}
              onChangeText={value => this.setState({question1: value})}
            />
            <Text color="black" size="xxSmall" style={AppStyles.mTop10}>
              What do you hope to get out of this challenge?
            </Text>
            <RNTextInput
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: Colors.white,
                width: Metrics.screenWidth - 100,
                // height: Metrics.screenHeight * 0.15,
                borderRadius: 20,
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
              placeholderTextColor={Colors.white2}
              onChangeText={value => this.setState({question2: value})}
            />

            <ButtonView
              onPress={this._onSubmit}
              style={styles.button}
              onPress={this.startChallenge}>
              <Text
                textAlign="center"
                size="normal"
                style={AppStyles.marginHorizontalsmall}>
                Start Challenge
              </Text>
            </ButtonView>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {tasks} = this.props.route.params.item;
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
          data={tasks}
          renderItem={this.listView}
          // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
          showsVerticalScrollIndicator={false}
        />
        {this.renderModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {userTakeChallengeRequest};

export default connect(mapStateToProps, actions)(ChallengeDetail);
