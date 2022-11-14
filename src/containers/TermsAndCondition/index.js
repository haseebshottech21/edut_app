// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Platform, ImageBackground, ScrollView} from 'react-native';
import {Text, CustomNavbar, Loader} from '../../components';
import styles from './styles';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import {connect} from 'react-redux';

import {getContentRequest} from '../../actions/AppInfoActions';
import util from '../../util';
import RenderHtml from 'react-native-render-html';
const source = {
  html: `
  <p>Lorem Ipsum is simply dummy text of the printing and type</p>`,
};
class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      loading: false,
    };
  }
  static propTypes = {};

  static defaultProps = {};
  componentDidMount() {
    util.showLoader(this);
    const payload = {
      type: 'terms-condition',
    };
    this.props.getContentRequest(payload, res => {
      util.hideLoader(this);
      console.log('comop', res);
      this.setState({data: res[0].description});
    });
  }

  render() {
    const {navigation, route} = this.props;
    const {loading} = this.state;
    //  const {isAuth} = route.params;
    console.log(this.state.data);
    return (
      <ImageBackground style={styles.container} source={Images.homeBackground}>
        <CustomNavbar
          title="Terms and Conditions"
          // hasBack={false}
          leftBtnImage={
            this.props.route.params.isAuth
              ? Images.back_image
              : Images.DrawerOpen
          }
          leftBtnPress={
            this.props.route.params.isAuth == true
              ? () => this.props.navigation.goBack()
              : () => this.props.navigation.openDrawer()
          }
        />
        <ScrollView>
          {/*<Text
            style={[
              AppStyles.letterSpace2,
              AppStyles.mTop20,
              AppStyles.marginHorizontalBase,
            ]}
            textAlign="center"
            color="black"
            size="xSmall">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Contrary to popular
            belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden-Sydney
            College in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC. This book is a treatise on the theory of
            ethics, very popular during the Renaissance. The first line of Lorem
            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced below for those interested. Sections 1.10.32 and 1.10.33
            from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from
            the 1914 translation by H. Rackham.
          </Text>*/}
          <RenderHtml
            contentWidth={Metrics.screenWidth}
            source={{html: this.state.data}}
          />
        </ScrollView>
        <Loader loading={loading} />
      </ImageBackground>
    );
  }
}
const mapStateToProps = () => ({});

const actions = {getContentRequest};

export default connect(mapStateToProps, actions)(TermsAndCondition);
