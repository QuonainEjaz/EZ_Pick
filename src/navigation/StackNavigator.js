import React, {useEffect} from 'react';
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
import EditAuthorizedPickup from '../screens/AddAuthorization/EditAuthorizedPickup';
import AddAuthorizedPickup from '../screens/AddAuthorization/AddAuthorization';
import StudentPickupCard from '../screens/AddAuthorization/StudentPickupCard';
import ProfileDetail from '../screens/Profile/ProfileDetail';
import UpdatePassword from '../screens/Profile/UpdatePassword';
import LanguageSelection from '../screens/Profile/LanguageSelection';
import AuthorizedPickupList from '../screens/AddAuthorization/AuthorizedPickupList';
import AddAuthorization from '../screens/AddAuthorization/AddAuthorization';
import AuthPickupDetails from '../screens/AddAuthorization/AuthPickupDetails';
import NotificationDetail from '../screens/Notifications/NotificationDetail';
import {useNavigationState} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const navState = useNavigationState(state => state);

  useEffect(() => {
    const {routes = [], index} = navState || {};
    const currentScreen = routes[index]?.name || 'Unknown';
    const previousScreen = routes[index - 1]?.name || 'None';

    console.log(
      '===== STACK NAVIGATION HISTORY =====\n' +
        `Current Screen: ${currentScreen}\n` +
        `Previous Screen: ${previousScreen}\n` +
        'Full Navigation Stack:',
    );

    // Display all screens in the navigation stack
    routes.forEach((route, idx) => {
      console.log(`${idx}: ${route.name}`);

      // If this is the TabNavigator, show its screens
      if (route.name === 'TabNavigator' && route.state) {
        const tabRoutes = route.state.routes || [];
        const tabIndex = route.state.index || 0;
        console.log(`  Active tab: ${tabRoutes[tabIndex]?.name || 'Unknown'}`);

        // Show the active screen in the current tab
        const currentTabState = tabRoutes[tabIndex]?.state;
        if (currentTabState) {
          const tabScreenRoutes = currentTabState.routes || [];
          const tabScreenIndex = currentTabState.index || 0;
          console.log(
            `  Active screen in ${tabRoutes[tabIndex]?.name}: ${
              tabScreenRoutes[tabScreenIndex]?.name || 'Unknown'
            }`,
          );

          // Show all screens in the current tab
          console.log(`  Screens in ${tabRoutes[tabIndex]?.name}:`);
          tabScreenRoutes.forEach((tabScreenRoute, tabScreenRouteIndex) => {
            console.log(`    ${tabScreenRouteIndex}: ${tabScreenRoute.name}`);
          });
        }
      }
    });

    console.log('=============================');
  }, [navState]);

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        detachInactiveScreens: true,
        animationEnabled: false,
        gestureEnabled: false,
      }}>
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
          detachPreviousScreen: true,
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
      <Stack.Screen
        name="AuthorizedPickupList"
        component={AuthorizedPickupList}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'AuthorizedPickupList'}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddAuthorization"
        component={AddAuthorization}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'AddAuthorization'}
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
        name="NotificationDetail"
        component={NotificationDetail}
        options={({route, navigation}) => ({
          headerShown: true,

          header: () => (
            <CustomHeader
              name={route.name}
              screen={'NotificationDetail'}
              navigation={navigation}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
