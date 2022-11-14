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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import DataHandler from '../../services/DataHandler';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  City,
  State,
  PLACEHOLDER_IMAGE,
  EmojisList,
  IconsList,
  DATE_FORMAT1,
  DATE_FORMAT2,
} from '../../constants';
import {Text, ButtonView, CustomNavbar, Loader, Avatar} from '../../components';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import styles from './styles';
import Util from '../../util';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {Picker} from '@react-native-picker/picker';
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {postJournalRequest} from '../../actions/JournalActions';
import util from '../../util';
class AddJournal extends Component {
  constructor(props) {
    super(props);
    this.pickerRef = React.createRef();

    this.state = {
      errors: {},
      loading: false,
      modal: false,
      emotions: '',
      emoji: '',
      journalIcons: this.props.route.params.categoriesArray,
      serverArray: [],
      sentServerData: [],
      date: '',
      des: '',
      // selectedClients: IconsList,
    };
  }

  static propTypes = {
    //   userSigninRequest: PropTypes.func.isRequired,
  };

  nameValue = '';

  componentDidMount() {
  }

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

  _onSubmit = () => {
    if (this.state.date == '') {
      util.topAlertError('Please Select Date');
    } else if (this.state.emotions == '') {
      util.topAlertError('please select emoji');
    } else if (this.state.serverArray.length == 0) {
      util.topAlertError('please select atleast one category');
    } else if (this.state.des == '') {
      util.topAlertError('please Type description');
    } else {
      util.showLoader(this);
      const payload = {
        emoji: this.state.emoji,
        tags: this.state.serverArray,
        j_date: this.state.date,
        description: this.state.des,
      };
      this.props.postJournalRequest(payload, res => {
        if (res) {
          util.hideLoader(this);
          this.props.navigation.goBack();
        }
        util.hideLoader(this);
      });
    }
  };
  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: Metrics.baseMargin,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text color="blue" type="bold">
            Explore Your emotions
          </Text>
          <Text style={{marginVertical: 10}} color="blue" size="large">
            <Text type="regular" size="xxSmall" color="black">
              How Are you feeling?
            </Text>
            {' ' + this.state.emotions}
          </Text>
        </View>

