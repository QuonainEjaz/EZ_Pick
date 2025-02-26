import React from 'react';
import CustomHeader from '../components/CustomHeader';
import History from '../screens/History/History';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryScreen" screenOptions={({ route, navigation }) => ({
        header: () => <CustomHeader name={route.name} screen={'History'} navigation={navigation} />,
      })}>
      <Stack.Screen name="HistoryScreen" component={History} />
    </Stack.Navigator>
  );  
};

export default HistoryStack;