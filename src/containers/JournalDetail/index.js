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
  FollowingList,
} from '../../constants';
import {
  Text,
  ButtonView,
  TextInput,
  CustomNavbar,
  Loader,
  Avatar,
  SearchBar,
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
import ListItem from './Item';
import util from '../../util';
import {getPeoplesRequest} from '../../actions/UserActions';
import {shareJournalRequest} from '../../actions/JournalActions';

class JournalDetail extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      modal: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  renderUser = item => {
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
          {item.isOwnPost == true && (
            <ButtonView>
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
  fetchData = (text = '') => {
    util.showLoader(this);

    const payload = {
      role: '',
      search: text,
    };
    this.props.getPeoplesRequest(payload, res => {
      if (res) {
        console.log('responded', res);
        util.hideLoader(this);
        this.setState({data: res});
      } else {
        this.setState({data: []});
      }
      util.hideLoader(this);
    });
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
              I am Feeling {Images.Emogies[Index].title}
            </Text>
          </View>
          <Image
            source={Images.Emogies[Index].name}
            style={{height: 20, width: 20}}
          />
        </View>
        <FlatList
          data={item._tags}
          renderItem={this.renderIcons}
          horizontal
          style={{alignSelf: 'center'}}
          ListFooterComponent={this.ListFooterComponent}
        />
        <Text
          color="black"
          textAlign="center"
          size="xxSmall"
          style={{marginHorizontal: 10, marginVertical: 10}}>
          {item.description}
        </Text>
      </View>
    );
  };
  renderPosts = item => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginHorizontal: 24,
          marginVertical: 8,

          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: Colors.blue,
          borderWidth: 1,
        }}>
        {this.renderUser(item)}
        {this.postInfo(item)}
      </View>
    );
  };

  ListFooterComponent = () => {
    return (
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <ButtonView
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderColor: Colors.blue,
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.blue,
          }}
          onPress={() => this.setState({modal: true})}>
          <Image
            source={require('../../assets/icons/journal/share.png')}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </ButtonView>
        <Text color="black" size="xxSmall" style={{marginTop: 5}}>
          share
        </Text>
      </View>
    );
  };
  shareJournal = item => {
    const payload = {
      journal_id: this.props.route.params.item.id,
      user_id: item.id,
    };
    this.props.shareJournalRequest(payload, res => {
      if (res) {
        util.topAlert('Journal Share successfully');
        this.props.navigation.goBack();
      }
    });
  };
  ListView({item, index, navigation}) {
    return (
      <ListItem
        item={item}
        navigation={this.props.navigation}
        closeModal={() =>
          this.setState({modal: false}, () => {
            this.shareJournal(item);
          })
        }
      />
    );
  }

  renderModal() {
    const {currentLanguage, screenText} = this.props;

    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({modal: false})}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'black'}>
        <View style={styles.modalStyle}>
          <Text
            textAlign="center"
            size="large"
            color="blue"
            type="bold"
            style={{marginVertical: Metrics.baseMargin}}>
            Share Journal
          </Text>

          <SearchBar
            ref={ref => {
              this.myRef = ref;
            }}
            placeholder="Search User"
            value={this.state.searchValue}
            hasSearch={false}
            onSearchText={text =>
              this.setState({text: text}, this.fetchData(text))
            }
            hasRefresh={false}
            containerStyle={{
              marginHorizontal: Metrics.baseMargin,
            }}
            searchWrapper={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              marginHorizontal: Metrics.baseMargin,
              backgroundColor: Colors.white,

              alignSelf: 'center',
              borderRadius: 18,
              ...AppStyles.flexRow,
              marginVertical: 10,
            }}
          />
          <FlatList
            contentContainerStyle={{paddingBottom: 40}}
            data={this.state.data}
            renderItem={(item, index) =>
              this.ListView(item, index, this.props.navigation)
            }
            // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    );
  }

  render() {
    const {errors, loading} = this.state;
    const {item} = this.props.route.params;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Journal"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        {this.renderPosts(item)}
        {/*<FlatList
          data={Journal_LIST}
          renderItem={this.renderPosts}
          showsVerticalScrollIndicator={false}
        />*/}
        {this.renderModal()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({user}) => ({
  data: user.data,
});
const actions = {getPeoplesRequest, shareJournalRequest};

export default connect(mapStateToProps, actions)(JournalDetail);
