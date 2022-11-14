// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, CustomNavbar, ButtonView, Loader} from '../../components';
import styles from './styles';
import CompStyles from './styles';

import {Images, Colors, AppStyles, Metrics} from '../../theme';
import Modal from 'react-native-modal';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import Auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {socialSigninRequest} from '../../actions/UserActions';
import Util from '../../util';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import util from '../../util';
import messaging from '@react-native-firebase/messaging';

class PreLogin extends React.Component {
  state = {
    showAgrermentModal: false,
    isTermsAgreementAccepted: false,
    isPolicyAccepted: false,
    agreementError: false,
    policyError: false,
    loading: false,
    provider: '',
  };
  componentDidMount = () => {
    messaging()
      .getToken()
      .then(fcmToken => {
        //console.warn(“log”, fcmToken);
        if (fcmToken) {
          console.log('fcmTken', fcmToken);
          this.setState({device_token: fcmToken});
          // console.log('token', this.state.device_token);

          // user has a device token
        } else {
          // console.log('device has no token');
        }
        return fcmToken;
      });
  };
  renderButton = () => {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center', marginBottom: 50}}>
        <ButtonView
          style={styles.button}
          onPress={() =>
            this.setState({showAgrermentModal: true, provider: 'email'})
          }
          //  () => navigation.navigate('userRoles')}
        >
          <Image source={Images.email} style={styles.icon} />
          <Text
            size="small"
            type="semi_bold"
            color="black"
            textAlign="left"
            style={{alignSelf: 'center'}}>
            Login with Email
          </Text>
        </ButtonView>
        <ButtonView
          style={styles.button}
          onPress={() =>
            this.setState({showAgrermentModal: true, provider: 'google'})
          }>
          <Image source={Images.google} style={styles.icon} />
          <Text
            size="small"
            textAlign="center"
            type="semi_bold"
            color="black"
            style={{alignSelf: 'center'}}>
            Login with Google
          </Text>
        </ButtonView>
        {Platform.OS == 'ios' && (
          <ButtonView
            style={[styles.button, {backgroundColor: Colors.white}]}
            onPress={() =>
              this.setState({showAgrermentModal: true, provider: 'apple'})
            }>
            <Image source={Images.apple} style={styles.icon} />
            <Text
              size="small"
              textAlign="center"
              type="semi_bold"
              color="black"
              style={{alignSelf: 'center'}}>
              Login with Apple
            </Text>
          </ButtonView>
        )}

        <ButtonView
          style={styles.button}
          onPress={() =>
            this.setState({showAgrermentModal: true, provider: 'facebook'})
          }>
          <Image source={Images.facebook} style={styles.icon} />
          <Text
            size="small"
            textAlign="center"
            type="semi_bold"
            color="black"
            style={{alignSelf: 'center'}}>
            Login with Facebook
          </Text>
        </ButtonView>
      </View>
    );
  };
  validateAgreement() {
    const {
      isTermsAgreementAccepted,
      isPolicyAccepted,
      agreementError,
      policyError,
      provider,
    } = this.state;
    const {navigation} = this.props;

    if (!isTermsAgreementAccepted) {
      this.setState({agreementError: !agreementError});
    } else if (!isPolicyAccepted) {
      this.setState({policyError: !policyError});
    } else {
      this.setState({showAgrermentModal: false}, () => {
        if (provider == 'email') {
          console.log('provider == "email"', provider == 'email');
          this.setState({
            isTermsAgreementAccepted: false,
            isPolicyAccepted: false,
          });
          navigation.navigate('login');
        } else if (provider == 'google') {
          this.setState(
            {
              isTermsAgreementAccepted: false,
              isPolicyAccepted: false,
            },
            () => {
              this.onGoogleButtonPress();
            },
          );
        } else if (provider == 'facebook') {
          this.setState(
            {
              isTermsAgreementAccepted: false,
              isPolicyAccepted: false,
            },
            () => {
              this.loginWithFacebook();
            },
          );
        } else if (provider == 'apple') {
          this.onAppleButtonPress();
          this.setState({
            isTermsAgreementAccepted: false,
            isPolicyAccepted: false,
          });
        }
      });
    }
  }

  onModalClose() {
    this.setState({
      showAgrermentModal: false,
      isTermsAgreementAccepted: false,
      isPolicyAccepted: false,
      agreementError: false,
      policyError: false,
    });
  }
  _renderAgreementModal() {
    const {navigation} = this.props;
    const {
      showAgrermentModal,
      isTermsAgreementAccepted,
      isPolicyAccepted,
      agreementError,
      policyError,
    } = this.state;
    const TERMS = 'terms',
      POLICY = 'policy';
    return (
      <Modal
        isVisible={this.state.showAgrermentModal}
        statusBarTranslucent={false}
        backdropOpacity={0.7}
        // onBackButtonPress={() => this.onModalClose()}
        onBackdropPress={() => this.onModalClose()}>
        <View style={CompStyles.modalContainer}>
          <View style={CompStyles.modalAgreementHeader}>
            <Text color="black" type="bold" style={{marginTop: 10}}>
              AGREEMENT
            </Text>
          </View>
          <View style={CompStyles.policyContainer}>
            <Text color="black" textAlign="center" size="normal">
              I have read and agreed with
            </Text>
            <View style={CompStyles.agreementButton}>
              <TouchableOpacity
                style={CompStyles.tickBox}
                onPress={() =>
                  this.setState({
                    isTermsAgreementAccepted: !isTermsAgreementAccepted,
                    agreementError: false,
                  })
                }>
                <Image
                  source={
                    isTermsAgreementAccepted
                      ? Images.checkbox_tick
                      : Images.checkbox
                  }
                  style={CompStyles.acceptImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({showAgrermentModal: false}, () => {
                    setTimeout(() => {
                      navigation.navigate('terms', {isAuth: true});
                    }, 500);
                  })
                }>
                <Text color={'black'} textAlign="center">
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View style={CompStyles.agreementButton}>
              <TouchableOpacity
                style={CompStyles.tickBox}
                onPress={() =>
                  this.setState({
                    isPolicyAccepted: !isPolicyAccepted,
                    policyError: false,
                  })
                }>
                <Image
                  source={
                    isPolicyAccepted ? Images.checkbox_tick : Images.checkbox
                  }
                  style={CompStyles.acceptImage}
                />
              </TouchableOpacity>
              <Text
                color="black"
                onPress={() =>
                  this.setState({showAgrermentModal: false}, () => {
                    setTimeout(() => {
                      navigation.navigate('privacy', {isAuth: true});
                    }, 500);
                  })
                }>
                Privacy Policy
              </Text>
            </View>
          </View>
          {agreementError && (
            <Text style={CompStyles.modalErrorMessages} color="black">
              Please accept terms and conditions
            </Text>
          )}
          {policyError && (
            <Text style={CompStyles.modalErrorMessages}>
              Please accept privacy policy
            </Text>
          )}
          <View style={CompStyles.buttonContainer}>
            <ButtonView
              style={[CompStyles.modalButton, CompStyles.acceptButton]}
              onPress={() => this.validateAgreement()}>
              <Text color="white" type="semi_bold">
                Accept
              </Text>
            </ButtonView>
            <TouchableOpacity
              style={[CompStyles.modalButton, CompStyles.declineButton]}
              onPress={() => this.onModalClose()}>
              <Text
                // style={[CompStyles.modalButtonText, CompStyles.textBlack]}
                type="semi_bold"
                color="blue">
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const appleCredential = Auth.AppleAuthProvider.credential(
        appleAuthRequestResponse.identityToken,
        appleAuthRequestResponse.nonce,
      );

      const userAuth = await Auth().signInWithCredential(appleCredential);

      const appleToken = await userAuth.user.getIdToken();
      const data = {
        provider: 'apple',
        device_type: Platform.OS,
        device_token: this.state.device_token,
        access_token: appleToken,
      };
      try {
        Util.showLoader(this);

        console.log(userAuth.user, 'checkkkk');
        const payload = {
          access_token: appleToken,
          device_type: Platform.OS,
          device_token: this.state.device_token,

          provider: 'apple',
        };
        this.props.socialSigninRequest(payload, res => {
          if (res) {
            Util.hideLoader(this);
            if (res.profile_complete == null) {
              this.props.navigation.navigate('completeProfile', {});
            } else {
              navigation.reset({
                routes: [{name: 'home'}],
              });
            }
          }
          Util.hideLoader(this);
        });
      } catch (error) {
        //  showToast(error.message);
      }
      // user is authenticated
    } else {
      util.topAlertError('Something went wrong');
    }
  };
  onGoogleButtonPress = async () => {
    const {navigation} = this.props;
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = Auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      console.log('googleCaredeantial', googleCredential);
      const userAuth = await Auth().signInWithCredential(googleCredential);
      console.log('Auth', userAuth);

      const access_token = await (await userAuth.user.getIdToken()).toString();

      const payload = {
        provider: 'google',
        device_type: Platform.OS,
        device_token: this.state.device_token,
        access_token: access_token,
      };
      Util.showLoader(this);

      this.props.socialSigninRequest(payload, res => {
        if (res) {
          Util.hideLoader(this);
          if (res.profile_complete == null) {
            this.props.navigation.navigate('completeProfile', {
              first_name: res.first_name,
              last_name: res.last_name,
              userID: res.id,
            });
          } else {
            navigation.reset({
              routes: [{name: 'home'}],
            });
          }
        }
        Util.hideLoader(this);
      });
    } catch (error) {
      // console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //  alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //   alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        util.topAlertError('Something went wrong');
        console.log(error);
        //    showToast('someThing went Wrong');
        // alert(error.message);
      }
    }
  };
  loginWithFacebook = () => {
    const {navigation} = this.props;
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async login => {
        if (login.isCancelled) {
          // console.log('Login cancelled');
        } else {
          try {
            const fbAuth = await AccessToken.getCurrentAccessToken();
            const fbCredential = Auth.FacebookAuthProvider.credential(
              fbAuth.accessToken,
            );

            const userAuth = await Auth().signInWithCredential(fbCredential);

            const fbaccessToken = await userAuth.user.getIdToken();
            console.log(fbaccessToken, 'checkkkkk');

            const payload = {
              provider: 'facebook',
              device_type: Platform.OS,
              device_token: this.state.device_token,
              access_token: fbaccessToken,
            };
            Util.showLoader(this);

            this.props.socialSigninRequest(payload, res => {
              if (res) {
                Util.hideLoader(this);
                if (res.profile_complete == null) {
                  this.props.navigation.navigate('completeProfile', {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    userID: res.id,
                  });
                } else {
                  navigation.reset({
                    routes: [{name: 'home'}],
                  });
                }
              }
              Util.hideLoader(this);
            });
          } catch (error) {
            alert(error);
            // console.log(error);
            //showToast(error.message);
          }
        }
      },
      error => {
        alert(error);
        //  console.log('Login fail with error: ' + error);
      },
    );
  };
  render() {
    const {navigation} = this.props;
    const {loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.Background}>
        <Image source={Images.spLogo} style={styles.logo} />

        {this.renderButton()}
        {this._renderAgreementModal()}
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}
const mapStateToProps = () => ({});

const actions = {socialSigninRequest};

export default connect(mapStateToProps, actions)(PreLogin);
