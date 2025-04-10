import axios from 'axios';
   
// Add to your index.js
if (__DEV__) {
  // Intercept Axios requests
  axios.interceptors.request.use(
    config => {
      console.log(`🌐 [Axios] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    error => {
      console.error('❌ [Axios] Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  // Intercept Axios responses
  axios.interceptors.response.use(
    response => {
      console.log(`✅ [Axios] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
      return response;
    },
    error => {
      console.error(`❌ [Axios] Response Error:`, error);
      return Promise.reject(error);
    }
  );
  
  console.log('Axios logging enabled');
}

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
console.log('Debug server:', __DEV__, typeof global.originalXMLHttpRequest);

TrackPlayer.registerPlaybackService(() => {
  return async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
  };
});
AppRegistry.registerComponent(appName, () => App);
