import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import CustomButton from '../../components/CustomButton';

const {width} = Dimensions.get('window');

const StudentUploadCard = ({student, onPress, image}) => {
  const pickupTime = student?.grade?.offTime;
  const convertTo12HourFormat = pickupTime => {
    const [hours, minutes] = pickupTime.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    // Use toLocaleTimeString to format the time with AM/PM
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedTime;
  };
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.grade}>Grade {student?.grade?.name}</Text>
          <Text
            style={
              styles.pickupTime
            }>{`Today's Pick up time: ${convertTo12HourFormat(pickupTime)}`}</Text>
        </View>
      </View>
      <CustomButton
        title="Upload Picture"
        touchStyle={styles.uploadButton}
        textStyle={styles.uploadButtonText}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 8,
    backgroundColor: '#E3E3E3',
  },
  detailsContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    color: '#212529',
  },
  grade: {
    fontSize: width * 0.04,
    color: '#6c757d',
    marginBottom: 4,
  },
  pickupTime: {
    fontSize: width * 0.035,
    color: '#6c757d',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#F8AC16',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#F8AC16',
    fontWeight: 'bold',
  },
});

export default StudentUploadCard;
