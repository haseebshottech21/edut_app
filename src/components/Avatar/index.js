// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Text} from '..';
import styles from './styles';

export default class Avatar extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    style: PropTypes.object,
    imageStyle: PropTypes.object,
  };

  static defaultProps = {
    image:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    style: styles.profileContainer,
    imageStyle: styles.profileImage,
  };

  render() {
    const {image, imageStyle, style} = this.props;
    return (
      <View style={[styles.profileContainer, style]}>
        <Image
          source={{uri: image}}
          style={[styles.profileImage, imageStyle]}
          resizeMode={'cover'}
        />
      </View>
    );
  }
}
