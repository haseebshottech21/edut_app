// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {TextInput as RNTextInput, View, Image, Platform} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {Text, ButtonView} from '../';
import {Colors, Images} from '../../theme';
import styles from './styles';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: styles.container,
    onPress: null,
    multiline: false,
    placeholderTextColor: Colors.gray,
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      rightImage,
      leftImage,
      placeholderTextColor,
      leftImageStyle,
      Style,
      leftBnPress,
      ...rest
    } = this.props;
    return (
      <View>
        <View
          style={
            Platform.OS == 'ios'
              ? [styles.input, Style, {flexDirection: 'row'}]
              : [styles.androidInput, Style, {flexDirection: 'row'}]
          }>
          {rightImage && (
            <Image
              source={rightImage}
              style={styles.buttonOverlay}
              resizeMode="contain"
            />
          )}

          <View style={{flex: 1}}>
            <RNTextInput
              ref={ref => {
                this.myRef = ref;
              }}
              blurOnSubmit={false}
              selectionColor={Colors.blue}
              multiline={multiline}
              placeholder={label}
              placeholderTextColor={placeholderTextColor}
              {...rest}
              style={{
                color: 'black',
              }}
            />
            {!_.isNull(onPress) && (
              <ButtonView onPress={onPress} style={styles.buttonOverlay}>
                <Image source={Images.pass_input} style={styles.arrowIcon} />
              </ButtonView>
            )}
          </View>
          {leftImage && (
            <ButtonView
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignSelf: 'center',
              }}
              onPress={leftBnPress}>
              <Image
                source={leftImage}
                style={[
                  {
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    marginRight: 10,
                  },
                  leftImageStyle,
                ]}
                resizeMode="contain"
              />
            </ButtonView>
          )}
        </View>
        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text type="medium" size="small" color="red">
            {error}
          </Text>
        )}
      </View>
    );
  }
}
