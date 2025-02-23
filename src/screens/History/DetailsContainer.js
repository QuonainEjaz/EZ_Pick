import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Heading from '../../components/Heading'; 
import SubHeading from '../../components/SubHeading';  

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
        {/* Use Heading for the title */}
        <Heading title="Details" textstyle={styles.headerTitle} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.column}>
            <SubHeading text="Student ID" style={styles.label} />
            <SubHeading text={studentId} style={styles.value} />
          </View>
          <View style={styles.column}>
            <SubHeading text="Grade" style={styles.label} />
            <SubHeading text={grade} style={styles.value} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <SubHeading text="Request by" style={styles.label} />
            <SubHeading text={requestBy} style={styles.value} />
          </View>
          <View style={styles.column}>
            <SubHeading text="Date" style={styles.label} />
            <SubHeading text={date} style={styles.value} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <SubHeading text="Request Time" style={styles.label} />
            <SubHeading text={requestTime} style={styles.value} />
          </View>
          <View style={styles.column}>
            <SubHeading text="Response" style={styles.label} />
            <SubHeading text={responseTime} style={styles.value} />
          </View>
        </View>

        <View style={styles.confirmSection}>
          <SubHeading text="Confirm Pickup" style={styles.label} />
          <SubHeading text={confirmTime} style={styles.value} />
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
