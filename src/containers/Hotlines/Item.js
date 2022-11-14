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
    const {item} = this.props;

    return (
      <ButtonView style={styles.itemContainer}>
        <View
          style={
            ([AppStyles.flex7],
            {alignItems: 'center', justifyContent: 'center', marginLeft: 10})
          }>
          <Text
            numberOfLines={2}
            type="Medium"
            size="xSmall"
            color="blue"
            type="bold"
            alignSelf="center">
            {item.title}
          </Text>
        </View>
        <View
          style={
            ([AppStyles.flex3],
            {
              backgroundColor: Colors.blue,
              padding: Metrics.baseMargin,
              overflow: 'hidden',
              borderTopRightRadius: 5,
              borderBottomEndRadius: 5,
            })
          }>
          <Text
            style={{
              marginHorizontal: 10,
              alignSelf: 'flex-end',
            }}
            color="white"
            size="xSmall">
            {item.number}
          </Text>
        </View>
      </ButtonView>
    );
  }
}
