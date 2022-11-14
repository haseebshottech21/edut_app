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

export default class Documents extends React.Component {
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
    return (
      <ListItem item={item} navigation={this.props.navigation} index={index} />
    );
  }

  componentWillUnmount() {}

  render() {
    const {selectedTab} = this.state;
    const {documentsList} = this.props.route.params;
    console.log('checkkkk', this.props.route);
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Documents"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />

        <FlatList
          contentContainerStyle={{paddingBottom: 40}}
          data={documentsList}
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
