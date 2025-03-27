import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationDetail = ({ route }) => {
  const { title, message } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // Hide scroll indicator
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24, // Improve readability
  },
});

export default NotificationDetail;