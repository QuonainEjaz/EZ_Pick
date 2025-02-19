import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
const {width, height} = Dimensions.get('window');

const SplashScreen_2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/pics/splashScreen2pic.jpg')}
        resizeMode="cover"
        style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1.5}} />
        <View style={[styles.View, {width: width * 0.8}]}>
          <Heading
            title="Welcome to EZpick"
            boxStyle={{}}
            textstyle={[styles.text, {width: width * 0.6}]}
          />
          <SubHeading
            text={'Lorem ipsum dolor sit amet consectetur. Faucibus.'}
            style={{fontSize: 16, lineHeight: 24, marginBottom: 20}}
          />
          <TouchableOpacity onPress={() => {navigation.navigate('SplashScreen_3');}}>
            <Image
              resizeMode="contain"
              style={[styles.icon, {width: width * 0.15, height: width * 0.15}]}
              source={require('../../assets/pics/splashScreen2icon.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    lineHeight: 40,
    color: '#212529',
    marginBottom: 20,
  },
});

export default SplashScreen_2;
