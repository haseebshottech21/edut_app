// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, FlatList, Image} from 'react-native';
import {Text, CustomNavbar, Button, ButtonView, Avatar} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import {connect} from 'react-redux';

class Item extends React.Component {
  static propTypes = {};

  render() {
    const {item, navigation} = this.props;
    console.log('Item', this.props);
    return (
      <ButtonView
        style={styles.itemContainer}
        onPress={() =>
          this.props.navigation.navigation.navigate('myChallengeDetail', {
            item: item,
          })
        }>
        <Text
          numberOfLines={2}
          type="Medium"
          size="xSmall"
          color="blue"
          type="bold">
          {item.title}
        </Text>
      </ButtonView>
    );
  }
}
const mapStateToProps = ({challenge}) => ({
  data: challenge.data,
});
const actions = {};

export default connect(mapStateToProps, actions)(Item);
