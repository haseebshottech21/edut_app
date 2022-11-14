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
  Keyboard,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PLACEHOLDER_IMAGE,
  Journal_LIST,
} from '../../constants';
import {
  Text,
  ButtonView,
  TextInput,
  CustomNavbar,
  Loader,
  Avatar,
} from '../../components';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import ReactNativePickerModule from 'react-native-picker-module';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import {
  getJournalRequest,
  deleteJournalRequest,
} from '../../actions/JournalActions';
import util from '../../util';
import {DATE_FORMAT5} from '../../constants';
import ActionSheetCustom from 'react-native-actionsheet';

class Journal extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      postModal: false,
      loading: false,
      data: [],
      categoriesArray: [],
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  fetchData = () => {
    util.showLoader(this);
    this.props.getJournalRequest(res => {
      if (res) {
        util.hideLoader(this);
        this.setState({data: res.posts, categoriesArray: res.tags});
      } else {
        this.setState({data: [], categoriesArray: []});
        util.hideLoader(this);
      }
      util.hideLoader(this);
    });
  };
  deleteJournal = item => {
    util.showLoader(this);
    const payload = {
      journal_id: item.id,
    };

    this.props.deleteJournalRequest(payload, res => {
      if (res) {
        const Index = _.findIndex(this.state.data, o => o.id === item.id);
        util.hideLoader(this);
        let newArray = [...this.state.data];
        newArray.splice(Index, 1);
        this.setState({data: newArray});
        // this.props.getJournalRequest();
      }
      util.hideLoader(this);
    });
  };
  renderUser = item => {
    const {data} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Avatar
          image={item.user.image}
          style={{
            alignSelf: 'flex-start',
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
          imageStyle={{height: 40, width: 40}}
        />
        <View
          style={[
            AppStyles.flexRow,
            {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
          ]}>
          <View style={[{marginLeft: 10, alignItems: 'center'}]}>
            <Text color="black" size="xSmall" type="semi_bold">
              {item.user.first_name + ' ' + item.user.last_name}
            </Text>
          </View>
          {data.id == item.user.id && (
            <ButtonView
              onPress={() =>
                Alert.alert(
                  'Alert',
                  'Are you sure to Delete Journal',
                  [
                    {
                      text: 'Cancel',
                      // onPress: () => Actions.pop(),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this.deleteJournal(item)},
                  ],
                  {cancelable: true},
                )
              }
              style={{position: 'absolute', right: 0}}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <Image
                source={Images.more}
                style={{height: 15, width: 15}}
                resizeMode="contain"
              />
            </ButtonView>
          )}
        </View>
      </View>
    );
  };

  renderIcons = ({item}) => {
    return (
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderColor: Colors.blue,
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.nam_tag.image}}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </View>
        <Text color="black" size="xxSmall" style={{marginTop: 5}}>
          {item.nam_tag.title}
        </Text>
      </View>
    );
  };
  postInfo = item => {
    let date = new Date(item.j_date);
    let day = date.getDate();
    let Month = util.getFormattedDateTime(date, 'MMM');
    const Index = _.findIndex(Images.Emogies, o => o.id === item.emoji);
    return (
      <View
        style={{
          //flex: 1,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            borderRadius: 26,
            // paddingVertical: 10,
            //  paddingHorizontal: 10,
            alignItems: 'center',
            paddingRight: 10,
            borderColor: 'gray',
            borderWidth: 0.5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: Colors.blue,
                borderTopLeftRadius: 26,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderBottomLeftRadius: 26,
              }}>
              <Text textAlign="center">
                {day}
                {'\n'}
                {Month}
              </Text>
            </View>
            <Text style={{marginLeft: 10}} color="black">
              I am Feeling {Images.Emogies[Index]?.title}
            </Text>
          </View>
          <Image
            source={Images.Emogies[Index]?.name}
            style={{height: 20, width: 20}}
          />
        </View>
        <FlatList
          data={item._tags}
          renderItem={this.renderIcons}
          horizontal
          style={{alignSelf: 'center'}}
        />
        <Text
          color="black"
          textAlign="center"
          size="xxSmall"
          numberOfLines={3}
          style={{marginHorizontal: 10, marginVertical: 10}}>
          {item.description}
        </Text>
      </View>
    );
  };
  renderPosts = ({item, index}) => {
    const {data} = this.props;
    return (
      <ButtonView
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginHorizontal: 24,
          marginVertical: 8,

          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: Colors.blue,
          borderWidth: 1,
        }}
        onPress={() =>
          this.props.navigation.navigate('journalDetail', {item: item})
        }>
        {this.renderUser(item)}
        {this.postInfo(item)}
      </ButtonView>
    );
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
  renderHeader = () => {
    return (
      <View style={{marginHorizontal: Metrics.baseMargin, marginTop: 20}}>
        <Text color="blue" type="bold">
          Whats in your mind
        </Text>
        <Text
          type="regular"
          size="xxSmall"
          color="black"
          style={AppStyles.marginVerticalBase}>
          Lets Write something
        </Text>
      </View>
    );
  };
  renderDocs = item => {
    return (
      <View style={styles.docView}>
        <Image style={styles.imageDoc} source={{uri: PLACEHOLDER_IMAGE}} />

        <TouchableOpacity
          style={styles.crossBtn2}
          // onPress={() => this.removeDoc(item)}
        >
          <Image source={Images.cross} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  renderListContent = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({selectedMood: item, showDropDown: false})
        }>
        <Text color="blue">{item}</Text>
      </TouchableOpacity>
    );
  };

  renderEmpty = () => {
    if (this.state.loading) return null;
    return (
      <View style={[AppStyles.centerInner, {marginTop: 20}]}>
        <Text color="black">No Journal found</Text>
      </View>
    );
  };
  render() {
    const {errors, loading} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Journal"
          // hasBack={false}
          leftBtnImage={Images.DrawerOpen}
          leftBtnPress={() => this.props.navigation.openDrawer()}
          rightBtnImage={Images.profile_select}
          rightBtnPress={() =>
            this.props.navigation.navigate('addJournal', {
              categoriesArray: this.state.categoriesArray,
            })
          }
          imageStyle={{height: 30, width: 30}}
        />
        {this.renderHeader()}
        <FlatList
          data={this.state.data}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.fetchData}
              tintColor="#000"
              titleColor="#000"
            />
          }
          extraData={this.state}
          ListEmptyComponent={this.renderEmpty}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
});
const actions = {getJournalRequest, deleteJournalRequest};

export default connect(mapStateToProps, actions)(Journal);
