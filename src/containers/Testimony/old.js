// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, FlatList} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TabBar,
  ButtonView,
  SearchBar,
} from '../../components';
import styles from './styles';
import {Images, Colors, Metrics, AppStyles} from '../../theme';
import {Challenges as ChallengeList} from '../../constants';
import ListItem from './Item';
import Modal from 'react-native-modal';
import {FollowingList} from '../../constants';

export default class FamilySupport extends React.Component {
  constructor(props) {
    super(props);
    console.log('checkkkkkk', this.props.route.params);

    this.state = {
      modal: false,
      selectedTab: 1,
    };
  }

  static propTypes = {};

  static defaultProps = {};
  ListView({item, index, navigation}) {
    return <ListItem item={item} navigation={this.props.navigation} />;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }
  onFocusFunction = () => {
    const {params} = this.props.route;
    if (params) {
      this.setState({selectedTab: 2});
    } else {
      this.setState({selectedTab: 1});
    }
    // alert(‘called’); // do some stuff on every screen focus
  };
  componentWillUnmount() {}

  renderTabBar() {
    const {selectedTab} = this.state;
    return (
      <View style={styles.TabContainer}>
        <ButtonView
          style={[
            {
              flex: 1,
              alignItems: 'center',

              paddingVertical: 10,
            },
            selectedTab == 1
              ? {backgroundColor: Colors.blue}
              : {backgroundColor: Colors.white},
          ]}
          onPress={() => this.setState({selectedTab: 1})}>
          <Text size="xxSmall" color={selectedTab == 1 ? 'white' : 'blue'}>
            Following
          </Text>
        </ButtonView>

        <ButtonView
          style={[
            {
              flex: 1,
              alignItems: 'center',

              paddingVertical: 10,
            },
            selectedTab == 2
              ? {backgroundColor: Colors.blue}
              : {backgroundColor: Colors.white},
          ]}
          onPress={() => this.setState({selectedTab: 2})}>
          <Text size="xxSmall" color={selectedTab == 2 ? 'white' : 'blue'}>
            Followers
          </Text>
        </ButtonView>
      </View>
    );
  }

  render() {
    const {selectedTab} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Family Support Group"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <SearchBar
          ref={ref => {
            this.myRef = ref;
          }}
          placeholder="Add a family member"
          value={this.state.searchValue}
          hasSearch={false}
          containerStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            marginHorizontal: Metrics.baseMargin,
          }}
          searchWrapper={{
            backgroundColor: Colors.white,

            alignSelf: 'center',
            borderRadius: 18,
            ...AppStyles.flexRow,
            marginVertical: 10,
          }}
          // onSearchText={text =>
          //   this.setState({searchValue: text}, this.searchFilterFunction(text))
          // }
          hasRefresh={false}
        />
        <FlatList
          contentContainerStyle={{marginVertical: 20, paddingBottom: 40}}
          data={FollowingList}
          renderItem={(item, index) =>
            this.ListView(item, index, this.props.navigation)
          }
          // ListEmptyComponent={() => this._renderEmptyComponent(loading)}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    );
  }
}
