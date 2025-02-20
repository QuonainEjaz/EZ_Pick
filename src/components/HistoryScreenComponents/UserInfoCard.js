import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Heading from '../Heading';
import SubHeading from '../SubHeading';
import CustomButton from '../CustomButton';

const UserInfoCard = ({ name, dateTime, status, imageSource }) => {
  const { width } = useWindowDimensions();
  const imageSize = width * 0.12;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={[styles.image, { width: imageSize, height: imageSize }]} />
      <View style={styles.textContainer}>
        <Heading title={name} textstyle={styles.heading} />
        <SubHeading text={dateTime} style={styles.subHeading} />
      </View>
      <CustomButton title={status} touchStyle={styles.button} textStyle={styles.buttonText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'left',
    color: '#6C757D',
  },
  button: {
    backgroundColor: '#F8E1A1',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#D48C00',
    fontWeight: '600',
  },
});

export default UserInfoCard;
