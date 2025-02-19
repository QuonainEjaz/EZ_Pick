import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';


const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('MainScreen');
        }, 2000);
      }, [navigation]);
  return (
    <View style={styles.container}>
        <Image
          source={require('../../assets/pics/splashScreen1pic.png')}
          resizeMode='contain'
          style={{width: "60%"}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212529',
  },
});

export default SplashScreen;
