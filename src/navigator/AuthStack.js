import {connect} from 'react-redux';

import React, {Component, PureComponent} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import {
  Login,
  Empty,
  PreLogin,
  UserRoles,
  SignUP,
  SignUP2,
  OTP,
  UpdatePassword,
  ForgotPassword,
  NewPassword,
  PastRides,
  Privacy,
  TermsAndCondition,
  Wallet,
  AddCard,
  PeBookingDetails,
  ConfirmRide,
  UserHome,
  Notification,
  Challenges,
  ChallengeDetail,
  Hotlines,
  Following,
  Testimony,
  CompleteProfile,
  EditProfile,
  UserProfile,
  Gallery,
  TherapistProfile,
  About,
  TherapistEditProfile,
  TherapistSignUp,
} from '../containers';

import {DrawerComponent} from '../components';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Images, Metrics, Colors} from '../theme';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        // initialRouteName="therapistSignUP"
        initialRouteName="preLogin">
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="editprofile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />*/}
        <Stack.Screen
          name="therapistEditProfile"
          component={TherapistEditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userprofile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="therapistSignUP"
          component={TherapistSignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="about"
          component={About}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="preLogin"
          component={PreLogin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userRoles"
          component={UserRoles}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignUP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup2"
          component={SignUP2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="otp"
          component={OTP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="updatePass"
          component={UpdatePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgotPass"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="completeProfile"
          component={CompleteProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="newPass"
          component={NewPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="following"
          component={Following}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gallery"
          component={Gallery}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="testimony"
          component={Testimony}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="terms"
          component={TermsAndCondition}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
export default AuthStack;
