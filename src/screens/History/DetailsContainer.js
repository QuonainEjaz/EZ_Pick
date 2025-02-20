import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const DetailsContainer = ({
  studentId = "ST6562984",
  grade = "6A",
  requestBy = "Driver",
  date = "02 Jan 2024",
  requestTime = "12:30PM",
  responseTime = "12:32PM",
  confirmTime = "12:38PM"
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Student ID</Text>
            <Text style={styles.value}>{studentId}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Grade</Text>
            <Text style={styles.value}>{grade}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Request by</Text>
            <Text style={styles.value}>{requestBy}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Request Time</Text>
            <Text style={styles.value}>{requestTime}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Response</Text>
            <Text style={styles.value}>{responseTime}</Text>
          </View>
        </View>

        <View style={styles.confirmSection}>
          <Text style={styles.label}>Confirm Pickup</Text>
          <Text style={styles.value}>{confirmTime}</Text>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    maxWidth: Math.min(400, windowWidth - 40), // Responsive width with max 400
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginBottom: 14,
  },
  headerTitle: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    lineHeight: 22,
  },
  content: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    lineHeight: 18,
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
    lineHeight: 18,
  },
  confirmSection: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
});

export default DetailsContainer;
