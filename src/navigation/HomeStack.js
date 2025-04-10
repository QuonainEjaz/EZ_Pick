import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import StudentListScreen from '../screens/Home/StudentListScreen';
import GuardScreen from '../screens/Home/GuardScreen';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        header: () => <CustomHeader name={route.name} screen={'HomeScreen'} />,
        animationEnabled: false,
      })}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StudentListScreen" component={StudentListScreen} />
      <Stack.Screen name="GuardScreen" component={GuardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
