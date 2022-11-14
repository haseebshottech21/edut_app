import React, {Component} from 'react';
import _ from 'lodash';

import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import {
  CustomNavbar,
  Image as RNImage,
  Avatar,
  ButtonView,
  Loader,
} from '../../components';
import {getPeoplesRequest} from '../../actions/UserActions';
import {createGroupRequest} from '../../actions/GroupActions';

import {connect} from 'react-redux';
import util from '../../util';
import {utils} from '@react-native-firebase/app';
import {CAMERA_ICON, PLACEHOLDER_IMAGE} from '../../constants';
import ActionSheetCustom from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Images, AppStyles, Metrics, Colors, Fonts} from '../../theme';
import styles from './styles';

class CreateGroup extends Component {
  state = {
    selection: 'explore',
    data: [],
    selectedData: [],
    loading: false,
    des: '',
    name: '',
    image: '',
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    util.showLoader(this);

    const payload = {
      role: '',
    };
    this.props.getPeoplesRequest(payload, res => {
      if (res) {
        console.log('responded', res);
        util.hideLoader(this);
        this.setState({data: res});
      }
      util.hideLoader(this);
    });
  };
  addMember = item => {
    const index = this.state.selectedData.findIndex(o => o.id == item.id);
    console.log('indexxxx', index);
    console.log('selectedData', this.state.selectedData);
    // var array = [...this.state.data];
    if (index !== -1) {
      util.topAlertError('user already in the list');
    } else {
      this.setState({selectedData: [...this.state.selectedData, item]});
    }
  };
  renderPhotoSelection = () => {
    return (
      <View>
        <ActionSheetCustom
          ref={o => (this.ActionSheet = o)}
          title={'Select Photo'}
          options={['Take a Photo', 'Choose From Library', 'Cancel']}
          cancelButtonIndex={2}
          onPress={index => {
            this.ActionsSheetPress(index);
          }}
          //styles={[]}
        />
      </View>
    );
  };
  ActionsSheetPress = index => {
    if (index === 0) {
      this.openCamera();
    }
    if (index === 1) {
      this.openGallery();
    }
  };
  openCamera = () => {
    try {
      // if (Platform.OS == 'android') {
      //   this.openAndroidCamera();
      // } else {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = response.assets[0];

          this.setState({
            imageType: source.type,
            image: source.uri,
          });
        }
      });
    } catch (err) {
      // }
      console.warn(err);
    }
  };
  openGallery = async () => {
    try {
      const options = {
        quality: 1.0,
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
        },
      };
      launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
          alert(response.error);
        } else {
          const source = response.assets[0];
          this.setState({
            imageType: source.type,
            image: source.uri,
          });
        }
      });
    } catch (err) {
      // console.warn(err);
    }
  };
  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          marginHorizontal: 20,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: 45,
            height: 45,
            resizeMode: 'cover',
            borderRadius: 45,
          }}
        />
        <Text style={{color: Colors.blue, marginLeft: 15, flex: 1}}>
          {item.name}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: Colors.blue,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => this.addMember(item)}>
          <Text style={{color: 'white', fontWeight: '700'}}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderMembers = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: 'white',
          paddingHorizontal: 15,
        }}>
        <FlatList
          data={this.state.selectedData}
          horizontal
          renderItem={this.renderHorizontalItem}
          showsHorizontalScrollIndicator={false}
          extraData={this.state}
        />
      </View>
    );
  };
  renderHorizontalItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 5}}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: 45,
            height: 45,
            resizeMode: 'contain',
            borderRadius: 45,
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: Colors.blue,
            position: 'absolute',
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => this.removeItem(item)}>
          <Text style={{color: 'white'}}>x</Text>
        </TouchableOpacity>
      </View>
    );
  };
  removeItem = item => {
    const index = this.state.selectedData.findIndex(o => o.id == item.id);

    var array = [...this.state.selectedData];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({selectedData: array});
    }
  };
  renderGroupInfo = () => {
    const {image} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderTopColor: 'white',
          borderBottomColor: 'white',
          paddingHorizontal: 20,
        }}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: Colors.blue,
            height: 45,
            width: 45,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'white',
          }}
          onPress={() => this.ActionSheet.show()}>
          <Image
            source={{
              uri: image == '' ? CAMERA_ICON : image,
            }}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'cover',
              //  tintColor: 'white',
            }}
          />
          </TouchableOpacity>*/}
        <View>
          <Avatar image={image == '' ? PLACEHOLDER_IMAGE : image} />
          <ButtonView
            style={styles.uploadView}
            onPress={() => this.ActionSheet.show()}>
            <Image source={Images.profile_select} style={styles.uploadIcon} />
          </ButtonView>
        </View>
        <View style={{flex: 1, marginLeft: 15}}>
          <TextInput
            style={{
              height: 45,
              borderBottomColor: 'white',
              borderBottomWidth: 1.5,
              color: Colors.blue,
            }}
            placeholder={'Enter Group Name'}
            placeholderTextColor={Colors.blue}
            onChangeText={value => this.setState({name: value})}
            value={this.state.name}
          />
          <TextInput
            style={{
              height: 45,
              borderBottomColor: 'white',
              borderBottomWidth: 1.5,
              color: Colors.blue,
            }}
            placeholder={'Enter Group Description'}
            placeholderTextColor={Colors.blue}
            onChangeText={value => this.setState({des: value})}
            value={this.state.des}
          />
        </View>
      </View>
    );
  };
  _onSubmit = () => {
    if (this.state.name == '') {
      util.topAlertError('Please Type Group name');
    } else if (this.state.des == '') {
      util.topAlertError('Please Type Group des');
    } else if (this.state.image == '') {
      util.topAlertError('Please Upload Group Picture');
    } else if (this.state.selectedData == []) {
      util.topAlertError('Please Select at least one member');
    } else {
      const formData = new FormData();
      formData.append('title', this.state.name);
      formData.append('description', this.state.des);

      this.state.selectedData.map((value, index) => {
        formData.append('members[]', value.id);
      });
      // formData.append('members', 'checkkkka');

      if (!_.isEmpty(this.state.image)) {
        const payload = {
          uri: this.state.image,
          type: 'image/jpg',
          name: 'profile_picture',
        };
        formData.append('image', payload);
      }
      util.showLoader(this);
      this.props.createGroupRequest(formData, res => {
        if (res) {
          util.hideLoader(this);
          this.props.navigation.goBack();
          util.topAlert('Group Created Successfully');
        }
      });
    }
  };
  render() {
    const {selection, loading} = this.state;
    console.log(this.state.selectedData);
    return (
      <View style={{flex: 1, paddingVertical: 20}}>
        <CustomNavbar
          title="Prayer Group"
          hasBack
          rightBtnText={'Create '}
          rightButtonStyle={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: Colors.blue,
            borderRadius: 20,
          }}
          leftBtnPress={() => this.props.navigation.goBack()}
          rightBtnPress={this._onSubmit}
        />
        {this.renderGroupInfo()}
        {this.renderMembers()}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10, paddingTop: 10}}
          // contentContainerStyle={{paddingBottom: 70}}
          data={this.state.data}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.fetchData}
              tintColor="#000"
              titleColor="#000"
            />
          }
        />
        {this.renderPhotoSelection()}
      </View>
    );
  }
}
const mapStateToProps = ({}) => ({});

const actions = {
  getPeoplesRequest,
  createGroupRequest,
};

export default connect(mapStateToProps, actions)(CreateGroup);
