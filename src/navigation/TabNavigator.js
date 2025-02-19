import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/splashScreen/SplashScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        // tabBarInactiveBackgroundColor: '#fff',
        // tabBarActiveBackgroundColor: '#f0f0f0',
        tabBarStyle: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
