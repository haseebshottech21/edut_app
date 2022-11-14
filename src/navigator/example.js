import React, {Component} from 'react';
import DrawerCustom from './components/Drawer';

//Navigations here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Screens
import {
  Login,
  ForgetPassword,
  Signup,
  Verification,
  CompleteProfile,
  Home,
  TermsConditions,
  PrivacyPolicy,
  ChangePassword,
  Forum,
  ForumDetails,
  DashboardDetails,
  GoalDetails,
  Goals,
  NewPassword,
} from './containers';
import {NavService} from './config';
import {ImageBackground} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
// import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const ForumStack = () => {
  return (
    <ImageBackground source={require('./assets/appBG.png')} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="Forum">
        <Stack.Screen
          name="Forum"
          component={Forum}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForumDetails"
          component={ForumDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const HomeStack = () => {
  return (
    <ImageBackground source={require('./assets/appBG.png')} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashboardDetails"
          component={DashboardDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const GoalsStack = () => {
  return (
    <ImageBackground source={require('./assets/appBG.png')} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="Goals">
        <Stack.Screen
          name="Goals"
          component={Goals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const AppStack = () => {
  return (
    <ImageBackground source={require('./assets/appBG.png')} style={{flex: 1}}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#000',
            width: 240,
          },
        }}
        initialRouteName="Home"
        drawerContent={props => <DrawerCustom {...props} />}>
        <Stack.Screen
          name="Home"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsConditionsApp"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicyApp"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forum"
          component={ForumStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={CompleteProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Goals"
          component={GoalsStack}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </ImageBackground>
  );
};
const AuthStack = () => {
  return (
    <ImageBackground source={require('./assets/bg.png')} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsConditionsAuth"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicyAuth"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

class Navigation extends Component {
  state = {
    ready: false,
    // ready: true,
    initialRouteName: 'Auth',
  };
  componentDidMount() {
    setTimeout(() => {
      const {user} = this.props;
      if (user) {
        this.setState({initialRouteName: 'AppStack'});
      }
      this.setState({ready: true});
    }, 2000);
  }
  render() {
    const {initialRouteName, ready} = this.state;
    if (!ready) return null;
    return (
      <ImageBackground source={require('./assets/bg.png')} style={{flex: 1}}>
        <NavigationContainer
          ref={ref => NavService.setTopLevelNavigator(ref)}
          screenOptions={{animation: 'simple_push'}}>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {backgroundColor: 'transparent'},
              animation: 'simple_push',
            }}
            initialRouteName={initialRouteName}>
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    );
  }
}
function mapStateToProps({reducer: {user}}) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navigation);
// export default Navigation;
