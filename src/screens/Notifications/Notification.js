import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SectionList, RefreshControl,
  StyleSheet, Image, ActivityIndicator, ToastAndroid
} from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, isToday, isYesterday, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Set_Notifications } from '../../store/App/action';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';

const fetchNotifications = async ({
  dispatch, baseUrl, userId, oldNotifications,
  setLoading, setRefreshing
}) => {
  setLoading(true); setRefreshing(true);
  try {
    const { data } = await axios.get(`${baseUrl}/notifications/parents/${userId}`);
    const list = Array.isArray(data.notifications) ? data.notifications : [];
    list.length === oldNotifications.length
      ? ToastAndroid.showWithGravity('No new notifications!', ToastAndroid.LONG, ToastAndroid.CENTER)
      : dispatch(Set_Notifications(list));
  } catch (err) {
    console.error('Error fetching notifications:', err);
    dispatch(Set_Notifications([]));
  } finally {
    setLoading(false); setRefreshing(false);
  }
};

const processNotifications = (list) => {
  if (!Array.isArray(list)) return [];
  return list
    .sort((a, b) => new Date(b.dateTime ?? b.createdAt) - new Date(a.dateTime ?? a.createdAt))
    .reduce((acc, notif) => {
      const date = parseISO(notif.dateTime ?? notif.createdAt);
      const key = isToday(date)
        ? 'Today'
        : isYesterday(date)
        ? 'Yesterday'
        : format(date, 'MMMM d, yyyy');
      acc[key] = acc[key] ? [...acc[key], notif] : [notif];
      return acc;
    }, {});
};

const NotificationItem = ({ imageUrl, title, message }) => {
  const nav = useNavigation();
  const [showFull, setShowFull] = useState(false);
  const [textLong, setTextLong] = useState(false);

  const handleSeeMore = () => nav.navigate('NotificationDetail', { title, message });
  const onTextLayout = (e) => {
    if (e.nativeEvent.lines.length > 2) setTextLong(true);
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        {imageUrl && imageUrl !== 'null' && (
          <Image source={{ uri: imageUrl }} style={styles.notificationImage} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Heading title={title} boxStyle={styles.titleBox} textstyle={styles.title} />
        <Text
          style={styles.description}
          numberOfLines={showFull ? undefined : 2}
          onTextLayout={onTextLayout}
        >
          {message}
        </Text>
        {textLong && !showFull && (
          <TouchableOpacity onPress={handleSeeMore}>
            <Text style={styles.seeMoreText}>...see more</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const NotificationList = () => {
  const dispatch = useDispatch();
  const baseUrl = useSelector(s => s.students.baseUrl);
  const userId = 1000001;
  const notifications = useSelector(s => s.students.notifications) || [];

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = () => {
    fetchNotifications({
      dispatch, baseUrl, userId,
      oldNotifications: notifications,
      setLoading, setRefreshing
    });
  };

  useEffect(loadData, [dispatch, baseUrl, userId]);

  const sections = Object.entries(processNotifications(notifications)).map(([t, data]) => ({ title: t, data }));

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="larger" color="#F8AC16" style={styles.loader} />
      ) : (
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          keyExtractor={(item, i) => item.id?.toString() || i.toString()}
          renderItem={({ item }) => <NotificationItem {...item} />}
          renderSectionHeader={({ section: { title } }) => <SubHeading text={title} style={[styles.dateText, { marginTop: 20 }]} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <SubHeading text="No notifications found" style={styles.emptyText} />
            </View>
          }
        />
      )}
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dateText: { fontSize: 16, fontWeight: '900', color: '#6F767E', marginBottom: 5 },
  notificationItem: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8,
    padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#f8f8f9'
  },
  iconContainer: {
    width: 50, height: 50, backgroundColor: '#FEF6E6',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center'
  },
  notificationImage: { width: 49, height: 49, borderRadius: 12},
  textContainer: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  titleBox: { alignItems: 'flex-start', textAlign: 'center' },
  title: { fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 4 },
  description: { fontSize: 13, color: '#6c757d' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  emptyText: { fontSize: 16, color: '#6c757d' },
  seeMoreText: { color: '#F8AC16', fontSize: 13, marginTop: 4 }
});
