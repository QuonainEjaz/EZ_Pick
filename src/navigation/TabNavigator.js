import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import {HomeIcon, FocusedHomeIcon} from '../assets/Icons/svg/HomeIcons';
import Login from '../screens/LoginScreens/Login';
import Forget_Password from '../screens/LoginScreens/Forget_Password';
// import NotificationScreen from '../screens/Notification/NotificationScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({label, focused}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FEF6E6',
          marginBottom: 5,
          height: 30,
          borderRadius: 15,
        }}>
        {focused ? (
          <FocusedHomeIcon width={32} height={32} />
        ) : (
          <HomeIcon width={24} height={24} />
        )}
      </View>
      <Text
        style={{
          color: focused ? '#FFA500' : '#808080',
          fontSize: 12,
          width: 30,
        }}>
        {label}
      </Text>
    </View>
  );
};

const CustomHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          justifyContent: 'center',
          width: '90%',
        }}>
        <TouchableOpacity
          style={{
            width: '38%',
            height: '60%',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/Logo/whetstonezLogo.png')}
            style={{width: '100%'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TabNavigator = () => {
  const [headerShow, setHeaderShow] = React.useState(true);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: headerShow,
        header: () => <CustomHeader />,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 130,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Login" focused={focused} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Forget_Password"
        component={Forget_Password}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Forget_Password" focused={focused} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Forget_Password"
        component={Forget_Password}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Forget_Password" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Forget_Password"
        component={Forget_Password}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Forget_Password" focused={focused} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
