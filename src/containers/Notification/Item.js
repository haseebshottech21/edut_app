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
      <View style={styles.itemContainer}>
        <Text numberOfLines={2} type="Medium" size="xSmall" color="black">
          {item.description}
        </Text>
        <View
          style={[
            AppStyles.flexRow,
            {justifyContent: 'space-between', marginTop: 10},
          ]}>
          <Text color="blue" size="xxSmall">
            {item.noti_date}
          </Text>
          <Text color="blue" size="xxSmall">
            {item.noti_time}
          </Text>
        </View>
      </View>
    );
  }
}
