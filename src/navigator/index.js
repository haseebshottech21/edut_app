import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';
import React, { Component, PureComponent } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import { storeSocketRef } from '../actions/UserActions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import BookSession from '../containers/BookSession';

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
  Profile,
  PastRides,
  Privacy,
  TermsAndCondition,
  Wallet,
  AddCard,
  PeBookingDetails,
  ConfirmRide,
  UserHome,
  CompletedTrips,
  DriverBookings,
  DriverHome,
  Notification,
  Challenges,
  ChallengeDetail,
  Hotlines,
  MyChallengeDetail,
  Appointments,
  Payments,
  PaymentsHistory,
  PaymentsHistoryTharapist,
  FeedBack,
  FamilySupport,
  CreateFamilySupport,
  Gallery,
  Journal,
  JournalDetail,
  AddJournal,
  TherapistProfile,
  Following,
  TherapistEditProfile,
  About,
  TherapistAppointment,
  Subscription,
  UserProfile,
  AboutEdut,
  CommunityScreen2,
  Comments,
  TherapistProfileTab,
  Documents,
  UpdateUserProfile,
  updateTherapistProfile2,
  UpdateTherapistProfile1,
  VideoSession,
  Chat,
  ChatList,
  ChatMessages,
} from '../containers';

import { DrawerComponent } from '../components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Images, Metrics, Colors } from '../theme';
import HomeTabNavigator from './HomeTabNavigator';
import TherapistTabNavigator from './TherapistTabNavigator';
import DataHandler from '../services/DataHandler';

