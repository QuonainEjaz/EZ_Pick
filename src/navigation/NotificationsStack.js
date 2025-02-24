import React from 'react';
import CustomHeader from '../components/CustomHeader';
import Notification from '../screens/Notifications/Notification';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen" screenOptions={({ route }) => ({
        header: () => <CustomHeader screen={route.name} />,
      })}>
      <Stack.Screen name="NotificationScreen" component={Notification} />
    </Stack.Navigator>
  );
};

export default NotificationsStack;