import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SplashScreen_2 from '../screens/splashScreen/SplashScreen_2';
import SplashScreen_3 from '../screens/splashScreen/SplashScreen_3';
import Login from '../screens/LoginScreens/Login';
import Forget_Password from '../screens/LoginScreens/Forget_Password';
import TabNavigator from './TabNavigator';
import StudentUploadScreen from '../screens/Home/StudentUploadScreen';
import CustomHeader from '../components/CustomHeader';
import PickupDetails from '../screens/History/PickupDetails';
import AuthPickupDetails from '../screens/AddAuthorization/AuthPickupDetails';
import EditAuthorizedPickup from '../screens/AddAuthorization/EditAuthorizedPickup';
import AddAuthorizedPickup from '../screens/AddAuthorization/AddAuthorization';
import StudentPickupCard from '../screens/AddAuthorization/StudentPickupCard';
import ShareOptions from '../screens/AddAuthorization/ShareOptions';
import ProfileDetail from '../screens/Profile/ProfileDetail';
import UpdatePassword from '../screens/Profile/UpdatePassword';
import LanguageSelection from '../screens/Profile/LanguageSelection';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SplashScreen_2" component={SplashScreen_2} />
      <Stack.Screen name="SplashScreen_3" component={SplashScreen_3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forget_Password" component={Forget_Password} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="StudentUploadScreen"
        component={StudentUploadScreen}
        options={({route}) => ({
          headerShown: true,
          header: () => (
            <CustomHeader name={route.name} screen={'HomeScreen'} />
          ),
        })}
      />
      <Stack.Screen
        name="PickupDetails"
        component={PickupDetails}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'History'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AuthPickupDetails"
        component={AuthPickupDetails}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'AuthPickupDetails'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditAuthorizedPickup"
        component={EditAuthorizedPickup}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'EditAuthorizedPickup'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddAuthorizedPickup"
        component={AddAuthorizedPickup}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'AddAuthorizedPickup'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="StudentPickupCard"
        component={StudentPickupCard}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'StudentPickupCard'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ShareOptions"
        component={ShareOptions}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'ShareOptions'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'ProfileDetail'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'UpdatePassword'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelection}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'LanguageSelection'}
              navigation={navigation}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
