import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from './CustomButton';
import Heading from './Heading';
import SubHeading from './SubHeading';

const PickupDetailsComponent = ({ student, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: student.image }} style={styles.profileImage} />
        <View style={styles.details}>
          <Heading title={student.name} textstyle={styles.name} />
          <SubHeading text={`Grade ${student.grade}`} />
          <SubHeading text={`Today's Pick up time: ${student.pickupTime}`} />
        </View>
      </View>
      <CustomButton 
        title={student.requestAccepted ? 'Confirm Pickup' : 'Pickup Request'} 
        onPress={onPress} 
        touchStyle={styles.button} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    marginTop: 10,
  },
});

export default PickupDetailsComponent;
