import React from 'react';
import CustomHeader from '../components/CustomHeader';
import AuthorizedPickupList from '../screens/AddAuthorization/AuthorizedPickupList';
import AddAuthorization from '../screens/AddAuthorization/AddAuthorization';
import AuthPickupDetails from '../screens/AddAuthorization/AuthPickupDetails';
import EditAuthorizedPickup from '../screens/AddAuthorization/EditAuthorizedPickup';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AddAuthorizationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthorizedPickupList"
      screenOptions={({route, navigation}) => ({
        header: () => (
          <CustomHeader
            name={route.name}
            screen={'AuthorizedPickupList'}
            navigation={navigation}
          />
        ),
      })}>
      <Stack.Screen
        name="AuthorizedPickupList"
        component={AuthorizedPickupList}
      />
      <Stack.Screen name="AddAuthorization" component={AddAuthorization} />
      <Stack.Screen name="AuthPickupDetails" component={AuthPickupDetails} />
      <Stack.Screen name="EditAuthorizedPickup" component={EditAuthorizedPickup} />
    </Stack.Navigator>
  );
};

export default AddAuthorizationStack;
