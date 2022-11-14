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
      <ButtonView
        style={styles.itemContainer}
        onPress={() =>
          this.props.navigation.navigate('therapistProfile', {
            user_id: item.id,
          })
        }>
        <View style={[AppStyles.flexRow, {alignItems: 'center'}]}>
          <Avatar image={item.image} style={{height: 45, width: 45}} />
          <Text
            numberOfLines={2}
            type="Medium"
            size="xSmall"
            color="blue"
            type="bold"
            style={[AppStyles.mLeftBase, {width: Metrics.screenWidth * 0.32}]}>
            {item.name}
          </Text>
        </View>
        <View>
          <ButtonView
            style={{
              alignItems: 'center',
              backgroundColor: Colors.blue,
              paddingVertical: 10,
              borderRadius: 20,
              width: 100,
            }}
            // onPress={() =>

            //   // this.props.navigation.navigate('BookSession', {
            //   //   name: item.name,
            //   //   image: item.image,
            //   //   id: item.id,
            //   //   hoursRate: item.hourly_rate,
            //   // })
            // }
            onPress={() =>
              this.props.navigation.navigate('therapistProfile', {
                user_id: item.id,
              })
            }>
            <Text
              color="white"
              size="xxxSmall"
              type="bold"
              // onPress={() => this.setState({modal: false})}
            >
              Book A Session
            </Text>
          </ButtonView>
        </View>
      </ButtonView>
    );
  }
}
