// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image, Linking} from 'react-native';
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
      <ButtonView
        style={styles.itemContainer}
        onPress={() => Linking.openURL(item.file)}>
        <View style={[AppStyles.flexRow, {alignItems: 'center'}]}>
          <Image
            source={require('./../../assets/icons/pdf-file.png')}
            style={{height: 50, width: 50}}
          />
          <Text
            numberOfLines={2}
            type="Medium"
            size="xSmall"
            color="blue"
            type="bold"
            style={AppStyles.mLeftBase}>
            Documents{item.name}
          </Text>
        </View>
      </ButtonView>
    );
  }
}
