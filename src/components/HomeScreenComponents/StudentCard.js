import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const StudentCard = ({ student = {
  name: "Jabir bin Hayan Albarsi",
  grade: "Grade 7th",
  pickupTime: "12:30 PM",
  image: "https://dashboard.codeparrot.ai/api/image/Z7W8qDO_YEiK217K/student-4.png",
  outOfRange: true,
  timer: {
    hours: "01",
    minutes: "00",
    seconds: "00"
  }
}}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>You are out of Range:</Text>
        <View style={styles.timerContainer}>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.hours}</Text>
            <Text style={styles.unitLabel}>Hrs</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.minutes}</Text>
            <Text style={styles.unitLabel}>Mins</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.seconds}</Text>
            <Text style={styles.unitLabel}>Secs</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Image 
          source={{ uri: student.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.grade}>{student.grade}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text style={styles.pickupTimeLabel}>Today's Pick up time:</Text>
            <Text style={styles.pickupTime}>{student.pickupTime}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, student.outOfRange && styles.buttonDisabled]}
        disabled={student.outOfRange}
      >
        <Text style={[styles.buttonText, student.outOfRange && styles.buttonTextDisabled]}>
          Pickup Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    minWidth: 300,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#212529',
    textTransform: 'uppercase',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 4,
  },
  timeUnit: {
    width: 40,
    alignItems: 'center',
    padding: 2,
    borderRadius: 4,
  },
  timerText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#212529',
  },
  unitLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: '#6c757d',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    width: 84,
    height: 87,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    gap: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#212529',
  },
  grade: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  pickupTimeLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  pickupTime: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8ac16',
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#f8ac16',
  },
  buttonTextDisabled: {
    color: '#f8ac16',
  },
});

export default StudentCard;

