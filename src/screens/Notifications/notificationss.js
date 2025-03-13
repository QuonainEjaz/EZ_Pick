import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Constants = {
  productionUrl: 'https://api.ezpick.co',
  stagingUrl: 'https://v1-backend.ezpick.org',

  get baseUrl() {
    return `${this.productionUrl}/`;
  },

  get socketIP() {
    return this.productionUrl;
  },

  didReceiveRemoteNotification: 'didReceiveRemoteNotification',
  willRefreshStudents: 'willRefreshStudents',

  setItem: async (key, value) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  },

  getItem: async (key, isJSON = false) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return isJSON && value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  },

  get disableSmartLogin() {
    return Constants.getItem('disable_smart_login').then((val) => val === 'true');
  },
  set disableSmartLogin(value) {
    Constants.setItem('disable_smart_login', value.toString());
  },

  get isSocialUser() {
    return Constants.getItem('social_user').then((val) => val === 'true');
  },
  set isSocialUser(value) {
    Constants.setItem('social_user', value.toString());
  },

  get userId() {
    return Constants.getItem('user_id').then((val) => Number(val) || 0);
  },
  set userId(value) {
    Constants.setItem('user_id', value.toString());
  },

  get deviceToken() {
    return Constants.getItem('device_token').then((val) => val || '');
  },
  set deviceToken(value) {
    Constants.setItem('device_token', value);
  },

  get accessToken() {
    return Constants.getItem('api_token').then((val) => val || '');
  },
  set accessToken(value) {
    Constants.setItem('api_token', value);
  },
};

// Notification Worker
const NotificationWorker = {
  getParentNotifications: async () => {
    try {
      const response = await axios.get(`${Constants.baseUrl}notifications/parents/${Constants.userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, message: error.message };
    }
  },
};

// Notification Cell Component
const NotificationCell = ({ notification }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cellContainer}>
      <Image source={{ uri: notification.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.date}>{new Date(notification.dateTime).toLocaleString()}</Text>
        <Button
          title="View Details"
          onPress={() => navigation.navigate('NotificationDetail', { notification })}
        />
      </View>
    </View>
  );
};

// Notification Detail Screen
const NotificationDetailScreen = ({ route }) => {
  const { notification } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    animateView();
  }, []);

  const animateView = () => {
    // Add your animation logic here
  };

  return (
    <View style={styles.container}>
      <Button
        title="Back"
        onPress={() => navigation.goBack()}
        style={styles.btnBack}
      />
      <Image source={{ uri: notification.imageUrl }} style={styles.imgPhoto} />
      <Text style={styles.lblTitle}>{notification.title}</Text>
      <Text style={styles.lblMessage}>{notification.message}</Text>
      <Text style={styles.lblDate}>{new Date(notification.dateTime).toLocaleString()}</Text>
    </View>
  );
};

// Notification Screen
const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    setRefreshing(true);
    const response = await NotificationWorker.getParentNotifications();
    if (response.success) {
      setNotifications(response.notifications);
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCell notification={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllNotifications} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cellContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  btnBack: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  imgPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  lblTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lblMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  lblDate: {
    fontSize: 14,
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationScreen;