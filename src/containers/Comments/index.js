// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, RefreshControl} from 'react-native';
import {Loader, Text, TextInput} from '../../components';
import styles from './styles';
import {connect} from 'react-redux';
import {Avatar, CustomNavbar} from '../../components';
import {Images, Metrics, AppStyles, Colors} from '../../theme';
import {PLACEHOLDER_IMAGE} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import util from '../../util';
import {
  getCommentsRequest,
  postCommentRequest,
} from '../../actions/UserActions';

class Comments extends React.Component {
  static propTypes = {};
  state = {
    data: [],
    loading: false,
  };
  static defaultProps = {};

  renderHeader = () => {
    return (
      <View>
        <Text style={AppStyles.margin10} color="blue" type="bold">
          Comments({this.state.data.length})
        </Text>
      </View>
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {post_id} = this.props.route.params;

    util.showLoader(this);

    const payload = {
      post_id: post_id,
    };
    this.props.getCommentsRequest(payload, res => {
      if (res) {
        this.setState({data: res});
        util.hideLoader(this);
      }
      util.hideLoader(this);
    });
  };

  renderItem = ({item, index}) => {
    var date = util.getDateObjectFromString(item.created_at);
    // var date = new Date(item.created_at);
    var convertedDate = util.convertUTCDateToLocalDate(date);
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          padding: Metrics.baseMargin,
          margin: 10,
          borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Avatar
            image={
              item.user_image == null ? PLACEHOLDER_IMAGE : item.user_image
            }
            style={{
              alignSelf: 'flex-start',
              height: 35,
              width: 35,
              borderRadius: 17,
            }}
            imageStyle={{height: 35, width: 35}}
          />
          <View
            style={[
              AppStyles.flexRow,
              {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
            ]}>
            <View style={[{marginLeft: 10}]}>
              <Text color="black" size="xSmall" type="semi_bold">
                {item.user_name}
              </Text>
              <Text
                color="black"
                size="xxSmall"
                type="thin"
                style={[AppStyles.mTop2]}>
                {util.getFormattedDateTime(
                  convertedDate,
                  'DD MMM YYYY hh:mm A',
                )}
              </Text>
              <Text type="thin" color="black">
                {item.comment}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  renderFooter = () => {
    return (
      <TextInput
        placeholder={'Type Comment'}
        leftImage={Images.send}
        onChangeText={value => this.setState({postComment: value})}
        leftBnPress={this.postComment}
        value={this.state.postComment}
      />
    );
  };
  postComment = () => {
    if (this.state.postComment == '') {
      util.topAlertError('Please Type Comment');
    } else {
      const {post_id} = this.props.route.params;
      const payload = {
        post_id: post_id,
        comment: this.state.postComment,
      };
      util.showLoader(this);
      this.props.postCommentRequest(payload, res => {
        if (res) {
          this.setState({postComment: ''}, () => {
            util.hideLoader(this);
            this.state.data.unshift(res);
          });
        }
        util.hideLoader(this);
      });
    }
  };
  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Comments"
          // hasBack={false}
          leftBtnImage={Images.back_image}
          leftBtnPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.fetchData}
              tintColor="#000"
              titleColor="#000"
            />
          }
          extraData={this.state}
        />
        {this.renderFooter()}
      </View>
    );
  }
}
const mapStateToProps = ({}) => ({});

const actions = {getCommentsRequest, postCommentRequest};

export default connect(mapStateToProps, actions)(Comments);
