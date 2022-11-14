// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, ButtonView, SearchBar, Avatar } from '../';
import styles from './styles';
import { Images, AppStyles, Colors } from '../../theme';
import { CountryCodeList } from 'react-native-country-picker-modal';
import { IMAGE_URL, PLACEHOLDER_IMAGE } from '../../constants';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    profileImage: PropTypes.string,
    hasLogo: PropTypes.bool,
    hasBack: PropTypes.bool,
    title: PropTypes.string,
    titleBackgroundColor: PropTypes.string,
    leftBtnImage: PropTypes.number,
    leftBtnImage1: PropTypes.number,
    leftBtnPress1: PropTypes.func,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnPress1: PropTypes.func,
    rightBtnPress2: PropTypes.func,
    rightBtnPress3: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    img1Style: PropTypes.object,
    imgStyle: PropTypes.object,
    img3Style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
  };

  static defaultProps = {
    profileImage: PLACEHOLDER_IMAGE,
    hasRight: false,
    hasLogo: false,
    hasBack: true,
    titleColor: 'black',
    titleBackgroundColor: '',
    leftBtnImage: undefined,
    leftBtnImage1: undefined,
    leftBtnPress1: () => { },
    leftBtnPress: () => { },
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => { },
    rightBtnPress1: () => { },
    rightBtnPress2: () => { },
    rightBtnPress3: () => { },
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => { },
    isSearching: false,
    logoViewStyle: {},
    img1Style: {},
    imgStyle: {},
    img3Style: {},
    showStatus: false,
  };

  renderLeft(
    leftBtnImage,
    leftBtnPress,
    leftBtnText,
    hasBack,
    hasLogo,
    logoViewStyle,
    hasProfile,
    imageName,
  ) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView
        onPress={hasBack ? leftBtnPress : null}
        style={hasProfile ? styles.btnWrapperprofile : styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && (
          <Text size="mediumLarge" color={Colors.white} type="sf_display_bold">
            {leftBtnText}
          </Text>
        )}
        {!_.isUndefined(hasBack) && hasBack && (
          <Image
            source={leftBtnImage || Images.back_image}
            style={styles.btnImage}
          />
        )}

        {hasLogo && (
          <View style={logoViewStyle}>
            <Image
              resizeMode="contain"
              //source={Images.pingo_logo}
              source={Images[imageName]}
              style={styles.btnImage2}
            />
          </View>
        )}
        {/*imageName && (
          <View style={logoViewStyle}>
            <Image
              resizeMode="contain"
              // source={Images.imageName}
              source={Images[imageName]}
              style={styles.btnImage2}
            />
          </View>
        )*/}
      </ButtonView>
    );
    // ) : (
    //   <View>
    //     <Image
    //       resizeMode="center"
    //       source={Images.pingo_logo}
    //       style={styles.btnImage2}
    //     />
    //   </View>
    // );
  }

  renderRight(
    rightBtnImage,
    rightBtnPress,
    rightBtnText,
    rightButtonStyle,
    imageStyle,
  ) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[styles.btnWrapper, styles.rightBtn, rightButtonStyle]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image source={rightBtnImage} style={[styles.btnImage, imageStyle]} />
        )}
      </ButtonView>
    );
  }
  renderRightMultiple = (
    img1Style,
    imgStyle,
    img3Style,
    rightBtnImage1,
    rightBtnImage2,
    rightBtnImage3,
    rightBtnPress1,
    rightBtnPress2,
    rightBtnPress3,
  ) => {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.alignItemsCenter,
          //   {backgroundColor: 'red'},
        ]}>
        <ButtonView style={img1Style} onPress={rightBtnPress1}>
          <Image
            style={img1Style}
            source={rightBtnImage1}
            resizeMode={'contain'}
          />
        </ButtonView>

        <ButtonView style={imgStyle} onPress={rightBtnPress2}>
          {/* <Avatar
            image={rightBtnImage2}
            style={styles.rightimage2}
            resizeMode={'contain'}
         />*/}
          <Image
            source={rightBtnImage2}
            size={styles.btnImage}
            resizeMode={'contain'}
          />
        </ButtonView>
        <ButtonView style={img1Style} onPress={rightBtnPress3}>
          <Image
            source={rightBtnImage3}
            size={styles.btnImage}
            resizeMode={'contain'}
          />
        </ButtonView>
      </View>
    );
  };
  renderLogo() {
    return (
      <View>
        <Image
          resizeMode="contain"
          source={Images.pingo_logo}
          style={styles.btnImage2}
        />
      </View>
    );
  }
  renderOnLineStatus = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={Images.onlineImage}
          style={{ height: 15, width: 15, marginRight: 1 }}></Image>
        <Text alignSelf="center" size={'xxSmall'} color="green">
          online
        </Text>
      </View>
    );
  };
  renderOfflineStatus = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={Images.offlineImage}
          style={{ height: 12, width: 12, marginRight: 5 }}></Image>

        <Text alignSelf="center" size={'xxSmall'}>
          Offline
        </Text>
      </View>
    );
  };
  renderStatus = status => {
    if (status == 'IsOnline') {
      return this.renderOnLineStatus();
    } else {
      return this.renderOfflineStatus();
    }
  };

  renderTitle(
    title,
    titleColor,
    titleType,
    titleSize,
    titleImage,
    showStatus,
    status,
  ) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        {titleImage ? (
          <Image
            resizeMode="contain"
            style={styles.btnImage2}
            source={titleImage}
          />
        ) : (
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              color={titleColor || 'black'}
              type={titleType || 'semi_bold'}
              numberOfLines={1}
              ellipsizeMode="tail"
              size={titleSize || 'normal'}>
              {title || ''}
            </Text>
            {showStatus && this.renderStatus(status)}
          </View>
        )}
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }
  renderProfilePicture(profileImage) {
    return (
      <View>
        <Avatar
          image={profileImage}
          style={{ width: 50, height: 50, resizeMode: 'cover' }}
        />
      </View>
    );
  }
  renderProfilePicture(profileImage) {
    return (
      <View>
        <Avatar
          image={profileImage}
          style={{ width: 50, height: 50, resizeMode: 'cover' }}
        />
      </View>
    );
  }
  render() {
    const { navigation } = this.props;
    const {
      hasBack,
      title,
      titleBackgroundColor,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnImage1,
      rightBtnImage2,
      rightBtnImage3,
      rightBtnPress,
      rightBtnPress1,
      rightBtnPress2,
      rightBtnPress3,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      hasLogo,
      hasRight,
      titleType,
      titleSize,
      logoViewStyle,
      img1Style,
      imgStyle,
      img3Style,
      titleImage,
      rightButtonStyle,
      showStatus,
      status,
      hasLeftImage,
      hasProfile,
      profileImage,
      imageName,
      imageStyle,
    } = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
        ]}>
        <View style={[AppStyles.flexRow, { alignItems: 'center', backgroundColor: titleBackgroundColor, }]}>
          {this.renderLeft(
            leftBtnImage,
            leftBtnPress,
            leftBtnText,
            hasBack,
            hasLogo,
            logoViewStyle,
            hasProfile,
            imageName,
          )}

          {this.renderTitle(
            title,
            titleColor,
            titleType,
            titleSize,
            titleImage,
            showStatus,
            status,
          )}
          {!hasRight &&
            this.renderRight(
              rightBtnImage,
              rightBtnPress,
              rightBtnText,
              rightButtonStyle,
              imageStyle,
            )}
          {hasProfile && this.renderProfilePicture(profileImage)}
          {hasRight &&
            this.renderRightMultiple(
              img1Style,
              imgStyle,
              img3Style,
              rightBtnImage1,
              rightBtnImage2,
              rightBtnImage3,
              rightBtnPress1,
              rightBtnPress2,
              rightBtnPress3,
            )}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </SafeAreaView>
    );
  }
}
