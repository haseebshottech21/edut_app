import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';

const VideoRecording = ({
  recording,
  changeCam,
  takeVideo,
  stopRecording,
  changeCamera,
}) => {
  let newCamera = null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          zIndex: 99,
        }}
        onPress={() => {
          stopRecording(newCamera);
        }}>
        <Image
          source={require('./close.png')}
          style={{
            height: 20,
            width: 20,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity>
      <RNCamera
        style={styles.preview}
        type={
          changeCam
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        playSoundOnRecord={true}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['1080p']}
        useNativeZoom={true}
        playSoundOnCapture={true}
        flashMode={RNCamera.Constants.FlashMode.on}
        onTap={() => {
          changeCamera();
        }}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          newCamera = camera;
          if (status !== 'READY') return null;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {!recording ? (
                <TouchableOpacity
                  onPress={() => {
                    takeVideo(camera);
                    setTimeout(() => {
                      stopRecording(camera);
                    }, 60000);
                  }}
                  style={styles.capture}>
                  <Image
                    source={require('./start.png')}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => stopRecording(camera)}
                  style={styles.capture}>
                  <Image
                    source={require('./stop.png')}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 25,
                  right: -40,
                  zIndex: 99,
                }}
                onPress={() => {
                  changeCamera();
                }}>
                <Image
                  source={require('./flip.png')}
                  style={{
                    height: 35,
                    width: 35,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default VideoRecording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    alignSelf: 'center',
    margin: 20,
  },
});
