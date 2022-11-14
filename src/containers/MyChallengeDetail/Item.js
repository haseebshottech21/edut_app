// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  FlatList,
  Image,
  TextInput as RNTextInput,
} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import {Switch} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {
  userChallengeStatusRequest,
  userChallengeSuccess,
} from '../../actions/ChallengeActions';

class Item extends React.Component {
  state = {postModal: false};
  static propTypes = {};
  selectListItem = (item, index) => {
    console.log(item);
    const payload = {
      type: 'task',
      // type: 'feedback',

      challenge_id: item.challeng_user_id,
      task_id: item.id,

      status: item.status == 0 ? 1 : 0,
      // feedback: 'i m feeling good',
    };
    this.props.userChallengeStatusRequest(payload, res => {
      if (res) {
        this.props.userChallengeSuccess(res);
      }
    });
  };
  renderModal = () => {
    return (
      <Modal
        isVisible={this.state.postModal}
        onBackdropPress={() => this.setState({postModal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.challengeModalStyle}>
          <View
            ßstyle={[AppStyles.pRight20, AppStyles.pLeft20, AppStyles.mTop20]}>
            <Text
              color="blue"
              type="bold"
              style={{alignSelf: 'center', paddingVertical: 10}}>
              What did you take away from this challenge?
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
              placeholder={` What did you take away from this challenge?`}
              placeholderTextColor={Colors.white2}
            />

            <ButtonView
              onPress={this._onSubmit}
              style={styles.button}
              onPress={() => this.setState({postModal: false})}>
              <Text textAlign="center" type="bold" size="normal">
                Save
              </Text>
            </ButtonView>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const {item, index} = this.props;

    return (
      <ButtonView style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={2}
            type="Medium"
            size="xSmall"
            color="blue"
            type="regular">
            {item.title}
          </Text>
          <CheckBox
            center
            containerStyle={{
              backgroundColor: 'white',
              borderColor: 'white',
            }}
            title="Mark as Done"
            // checkedIcon={
            //   <Image
            //     source={require('../../assets/icons/Checkon.png')}
            //     style={{height: 20, width: 20}}
            //   />
            // }
            uncheckedIcon={
              <Image
                source={require('../../assets/icons/checkoff.png')}
                style={{height: 20, width: 20}}
              />
            }
            checked={item.status == 0 ? false : true}
            onPress={() => this.selectListItem(item, index)}
            // onPress={() => this.props.onSelectServiceType(item)}
          />
        </View>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xSmall"
          type="medium"
          color="black"
          // style={AppStyles.mTop10}
        >
          {item.desciption}
        </Text>
        {this.renderModal()}
      </ButtonView>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {userChallengeStatusRequest, userChallengeSuccess};

export default connect(mapStateToProps, actions)(Item);
