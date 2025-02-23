import React from 'react';
import { View, Text, StyleSheet, Image, SectionList } from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';

const NotificationItem = ({ icon, title, description }) => (
  <View style={styles.notificationItem}>
    <View style={styles.iconContainer}>
      <Image source={{ uri: icon }} style={styles.icon} />
    </View>
    <View style={styles.textContainer}>
      <Heading title={title} textstyle={styles.title} />
      <SubHeading text={description} style={styles.description} />
    </View>
  </View>
);


const NotificationList = () => {
  const notifications = {
    TODAY: [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica.png',
        title: "Hey, the pickup's off!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-2.png',
        title: 'Awesome! Your pickup is all set!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    YESTERDAY: [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-3.png',
        title: "Here's what we've got for pickups today!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-4.png',
        title: 'Great news! Your pickup is confirmed!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    'October 2, 2024': [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-5.png',
        title: "Check out today's pickup lineup!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-6.png',
        title: "You're all set up with your account!",
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
  };

  const sectionData = Object.entries(notifications).map(([date, items]) => ({
    title: date,
    data: items,
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <NotificationItem {...item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SubHeading text={title} style={styles.dateText} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6f767e',
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f8f8f9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fef6e6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
  },
});

export default NotificationList;
