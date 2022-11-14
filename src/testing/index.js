import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  PESDK,
  Configuration,
  SerializationExportType,
} from 'react-native-photoeditorsdk';
import {VESDK} from 'react-native-videoeditorsdk';
import SplashScreen from 'react-native-splash-screen';

// let configuration: Configuration = {
//   export: {
//     serialization: {
//       enabled: true,
//       exportType: SerializationExportType.OBJECT,
//     },
//   },
// };
// let serialization = null;

export default function TestingEditor() {
  const [getImageAfterEditing, setImageAfterEditing] = useState('');
  const openEditor = openWhichEditor => {
    if (openWhichEditor == 'photo') {
      PESDK.openEditor(
        {
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
        },
        configuration,
        serialization,
      )
        .then(result => {
          if (result !== null) {
            serialization = result?.serialization;
            setImageAfterEditing(result?.image);
          }
          console.log('PESDK then called', result);
        })
        .catch(error => {
          console.log('PESDK catch called', error);
        })
        .finally(() => {
          console.log('PESDK finally called');
        });
    } else if (openWhichEditor == 'video') {
      VESDK.openEditor(
        {
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        configuration,
        serialization,
      )
        .then(result => {
          if (result !== null) {
            serialization = result?.serialization;
          }
          console.log('VESDK then called', result);
        })
        .catch(error => {
          console.log('VESDK catch called', error);
        })
        .finally(() => {
          console.log('VESDK finally called');
        });
    }
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={{flex: 1, marginTop: 70}}>
      <Text>TestingEditor</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openEditor('photo')}
        style={{backgroundColor: 'red', marginVertical: 10, padding: 15}}>
        <Text>Test Photo Editor SDK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openEditor('video')}
        style={{backgroundColor: 'yellow', marginVertical: 10, padding: 15}}>
        <Text>Test Video Editor SDK</Text>
      </TouchableOpacity>
      <Image
        source={{uri: getImageAfterEditing}}
        style={{width: 200, height: 200}}
      />
    </View>
  );
}
