import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import StudentUploadScreen from '../screens/Home/StudentUploadScreen';
import StudentListScreen from '../screens/Home/StudentListScreen';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        header: () => <CustomHeader name={route.name} screen={'HomeScreen'} />,
      })}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="StudentUploadScreen"
        component={StudentUploadScreen}
      />
      <Stack.Screen name="StudentListScreen" component={StudentListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
