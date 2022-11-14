// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import util from '../../util';

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
          Schedule On {item.booking_date} {'\n'} {item.start_time}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ButtonView
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: Colors.blue,
              paddingVertical: 10,
              borderRadius: 20,
              width: 100,
              marginTop: 10,
              marginRight: 5,
            }}
            onPress={() => {
              if (item.is_live == 'yes') {
                this.props.navigation.navigate('videoSession', {
                  item: {channel: item.channel, token: item.user_token},
                  type: 'user',
                  uuid: item.user_id,
                });
              } else {
                util.topAlertError('Session Not started Yet');
              }
            }}>
            <Text color="white" size="xxSmall" type="bold">
              Join Session
            </Text>
          </ButtonView>
          <ButtonView
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: Colors.blue,
              paddingVertical: 10,
              borderRadius: 20,
              width: 100,
              marginTop: 10,
              marginLeft: 5,
            }}
            onPress={() =>
              this.props.navigation.navigate('BookSession', {
                name: item.name,
                image: item.image,
                hoursRate: item.hourly_rate,
                disable: true,
                date: item.booking_date,
                Selectedtime: item.start_time,
                no_hours: item.no_hours,
                booking_id: item.id,
                therapist_id: item.therapist_id,
              })
            }>
            <Text color="white" size="xxSmall" type="bold">
              Reschedule
            </Text>
          </ButtonView>
        </View>
      </ButtonView>
    );
  }
}
