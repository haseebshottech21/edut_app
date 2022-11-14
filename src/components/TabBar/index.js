// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from '../';
import styles from './styles';
import {Colors} from '../../theme';

export default class TabBar extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: Colors.blue}}>
          <Text>Available Challenge</Text>
        </View>

        <View>
          <Text>My Challnege</Text>
        </View>
      </View>
    );
  }
}
