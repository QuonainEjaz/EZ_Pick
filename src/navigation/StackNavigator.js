import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SplashScreen_2 from '../screens/splashScreen/SplashScreen_2';
import SplashScreen_3 from '../screens/splashScreen/SplashScreen_3';
import Login from '../screens/LoginScreens/Login';
import Forget_Password from '../screens/LoginScreens/Forget_Password';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SplashScreen_2" component={SplashScreen_2} />
      <Stack.Screen name="SplashScreen_3" component={SplashScreen_3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forget_Password" component={Forget_Password} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
