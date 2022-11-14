// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  City,
  State,
  PLACEHOLDER_IMAGE,
} from '../../constants';
import {Text, ButtonView, CustomNavbar, Loader, Avatar} from '../../components';
import {Images, AppStyles, Metrics, Colors} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {Picker} from '@react-native-picker/picker';
import {color} from 'react-native-reanimated';
import Swiper from '../../components/react-native-swiper';
import Item from '../TherapistTab/Item';

class Subscription extends Component {
  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };
  state = {
    errors: {},
    loading: false,
    modal: false,
    subscribeItems: [
      {
        heading: 'Get Featured',
        decription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. `,
      },
      {
        heading: 'Get Featured',
        decription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. `,
      },
    ],
  };

  ListFooterComponent() {
    return (
      <ButtonView
        style={{
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: Colors.blue,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/icons/add.png')}
          resizeMode="contain"
          style={{alignSelf: 'center', height: 40, width: 40}}
        />
      </ButtonView>
    );
  }

  renderModal = () => {
    return (
      <Swiper
        autoplayDirection
        autoplay
        autoplayTimeout={3}
        loop={false}
        paginationStyle={styles.dotContainer}
        containerStyle={AppStyles.mBottom0}
        activeDotColor={Colors.blue}
        dotColor={Colors.grey6}>
        {this.state.subscribeItems.map((value, index) => {
          console.log(value);
          return (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                marginHorizontal: Metrics.baseMargin,
                padding: Metrics.baseMargin,
              }}>
              <Text
                textAlign="center"
                size="xLarge"
                color="black"
                style={{marginVertical: 20}}>
                {value.heading}
              </Text>
              <Text
                textAlign="center"
                size="small"
                color="black"
                type="lato_regular">
                {value.decription}
              </Text>
              <Text
                textAlign="center"
                size="large"
                color="blue"
                type="bold"
                style={{textDecorationLine: 'underline', marginTop: 10}}>
                Item One
              </Text>
              <Text
                textAlign="center"
                size="large"
                color="blue"
                type="bold"
                style={{textDecorationLine: 'underline', marginVertical: 5}}>
                Item Two
              </Text>
              <Text
                textAlign="center"
                size="large"
                color="blue"
                type="bold"
                style={{textDecorationLine: 'underline'}}>
                Item Three
              </Text>
            </View>
          );
        })}
      </Swiper>
    );
  };

  _onSubmit = () => {
    const {navigation} = this.props;
    navigation.navigate('wallet');
    // if (this._validateForm()) {
    //   navigation.navigate('home');
    //   // this.name.blur();
    //   // this.email.blur();
    //   // this.address.blur();

    //   const payload = {
    //     email: this.emailValue,
    //     password: this.passwordValue,
    //     device_type: Platform.OS,
    //     // device_token: asd
    //   };
    //   Util.showLoader(this);
    //   // this.props.userSigninRequest(payload, data => {
    //   //   if (data) {
    //   //     DataHandler.loginOnApplozic(data);

    //   //     setTimeout(() => {
    //   //       Util.hideLoader(this);
    //   //       if (Util.userIsServiceProvider()) {
    //   //         Actions.reset('spdashboard');
    //   //       } else {
    //   //         Actions.reset('dashboard');
    //   //       }
    //   //     }, 1000);
    //   //   } else {
    //   //     Util.hideLoader(this);
    //   //   }
    //   // });
    // }
  };

  render() {
    const {errors, loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Subscription"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
          imageStyle={{height: 30, width: 30}}
        />
        {this.renderModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Subscription);
