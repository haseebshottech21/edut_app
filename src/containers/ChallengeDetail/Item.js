// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';

export default class Item extends React.Component {
  static propTypes = {};

  render() {
    const {item, index} = this.props;

    return (
      <ButtonView style={styles.itemContainer}>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xSmall"
          color="blue"
          type="regular">
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xSmall"
          type="medium"
          color="black"
          style={AppStyles.mTop10}>
          {item.description}
        </Text>
      </ButtonView>
    );
  }
}
