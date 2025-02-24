import React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import CustomHeader from '../components/CustomHeader';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        header: () => <CustomHeader name={route.name} screen={'HomeScreen'} />,
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;