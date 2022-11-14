import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getOptions} from './navigationOptions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, ImageBackground} from 'react-native';

import {TabIcon} from '../components';
import styles from './styles';
import {
  TherapistTab,
  UserHome,
  TherapistProfile,
  TherapistEditProfile,
  Following,
  Payments,
  About,
  Gallery,
  GroupTab,
  CreateGroup,
  Documents,
} from '../containers';
import {Colors, Images} from '../theme';
import Peoples from '../containers/Peoples';
import BookSession from '../containers/BookSession';
import HomeTab from '../containers/HomeTab';
import Community from '../containers/Community';

const HomeTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TherapistTabStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        // initialRouteName="therapistTab"
        initialRouteName="therapistTab">
        <Stack.Screen
          name="therapistTab"
          component={TherapistTab}
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
        <Stack.Screen
          name="therapistProfile"
          component={TherapistProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="therapistEditProfile"
          component={TherapistEditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="paymentsTherapist"
          component={Payments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="gallery"
          component={Gallery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="following"
          component={Following}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="about"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="documentsList"
          component={Documents}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const CommunityStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
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
const UserProfileStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="UserHome">
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const PrayersGroupStack = () => {
  return (
    <ImageBackground
      source={Images.Background}
      style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
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

const HomeTabNavigator = props => {
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
      initialRouteName={'Home'}
      // initialRouteName={'therapist'}
    >
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Home" />;
          },
          headerShown: false,
        }}
        name="HomeStackNavigator"
        component={HomeTab}
      />

      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Growth" />;
          },
          headerShown: false,
        }}
        name="community"
        component={CommunityStack}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Therapist" />;
          },
          headerShown: false,
        }}
        name="therapist"
        component={TherapistTabStack}
        // component={TherapistTab}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: params => {
            return <TabIcon params={params} title="Groups" />;
          },
          headerShown: false,
        }}
        name="testinomail"
        component={PrayersGroupStack}
      />
    </HomeTabs.Navigator>
  );
};
export default HomeTabNavigator;
