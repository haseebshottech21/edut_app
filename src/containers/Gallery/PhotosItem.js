// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import Modal from 'react-native-modal';
import {challengeMessage, PLACEHOLDER_IMAGE} from '../../constants';
import {set} from 'lodash';

export default class Item extends React.Component {
  static propTypes = {};
  state = {modal: false};

  render() {
    const {item, navigation} = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.media}}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            //   backgroundColor: 'red',
            width: Metrics.screenWidth / 2 - 20,
            height: 100,
            marginRight: 5,
            marginLeft: 5,
            marginVertical: 10,
            borderColor: Colors.blue,
            borderWidth: 1,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }
}
