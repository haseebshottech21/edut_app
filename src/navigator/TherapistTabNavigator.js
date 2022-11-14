import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { getOptions } from './navigationOptions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ImageBackground } from 'react-native';

import { TabIcon } from '../components';
import styles from './styles';
import {
  Notification,
  Challenges,
  ChallengeDetail,
  Hotlines,
  Empty,
  TherapistTab,
  UserHome,
  CommunityTab,
  UserProfile,
  TherapistProfile,
  TherapistEditProfile,
  Following,
  FamilySupport,
  CreateFamilySupport,
  Appointments,
  About,
  TherapistAppointment,
  CommunityScreen2,
  GroupTab,
  CreateGroup,
  Chat,
} from '../containers';
import HomeTab from '../containers/HomeTab';
import { Colors, Images } from '../theme';
import TherapistProfileTab from '../containers/TherapistProfileTab';
import Documents from '../containers/Documents';
import Community from '../containers/Community';

const HomeTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const TherapistTabStack = () => {
//   return (
//     <ImageBackground
//       source={Images.Background}
//       style={{flex: 1, backgroundColor: 'transparent'}}>
//       <Stack.Navigator
//         screenOptions={{
//           contentStyle: {backgroundColor: 'transparent'},
//           animation: 'simple_push',
//         }}
//         initialRouteName="therapistTab">
//         <Stack.Screen
//           name="therapistTab"
//           component={TherapistTab}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="therapistProfile"
//           component={TherapistProfile}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="therapistEditProfile"
//           component={TherapistEditProfile}
//           options={{
//             headerShown: false,
//           }}
//         />
//         {/*<Stack.Screen
//           name="payments"
//           component={Payments}
//           options={{headerShown: false}}
//         />*/}
//       </Stack.Navigator>
//     </ImageBackground>
//   );
// };
// const UserHomeStack = () => {
//   return (
//     <ImageBackground
//       source={Images.Background}
//       style={{flex: 1, backgroundColor: 'transparent'}}>
//       <Stack.Navigator
//         screenOptions={{
//           contentStyle: {backgroundColor: 'transparent'},
//           animation: 'simple_push',
//         }}
//         initialRouteName="UserHome">
//         <Stack.Screen
//           name="UserHome"
//           component={UserHome}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </ImageBackground>
//   );
// };
// const UserProfileStack = () => {
//   return (
//     <ImageBackground
//       source={Images.Background}
//       style={{flex: 1, backgroundColor: 'transparent'}}>
//       <Stack.Navigator
//         screenOptions={{
//           contentStyle: {backgroundColor: 'transparent'},
//           animation: 'simple_push',
//         }}
//         initialRouteName="UserHome">
//         <Stack.Screen
//           name="profile"
//           component={UserProfile}
//           options={{
//             headerShown: false,
//           }}
//         />

//         <Stack.Screen
//           name="following"
//           component={Following}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </ImageBackground>
//   );
// };

const PrayersGroupStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'simple_push',
        }}
        initialRouteName="Testinomial">
        <Stack.Screen
          name="Testinomial"
          component={GroupTab}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateGroup"
          component={CreateGroup}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const CommunityStack = () => {
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
          name="UserHome"
          component={Community}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const TherapistTabNavigator = props => {
  return (
    <HomeTabs.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.blue,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarShowLabel: false,
      }}
      // tabBarOptions={{
      //   style: styles.tabStyle,
      //   tabStyle: styles.homeTab,
      //   iconStyle: styles.tabIcon,
      //   showIcon: true,
      //   // activeTintColor: theme.colors.fontWhite,
      //   // inactiveTintColor: theme.colors.fontWhite,
      //   showLabel: false,
      // }}
      initialRouteName={'Home'}>
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Home" />;
          },
          headerShown: false,
        }}
        name="HomeStackNavigator"
        component={HomeTab}
      //  component={CommunityTab}
      />

      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Community" />;
          },
          headerShown: false,
        }}
        name="community"
        component={CommunityStack}

      // component={UserHomeStack}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Appointments" />;
          },
          headerShown: false,
        }}
        name="therapist"
        component={TherapistAppointment}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Prayer Group" />;
          },
          headerShown: false,
        }}
        name="Profile"
        component={PrayersGroupStack}
      />
    </HomeTabs.Navigator>
  );
};
export default TherapistTabNavigator;
