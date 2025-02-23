import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { HomeIcon, FocusedHomeIcon } from '../assets/Icons/svg/HomeIcons';
import { HistoryIcon, FocusedHistoryIcon } from '../assets/Icons/svg/HistoryIcons';
import { AddIcon, FocusedAddIcon } from '../assets/Icons/svg/AddIcons';
import { NotificationIcon, FocusedNotificationIcon } from '../assets/Icons/svg/NotificationIcons';
import { ProfileIcon, FocusedProfileIcon } from '../assets/Icons/svg/ProfileIcons';
import HomeNavigator from './HomeNavigator';
import HistoryNavigator from './HistoryNavigator';
import NotificationsNavigator from './NotificationsNavigator';
import ProfileNavigator from './ProfileNavigator';
import AddAuthorizationNavigator from './AddAuthorizationNavigator';


const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, FocusedIcon, Icon }) => {
  return (
    <View style={{ marginTop: 15 }}>
      {focused ? FocusedIcon : Icon}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#F8AC16',
        tabBarInactiveTintColor: '#6C757D',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginTop: 10 },
        tabBarIndicatorStyle: { backgroundColor: '#F8AC16' },
        tabBarActiveIconStyle: { opacity: 1 },
        tabBarUnselectedIconStyle: { opacity: 0.6 },
        tabBarStyle: {
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              FocusedIcon={<FocusedHomeIcon />}
              Icon={<HomeIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              FocusedIcon={<FocusedHistoryIcon />}
              Icon={<HistoryIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddAuthorizationNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              FocusedIcon={<FocusedAddIcon />}
              Icon={<AddIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              FocusedIcon={<FocusedNotificationIcon />}
              Icon={<NotificationIcon />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              FocusedIcon={<FocusedProfileIcon />}
              Icon={<ProfileIcon />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
