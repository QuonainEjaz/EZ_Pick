/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';

TrackPlayer.registerPlaybackService(() => {
  return async () => {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
  };
});
AppRegistry.registerComponent(appName, () => App);
