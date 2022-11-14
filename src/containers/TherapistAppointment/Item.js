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
        <Avatar style={{height: 50, width: 50}} image={item.image} />
        <Text
          numberOfLines={2}
          type="bold"
          size="xSmall"
          color="blue"
          style={AppStyles.mTop10}
          textAlign="center">
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xxxSmall"
          type="medium"
          color="black"
          style={AppStyles.mTop10}
          textAlign="center">
          Schedule On {item.booking_date}
          {'\n'}
          {item.start_time}
        </Text>

        <ButtonView
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: Colors.blue,
            paddingVertical: 10,
            borderRadius: 20,
            width: 150,
            marginTop: 10,
          }}
          onPress={() => this.props.btnPress(item)}>
          <Text color="white" size="xSmall" type="bold">
            Start Session
          </Text>
        </ButtonView>
      </ButtonView>
    );
  }
}
