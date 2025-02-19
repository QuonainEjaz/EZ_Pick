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
import CustomButton from '../../components/CustomButton';
const {width, height} = Dimensions.get('window');

const SplashScreen_3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/pics/splashScreen3pic.jpg')}
        resizeMode="cover"
        style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1.5}} />
        <View style={[styles.View, {width: width * 0.8}]}>
          <Heading
            title="Lorem ipsum dolor sit  consectetur. Laoreet."
            boxStyle={{}}
            textstyle={[styles.text, {width: width * 0.8}]}
          />
          <SubHeading
            text={'Lorem ipsum dolor sit amet consectetur. Faucibus.'}
            style={{fontSize: 16, lineHeight: 24, marginBottom: 20}}
          />

          <CustomButton
            title="Get Started"
            touchStyle={{width: width * 0.9}}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
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
    marginBottom: 10,
  },
});

export default SplashScreen_3;
