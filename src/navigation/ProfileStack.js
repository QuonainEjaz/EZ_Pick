import React from 'react';
import CustomHeader from '../components/CustomHeader';
import Profile from '../screens/Profile/Profile';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={({route}) => ({
        header: () => <CustomHeader screen={route.name} />,
      })}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