        <ButtonView
          // style={{
          //   backgroundColor: Colors.blue,
          //   borderRadius: 5,
          //   paddingVertical: 10,
          //   paddingHorizontal: 5,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
          onPress={() => {}}>
          {/* <Text
            color="white"
            type="bold"
            size="xxSmall"
            textAlign="center"
            style={{alignSelf: 'center'}}>
            {this.state.date}
         </Text>*/}
          <DatePicker
            showIcon={false}
            style={{
              width: 70,
              marginTop: 10,
              color: '#000',
              fontSize: 11,
            }}
            date={this.state.date}
            maxDate={new Date()}
            mode="date"
            placeholder={'Date'}
            format={DATE_FORMAT2}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                backgroundColor: Colors.blue,
                borderRadius: 5,
                //   paddingVertical: 10,
                //    paddingHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
              },
              dateText: {
                fontSize: 10,
                fontFamily: Fonts.type.small,
                color: Colors.white,
                textAlign: 'left',
              },
              placeholderText: {
                textAlign: 'left',
                fontSize: Fonts.size.small,
                color: Colors.white,
              },
            }}
            onDateChange={date => {
              this.setState({date: date, showDateError: false});
            }}
          />
        </ButtonView>
      </View>
    );
  };
  renderEmojiItem = ({item, index}) => {
    return (
      <ButtonView
        style={{marginHorizontal: 10, alignItems: 'center'}}
        onPress={() => this.setState({emotions: item.name, emoji: item.id})}>
        <Image source={item.icon} style={{height: 40, width: 40}} />
        <Text color="black" style={{marginTop: 10}}>
          {item.name}
        </Text>
      </ButtonView>
    );
  };

  selectItem = (item, count) => {
    let serverArray = [];
    if (this.state.serverArray.length < 3) {
      const Index = _.findIndex(this.state.serverArray, o => o.id === item.id);
      if (Index == -1) {
        let tempArray = [...this.state.serverArray];

        tempArray.push(item);

        this.setState({serverArray: tempArray});
      } else {
        let tempArray = [...this.state.serverArray];
        tempArray.splice(Index, 1);
        this.setState({serverArray: tempArray});
      }
    } else {
      const Index = _.findIndex(this.state.serverArray, o => o.id === item.id);
      if (Index !== -1) {
        let tempArray = [...this.state.serverArray];

        tempArray.splice(Index, 1);

        this.setState({serverArray: tempArray});
      }
    }
  };
  renderIcons = ({item, index}) => {
    const count = this.state.journalIcons.filter(
      i => i.isSelected === true,
    ).length;

    let Index = _.findIndex(this.state.serverArray, o => o.id === item.id);

    return (
      <ButtonView
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          alignItems: 'center',
        }}
        onPress={() => this.selectItem(item, count)}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderColor: Colors.blue,
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Index !== -1 ? Colors.gray : 'white',
          }}>
          <Image
            source={{uri: item.image}}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </View>
        <Text color="black" size="xxSmall" style={{marginTop: 5}}>
          {item.title}
        </Text>
      </ButtonView>
    );
  };
  renderIconsList = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderColor: Colors.blue,
          borderWidth: 1,
          // paddingVertical: 10,
          paddingHorizontal: 16,
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 10,
          height: Metrics.screenHeight * 0.25,
          width: Metrics.screenWidth - Metrics.doubleBaseMargin,

          alignSelf: 'center',
        }}>
        <FlatList
          data={this.state.journalIcons}
          renderItem={this.renderIcons}
          contentContainerStyle={
            {
              //   backgroundColor: 'white',
              //   borderColor: Colors.blue,
              //   borderWidth: 1,
              //   paddingVertical: 10,
              //   paddingHorizontal: 16,
              //   alignItems: 'center',
              //   borderRadius: 10,
              //   marginTop: 10,
            }
          }
          scrollEnabled={true}
          // numColumns={5}
          style={{
            width: Metrics.screenWidth - Metrics.doubleBaseMargin,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}
          extraData={this.state}
          horizontal
        />
      </View>
    );
  };

  renderEmojisList = () => {
    return (
      <View>
        <FlatList
          data={EmojisList}
          renderItem={this.renderEmojiItem}
          horizontal
          scrollEnabled={true}
          contentContainerStyle={
            {
              // backgroundColor: 'white',
              // borderColor: Colors.blue,
              // borderWidth: 1,
              // paddingVertical: 10,
              // paddingHorizontal: 16,
              // alignItems: 'center',
              // borderRadius: 10,
              // marginTop: 10,
            }
          }
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            alignSelf: 'center',
            paddingHorizontal: 5,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'blue',
          }}
        />
      </View>
    );
  };
  render() {
    const {errors, loading} = this.state;

    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <ScrollView>
          <CustomNavbar
            title="Add Journal"
            // hasBack={false}
            leftBtnImage={Images.back_image}
            leftBtnPress={() => this.props.navigation.goBack()}
            imageStyle={{height: 30, width: 30}}
          />

          {this.renderHeader()}

          {this.renderEmojisList()}
          <Text
            color="blue"
            type="bold"
            style={{
              marginHorizontal: Metrics.baseMargin,
              marginVertical: Metrics.baseMargin,
            }}>
            What have you been up to?
          </Text>
          {this.renderIconsList()}
          <TextInput
            style={{
              marginVertical: 15,
              padding: 10,
              backgroundColor: Colors.white,
              width: Metrics.screenWidth - Metrics.doubleBaseMargin,
              height: Metrics.screenHeight * 0.1,
              borderRadius: 10,
              color: 'black',
              textAlignVertical: 'top',
              alignSelf: 'center',
              borderColor: 'gray',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            multiline
            placeholder={`have "5 things your grateful for, prayer and 3 goals for today`}
            placeholderTextColor={Colors.gray}
            onChangeText={value => this.setState({des: value})}
          />
          <ButtonView onPress={this._onSubmit} style={styles.button}>
            <Text
              textAlign="center"
              type="bold"
              size="large"
              style={{includeFontPadding: false}}>
              Submit
            </Text>
          </ButtonView>
          <Loader loading={loading} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {postJournalRequest};

export default connect(mapStateToProps, actions)(AddJournal);
