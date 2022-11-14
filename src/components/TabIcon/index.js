// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import Text from '../Text';
import {Images, Metrics, AppStyles, Colors} from '../../theme';
import Util from '../../util';

const TabIcon = ({title, focused}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
    }}>
    <Image
      resizeMode="contain"
      style={[
        {
          width: Metrics.icon.normal,
          height: Metrics.icon.small,
          marginBottom: 5,
          tintColor: Colors.white,
        },
      ]}
      source={
        title === 'Growth'
          ? Images.familysupport
          : title === 'Groups'
          ? Images.familysupport
          : title === 'Prayer Group'
          ? Images.familysupport
          : Images.TabIcons[title]
      }
    />
    <Text
      size="xxxSmall"
      style={[AppStyles.mTop5, {alignSelf: 'center'}]}
      color="white">
      {Util.capitalizeFirstLetter(title)}
    </Text>
  </View>
);

TabIcon.propTypes = {
  title: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabIcon;
