// @flow
import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Image as RNImage,
} from 'react-native';
import { ButtonView } from '../../components';
import styles from './styles';
import { Colors, AppStyles, Metrics } from '../../theme';
import Modal from 'react-native-modal';
import VideoPlayer from '../../components/VideoPlayer';
export default class VidoesItem extends React.Component {
  static propTypes = {};
  state = { modal: false, videoUrl: '' };
  renderModal() {
    return (
      <Modal
        isVisible={this.state.modal}
        onBackdropPress={() => this.setState({ modal: false })}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropColor={'#000'}
        style={{ alignSelf: 'center' }}>
        <View
          style={[
            AppStyles.centerInner,
            AppStyles.flex,
            {
              width: Metrics.screenWidth,
              overflow: 'scroll',
            },
          ]}>
          <ButtonView
            style={styles.cancelImageContainer}
            onPress={() => this.setState({ modal: false })}>
            <RNImage
              source={require('../../assets/icons/Cut/cut.png')}
              style={styles.cancelImage}
              resizeMode={'cover'}
            />
          </ButtonView>
          <VideoPlayer video={this.state.videoUrl} style={{
            height: Metrics.screenHeight - Metrics.screenHeight * 0.5,
            width: Metrics.screenWidth,
          }} />
        </View>
      </Modal>
    );
  }
  render() {
    const { item, navigation } = this.props;

    return (
      <View style={{ alignItems: 'center' }}>
        <ImageBackground
          source={{ uri: item.image }}
          style={{
            // opacity: 0.6,
            borderRadius: 10,
            //shadowOpacity: 10,
            overflow: 'hidden',
            width: Metrics.screenWidth / 2 - 20,
            height: 100,
            marginRight: 5,
            marginLeft: 5,
            marginVertical: 10,
            borderColor: Colors.blue,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          resizeMode="stretch">
          <ButtonView
            style={{
              height: 100,
              width: Metrics.screenWidth / 2 - 20,
              flex: 1,
              backgroundColor: 'rgba(15,10,222,0.4)',
              // opacity: 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>
              this.setState({ videoUrl: item.media }, () => {
                setTimeout(() => {
                  this.setState({ modal: true });
                }, 200);
              })
            }>
            <Image
              source={{
                uri: item.thumbnail,
              }}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
              }}
            />
          </ButtonView>
          {this.renderModal()}
        </ImageBackground>
      </View>
    );
  }
}
