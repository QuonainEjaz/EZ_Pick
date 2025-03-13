import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, SectionList, RefreshControl, StyleSheet,Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, isToday, isYesterday, format } from 'date-fns';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import { Set_Notifications } from '../../store/App/action';
import NotificationScreenIcons from '../../assets/Icons/svg/NotificationScreenIcons';     

const fetchNotifications = async (dispatch, baseUrl, userId, setRefreshing) => {
  setRefreshing(true);
  try {
    const { data } = await axios.get(`${baseUrl}/notifications/parents/${userId}`);
    dispatch(Set_Notifications(Array.isArray(data.notifications) ? data.notifications : []));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    dispatch(Set_Notifications([]));
  } finally {
    setRefreshing(false);
  }
};

const processNotifications = (notifications) => {
  if (!Array.isArray(notifications)) return [];
  return notifications
    .sort((a, b) => new Date(b.dateTime ?? b.createdAt) - new Date(a.dateTime ?? a.createdAt))
    .reduce((acc, notif) => {
      const date = parseISO(notif.dateTime ?? notif.createdAt);
      const title = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMMM d, yyyy');
      acc[title] = acc[title] ? [...acc[title], notif] : [notif];
      return acc;
    }, {});
};

const NotificationItem = ({ imageUrl, title, message }) => (
  <View style={styles.notificationItem}>
    <View style={styles.iconContainer}>
      {imageUrl && imageUrl !== "null" ? (
        <Image source={{ uri: imageUrl }} style={styles.notificationImage} />
      ) : null}
    </View>
    <View style={styles.textContainer}>
      <Heading title={title} boxStyle={styles.titleBox} textstyle={styles.title} />
      <SubHeading text={message} style={styles.description} />
    </View>
  </View>
);

const NotificationList = () => {
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.students.baseUrl);
  const userId = 1000842;
  const notifications = useSelector((state) => state.students.notifications) || [];
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications(dispatch, baseUrl, userId, setRefreshing);
  }, [dispatch, baseUrl, userId]);

  const sections = Object.entries(processNotifications(notifications)).map(([title, data]) => ({ title, data }));

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => <NotificationItem {...item} />}
        renderSectionHeader={({ section: { title } }) => <SubHeading text={title} style={styles.dateText} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchNotifications(dispatch, baseUrl, userId, setRefreshing)} />}
        ListEmptyComponent={<View style={styles.emptyContainer}><SubHeading text="No notifications found" style={styles.emptyText} /></View>}
      />
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  dateText: { fontSize: 14, fontWeight: '700', color: '#6F767E', marginBottom: 5 },
  notificationItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#f8f8f9' },
  iconContainer: { width: 50, height: 50, backgroundColor: '#FEF6E6', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  notificationImage: { width: 25, height: 25 },
  textContainer: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  titleBox: { alignItems: 'flex-start', textAlign: 'center' },
  title: { fontSize: 15, fontWeight: '700', color: '#212529', marginBottom: 4 },
  description: { fontSize: 13, color: '#6c757d' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  emptyText: { fontSize: 16, color: '#6c757d' },
});
