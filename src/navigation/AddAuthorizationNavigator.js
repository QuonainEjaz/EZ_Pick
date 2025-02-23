import React from 'react';
import CustomHeader from '../components/CustomHeader';
import AddAuthorization from '../screens/AddAuthorization/AddAuthorization';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AddAuthorizationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddAuthorizationScreen" screenOptions={({ route }) => ({
        header: () => <CustomHeader screen={route.name} />,
      })}>
      <Stack.Screen name="AddAuthorizationScreen" component={AddAuthorization} />
    </Stack.Navigator>
  );
};

export default AddAuthorizationNavigator;
