import React from 'react';
import { WebView } from 'react-native-webview';
import { Metrics } from '../../theme';

const VideoPlayer = (props) => {
    return (
        <WebView
            source={{ uri: props.video }}
            style={[{
                backgroundColor: 'lightgrey',
            }, props.style]}
            {...props}
        />
    )
}

export default VideoPlayer;