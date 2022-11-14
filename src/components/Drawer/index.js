// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, FlatList, AppState} from 'react-native';
import CustomNavbar from '../../components/CustomNavbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Image, ButtonView} from '../../components';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import styles from './styles';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {selectUserType, userSignOutRequest} from '../../actions/UserActions';
import Loader from '../Loader';

const data = [];
class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    const {role} = this.props.data;
    //  const {userType} = route.params;
    const {navigation} = this.props;

    this.state = {
      loading: false,
      UserData: [
        {
          id: 1,
          name: 'Home ',
          route: () => navigation.navigate('home'),
          image: Images.home,
        },
        {
          id: 1,
          name: 'Profile ',
          route: () => navigation.navigate('profile'),
          image: Images.profile,
        },
        {
          id: 15,
          name: 'Encouragers',
          route: () => navigation.navigate('peoples'),
          image: Images.profile,
        },
        // {
        //   id: 2,
        //   name: 'Family Support Group ',
        //   route: () => navigation.navigate('familySupport'),
        //   image: Images.familysupport,
        // },

        {
          id: 3,
          name: 'Journal',
          route: () => navigation.navigate('journal'),
          image: Images.journal,
        },
        {
          id: 4,
          name: '30 Days Challenge',
          route: () => navigation.navigate('challenge'),
          image: Images.challenge,
        },
        {
          id: 5,
          name: 'My Appointments',
          route: () => navigation.navigate('appointments'),
          image: Images.appointments,
        },
        {
          id: 6,
          name: 'Payments',
          route: () => navigation.navigate('payments'),
          image: Images.payments,
        },
        {
          id: 66,
          name: 'Payments History',
          route: () => navigation.navigate('paymentsHistory'),
          image: Images.payments,
        },
        {
          id: 7,
          name: 'Hotlines',
          route: () => navigation.navigate('hotlines'),
          image: Images.call,
        },

        {
          id: 8,
          name: 'Notifications',
          route: () => navigation.navigate('notification'),
          image: Images.notification,
        },
        {
          id: 9,
          name: 'Change Password',
          route: () => navigation.navigate('updatePassword'),
          image: Images.pass_input,
        },

        // {
        //   id: 10,
        //   name: 'Invite Link',
        //   route: () => navigation.navigate('updatePassword'),
        //   image: Images.invitelink,
        // },
        {
          id: 11,
          name: 'Help & Feedback',
          route: () => navigation.navigate('feedback'),
          image: Images.feedback,
        },
        {
          id: 12,
          name: 'Privacy Policy',
          route: () => navigation.navigate('privacy', {isAuth: false}),
          image: Images.Privacy,
        },
        {
          id: 13,
          name: 'Terms & Condition',
          route: () => navigation.navigate('terms', {isAuth: false}),
          image: Images.Terms,
        },
        {
          id: 14,
          name: 'About Edut',
          route: () => navigation.navigate('about'),
          image: Images.Privacy,
        },
        {
          id: 15,
          name: 'Logout',
          image: Images.logout,
          route: () => {
            this.props.userSignOutRequest(() => {
              navigation.reset({
                routes: [{name: 'auth'}],
              });
            });
          },
        },
      ],
      TherapistData: [
        {
          id: 1,
          name: 'Home ',
          route: () => navigation.navigate('home'),
          image: Images.home,
        },
        {
          id: 120,
          name: 'Profile',
          route: () => navigation.navigate('therapistProfileTab'),
          image: Images.profile,
        },
        {
          id: 15,
          name: 'Peoples',
          route: () => navigation.navigate('peoples'),
          image: Images.profile,
        },
        // {
        //   id: 2,
        //   name: 'Support Group',
        //   route: () => navigation.navigate('familySupport'),
        //   image: Images.familysupport,
        // },

        {
          id: 3,
          name: 'Journal',
          route: () => navigation.navigate('journal'),
          image: Images.journal,
        },
        {
          id: 4,
          name: '30 Days Challenge',
          route: () => navigation.navigate('challenge'),
          image: Images.challenge,
        },

        {
          id: 6,
          name: 'Payments',
          route: () => navigation.navigate('payments'),
          image: Images.payments,
        },
        {
          id: 66,
          name: 'Payments History',
          route: () => navigation.navigate('PaymentsHistoryTharapist'),
          image: Images.payments,
        },
        {
          id: 7,
          name: 'Hotlines',
          route: () => navigation.navigate('hotlines'),
          image: Images.call,
        },
        {
          id: 7,
          name: 'Subscribe',
          route: () => navigation.navigate('subscription'),
          image: Images.subscribe,
        },

        {
          id: 8,
          name: 'Notifications',
          route: () => navigation.navigate('notification'),
          image: Images.notification,
        },
        {
          id: 9,
          name: 'Change Password',
          route: () => navigation.navigate('updatePassword'),
          image: Images.pass_input,
        },

        {
          id: 11,
          name: 'Help & Feedback',
          route: () => navigation.navigate('feedback'),
          image: Images.feedback,
        },
        {
          id: 12,
          name: 'Privacy Policy',
          route: () => navigation.navigate('privacy', {isAuth: false}),
          image: Images.Privacy,
        },
        {
          id: 13,
          name: 'Terms & Condition',
          route: () => navigation.navigate('terms', {isAuth: false}),
          image: Images.Terms,
        },
        {
          id: 14,
          name: 'About Edut',
          route: () => navigation.navigate('about'),
          image: Images.Privacy,
        },
        {
          id: 16,
          name: 'Logout',
          image: Images.logout,
          route: () => {
            this.props.userSignOutRequest(() => {
              navigation.reset({
                routes: [{name: 'auth'}],
              });
            });
          },
        },
      ],
    };
  }
  componentDidMount() {
  }
  ListHeaderComponent = () => {
    const {role} = this.props.data;
    const {navigation} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => this.props.navigation.closeDrawer()}>
          <Image
            source={Images.cancel}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={Images.logoHeader}
          style={{
            width: 100,
            height: 60,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };
  //  onPress={() => this.props.navigation.navigate('signup1')}>
  renderItem = ({item, index}) => {
    return (
      <ButtonView
        onPress={() => item.route(this)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // borderRadius: 10,
          paddingVertical: 2,
          marginVertical: 7,
          includeFontPadding: false,
        }}>
        <Image
          source={item.image}
          style={{height: 20, width: 20, marginRight: 10}}
          resizeMode="contain"
        />
        <Text
          textAlign="center"
          size="xxSmall"
          color="black"
          type="medium"
          style={{
            alignSelf: 'center',
            includeFontPadding: false,
            marginTop: 2,
          }}>
          {item.name}
        </Text>
      </ButtonView>
    );
  };
  render() {
    const {role} = this.props.data;
    const {loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.ListHeaderComponent()}
        <FlatList
          data={role == 'user' ? this.state.UserData : this.state.TherapistData}
          renderItem={this.renderItem}
          //  ListHeaderComponent={this.ListHeaderComponent}
          showsVerticalScrollIndicator={false}
        />
        <Loader loading={loading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
});
const actions = {selectUserType, userSignOutRequest};
//export default Empty
export default connect(mapStateToProps, actions)(DrawerComponent);
