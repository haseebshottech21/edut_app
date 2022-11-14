// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import Modal from 'react-native-modal';
import {challengeMessage} from '../../constants';
import {set} from 'lodash';

export default class Item extends React.Component {
  static propTypes = {};
  state = {modal: false};
  renderModal = (props, item) => {
    const {navigation} = this.props;
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
            }}
            onPress={() =>
              this.setState({modal: false}, () => {
                setTimeout(() => {
                  this.props.navigation.navigate('challengeDetail', {
                    item: item,
                  });
                }, 300);
              })
            }>
            <Text color="white" size="small" type="bold">
              Done
            </Text>
          </ButtonView>
        </View>
      </Modal>
    );
  };
  render() {
    const {item, navigation} = this.props;

    return (
      <ButtonView
        style={styles.itemContainer}
        //  onPress={() => this.props.navigation.navigate('challengeDetail')}
        onPress={() => this.setState({modal: true})}>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xSmall"
          color="blue"
          type="bold">
          {item.title}
        </Text>
        {this.renderModal(this.props, item)}
      </ButtonView>
    );
  }
}
