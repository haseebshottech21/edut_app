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

  render() {
    const {item, navigation} = this.props;

    return (
      <ButtonView style={styles.itemContainer} onPress={this.props.closeModal}>
        <View style={[AppStyles.flexRow, {alignItems: 'center'}]}>
          <Avatar
            image={item.image == null ? PLACEHOLDER_IMAGE : item.image}
            style={{height: 45, width: 45}}
          />
          <Text
            numberOfLines={2}
            type="Medium"
            size="xSmall"
            color="blue"
            type="bold"
            style={AppStyles.mLeftBase}>
            {item.name}
          </Text>
        </View>
      </ButtonView>
    );
  }
}