import AuthStack from './AuthStack';
import Peoples from '../containers/Peoples';
import PeoplesProfile from '../containers/PeoplesProfile';
//import ProfileFamilySupport from '../containers/Testimony';
import _ from 'lodash';
import Testimony from '../containers/Testimony';
import { socket } from '../config/WebService';
//import CustomSidebarMenu from '../containers/Drawer/index';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function UserChallengeStack() {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator initialRouteName="challenge">
        <Stack.Screen
          name="challenge"
          component={Challenges}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="challengeDetail"
          component={ChallengeDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="myChallengeDetail"
          component={MyChallengeDetail}
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
}
function UserJournalStack() {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator initialRouteName="journal">
        <Stack.Screen
          name="journal"
          component={Journal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="journalDetail"
          component={JournalDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addJournal"
          component={AddJournal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
}
function UserFamilyStack() {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator initialRouteName="familySupport">
        <Stack.Screen
          name="familySupport"
          component={CommunityScreen2}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="familySupport2"
          component={FamilySupport}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="createfamilySupport"
          component={CreateFamilySupport}
          options={{
            headerShown: false,
          }}
        />*/}
      </Stack.Navigator>
    </ImageBackground>
  );
}
function PeopleProfileStack() {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator initialRouteName="peoples">
        <Stack.Screen
          name="peoples"
          component={Peoples}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="peoplesProfile"
          component={PeoplesProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="peoplesFollowing"
          component={Following}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="peoplesGallery"
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
        {/* <Stack.Screen
          name="peoplesFamilySupport"
          component={FamilySupport}
          options={{
            headerShown: false,
          }}
        />*/}
      </Stack.Navigator>
    </ImageBackground>
  );
}
const UserProfileStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'simple_push',
        }}
        initialRouteName="UserHome">
        <Stack.Screen
          name="profile"
          component={UserProfile}
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
          name="peoplesFollowing"
          component={Following}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="peoplesGallery"
          component={Gallery}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="updateUserProfile"
          component={UpdateUserProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const appointmentStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'simple_push',
        }}
        initialRouteName="appointments">
        <Stack.Screen
          name="appointments"
          component={Appointments}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookSession"
          component={BookSession}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const UserDrawerStack = ({ route, navigation }) => {
  console.log('User stote', DataHandler.getStore().getState().user.data);
  const userType = DataHandler.getStore().getState().user.data;
  console.log('navigator', userType.role);
  // const {navigation} = this.props;
  return (
    <ImageBackground
      source={Images.spBackground}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          animation: 'simple_push',
          drawerType: 'front',
          drawerStyle: {
            flex: 1,
            //  padding: Metrics.baseMargin,
            width: Metrics.screenWidth - 80,
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={props => <DrawerComponent {...props} route={route} />}>
        <Drawer.Screen
          name="home"
          // component={data == 'user' ? HomeTabNavigator : TherapistTabNavigator}
          component={
            userType.role == 'user' ? HomeTabNavigator : TherapistTabNavigator
          }
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
          // headerShown={false}
          initialParams={{ params: route.params }}
        />

        <Drawer.Screen
          name="notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="gallery"
          component={Gallery}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="journal"
          component={UserJournalStack}
          options={{
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />

        <Drawer.Screen
          name="challenge"
          component={UserChallengeStack}
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
        />
        <Drawer.Screen
          name="appointments"
          //   component={Appointments}
          component={appointmentStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="payments"
          component={Payments}
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
        />
        <Drawer.Screen
          name="paymentsHistory"
          component={PaymentsHistory}
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
        />
        <Drawer.Screen
          name="PaymentsHistoryTharapist"
          component={PaymentsHistoryTharapist}
          options={{ headerShown: false, swipeEdgeWidth: 0 }}
        />
        <Drawer.Screen
          name="feedback"
          component={FeedBack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="hotlines"
          component={Hotlines}
          options={{ headerShown: false }}
        />

        <Drawer.Screen
          name="updatePassword"
          component={UpdatePassword}
          options={{ headerShown: false }}
        />

        <Drawer.Screen
          name="privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="terms"
          component={TermsAndCondition}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="wallet"
          component={walletStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="familySupport"
          component={UserFamilyStack}
          options={{
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Drawer.Screen
          name="subscription"
          component={Subscription}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="peoples"
          component={PeopleProfileStack}
          options={{
            swipeEdgeWidth: 0,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="profile"
          component={UserProfileStack}
          options={{
            swipeEdgeWidth: 0,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="about"
          component={AboutEdut}
          options={{
            swipeEdgeWidth: 0,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="therapistProfileTab"
          component={TherapistProfileStack}
          options={{
            swipeEdgeWidth: 0,
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </ImageBackground>
  );
};
const TherapistProfileStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'simple_push',
        }}
        initialRouteName="therapistProfileTab">
        <Stack.Screen
          name="therapistProfileTab"
          // component={CommunityScreen2}
          component={TherapistProfileTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="updateTherapistProfile1"
          // component={CommunityScreen2}
          component={UpdateTherapistProfile1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="updateTherapistProfile2"
          // component={CommunityScreen2}
          component={updateTherapistProfile2}
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
          name="about"
          component={About}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="documentsList"
          component={Documents}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
function walletStack() {
  return (
    <ImageBackground
      source={Images.spBackground}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        <Stack.Screen
          name="wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addcard"
          component={AddCard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
}

function UserHomeStack() {
  return (
    <ImageBackground
      source={Images.spBackground}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={UserHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="confirmRide"
          component={ConfirmRide}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
}
// function TherapistProfileStack() {
//   return (
//     <ImageBackground
//       source={Images.spBackground}
//       style={{flex: 1, backgroundColor: 'transparent'}}>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="therapistProfile"
//           component={TherapistProfile}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="gallery"
//           component={Gallery}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="following"
//           component={Following}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="about"
//           component={About}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="paymentsTherapist"
//           component={Payments}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </ImageBackground>
//   );
// }

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      // ready: true,
      initialRouteName: 'auth',
    };
    this.socket = SocketIOClient(socket.url);
  }
  async componentDidMount() {
    await this.connectSocket();
    setTimeout(() => {
      const { data } = this.props.user;
      SplashScreen.hide();
      if (!_.isEmpty(data)) {
        this.setState({ initialRouteName: 'home' });
      }
      this.setState({ ready: true });
    }, 2000);
  }
  connectSocket = async () => {
    try {
      await this.socket.on('connect', ev => {
        console.log('this.socket', this.socket);
        this.props.storeSocketRef(this.socket);
      });
    } catch (error) {
      console.log('this.socket', error);
    }
  }
  render() {
    const { data } = this.props.user;

    console.log('renderrrrr', data);
    const { initialRouteName, ready } = this.state;
    if (!ready) return null;
    console.log('recv innavigation', this.state.initialRouteName);
    return (
      <ImageBackground
        source={Images.Background}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={this.state.initialRouteName}
            // initialRouteName={'comments'}
            screenOptions={{
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'simple_push',
            }}>
            <Stack.Screen
              name="auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="home"
              component={UserDrawerStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="videoSession"
              component={VideoSession}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="therapistProfile"
              component={TherapistProfileStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="therapistAppointments"
              component={TherapistAppointment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="comments"
              component={Comments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChatList"
              component={ChatList}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChatMessages"
              component={ChatMessages}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user,
});

const actions = { storeSocketRef };

export default connect(mapStateToProps, actions)(Routing);