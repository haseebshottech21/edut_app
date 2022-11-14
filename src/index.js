// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry,
  View,
  NativeModules,
  StatusBar,
  LogBox,
  Platform,
  Alert,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import Orientation from 'react-native-orientation-locker';
import {MessageBar} from './components';
import configureStore from './store';
import Routing from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import Util from './util';
import DataHandler from './services/DataHandler';
// import {PESDK} from 'react-native-photoeditorsdk';
// import {VESDK} from 'react-native-videoeditorsdk';

// PESDK.unlockWithLicense(require('../pesdk_license'));
// VESDK.unlockWithLicense(require('../vesdk_license'));

const reducers = require('./reducers').default;
LogBox.ignoreAllLogs(true);
applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    GoogleSignin.configure({
      webClientId:
        '584889880909-bolbgme4h2bbp0tlstn6p9ub52q7u7j0.apps.googleusercontent.com',
      iosClientId:
        '584889880909-isk4i10soe54n5vnbs0mnpo1nn35ht7c.apps.googleusercontent.com',
    });
    this.checkApplicationPermission();
    // messaging().onNotificationOpenedApp(async remoteMessage => {
    //   this.GotoRoute(remoteMessage);
    // });
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     // from Quite state
    //     this.GotoRoute(remoteMessage);
    //     // Actions.orderHistory();
    //   });
    // this.messageListener = messaging().onMessage(async remoteMessage => {
    //   Alert.alert(
    //     remoteMessage.notification.title,
    //     remoteMessage.notification.body,
    //     [{text: 'OK', onPress: () => this.GotoRoute(remoteMessage)}],
    //   );
    // });
  }
  GotoRoute = remoteMessage => {
    if (remoteMessage.data.type == 'session') {
      this.props.navigation.navigate('appointments');
    }
  };
  checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
        // alert('device registered for remote messages')
        await firebase.messaging().registerDeviceForRemoteMessages();
      }
      //firebase.messaging().registerForRemoteNotifications();
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      //alert('noti provisional')
    } else {
      // alert(' noti disabled')
    }
  };
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  }

  render() {
    // if (this.state.isLoading) {
    //   return null;
    // }
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnableAutoToolbar(true);

      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }

    return (
      <View style={AppStyles.flex}>
        <Provider store={this.state.store}>
          <Routing />
          {/* <Testing /> */}
        </Provider>
        <MessageBar />
      </View>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
