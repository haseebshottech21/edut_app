import React from 'react';
import PropTypes from 'prop-types';
import {View, Platform, ImageBackground, Image} from 'react-native';
import {Text, CustomNavbar, ButtonView} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';

export default class UserRoles extends React.Component {
  static propTypes = {};

  static defaultProps = {};
  renderButton = () => {
    const {navigation} = this.props;
    return (
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
        }}>
        <ButtonView
          style={styles.button}
          onPress={() =>
            navigation.navigate('signup', {
              userType: 'user',
            })
          }>
          <Text textAlign="center" type="semi_bold">
            User
          </Text>
        </ButtonView>
        <ButtonView
          style={styles.button}
          onPress={() =>
            navigation.navigate('signup', {
              userType: 'Driver',
            })
          }>
          <Text textAlign="center" type="semi_bold">
            Ferry Driver
          </Text>
        </ButtonView>
      </View>
    );
  };
  render() {
    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <CustomNavbar
          title="SELECT USER"
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <Image source={Images.spLogo} style={styles.logo} />
        {this.renderButton()}
      </ImageBackground>
    );
  }
}
