import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const SplashScreen = () => {
  const handleBiometricAuthentication = async () => {
    try {
      const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable();
  
      console.log('Biometry type:', biometryType); // Log the biometry type (e.g., fingerprint, face)
  
      if (available) {
        // Trigger biometric authentication
        const { success, error } = await ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Login using fingerprint or face recognition',
        });
  
        if (success) {
          Alert.alert('Authentication Successful');
          // Perform the login logic here
        } else {
          Alert.alert('Authentication Failed');
        }
      } else {
        Alert.alert('Biometric authentication is not available on this device.');
      }
    } catch (error) {
      console.error('Error during biometric authentication', error);
      Alert.alert('Error', error.message);
    }
  };
  handleBiometricAuthentication();
  
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}> Splash Screen </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  },
})

export default SplashScreen;


// import React, {useEffect} from 'react';
// import {View, StyleSheet, Image} from 'react-native';


// const SplashScreen = ({navigation}) => {
//     useEffect(() => {
//         setTimeout(() => {
//           navigation.replace('SplashScreen_2');
//         }, 2000);
//       }, [navigation]);
//   return (
//     <View style={styles.container}>
//         <Image
//           source={require('../../assets/pics/splashScreen1pic.png')}
//           resizeMode='contain'
//           style={{width: "60%"}}
//         />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#212529',
//   },
// });

// export default SplashScreen;
