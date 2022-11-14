// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from '../../components';
import styles from './styles';

export default class Empty extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}
