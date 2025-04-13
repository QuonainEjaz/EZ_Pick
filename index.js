import axios from 'axios';

// Explicitly disable Flipper and use built-in debugger
if (__DEV__) {
  // Setting this will redirect to the built-in debugger instead of Flipper
  global.__REACT_NATIVE_DEBUG_ENABLED__ = true;
  
  // Enable network logging
  axios.interceptors.request.use(
    config => {
      console.log(`🔷 Network Request:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        data: config.data,
      });
      return config;
    },
    error => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    response => {
      console.log(`🟢 Network Response:`, {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    error => {
      console.error(`🔴 Response Error:`, {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );
  
  console.log('Built-in debugger mode enabled with network logging');
}

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';

// Log debug state
console.log('Debug info:', {
  dev: __DEV__,
  debugEnabled: global.__REACT_NATIVE_DEBUG_ENABLED__,
  useBuiltinDebugger: true
});

TrackPlayer.registerPlaybackService(() => {
  return async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
  };
});
AppRegistry.registerComponent(appName, () => App);
