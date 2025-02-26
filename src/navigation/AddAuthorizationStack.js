import React from 'react';
import CustomHeader from '../components/CustomHeader';
import AuthorizedPickupList from '../screens/AddAuthorization/AuthorizedPickupList';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AddAuthorizationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthorizedPickupList"
      screenOptions={({route}) => ({
        header: () => <CustomHeader screen={route.name} />,
      })}>
      <Stack.Screen name="AuthorizedPickupList" component={AuthorizedPickupList} />
    </Stack.Navigator>
  );
};

export default AddAuthorizationStack;
