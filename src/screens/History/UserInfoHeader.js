import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Heading from '../../components/Heading'; // Import Heading component
import SubHeading from '../../components/SubHeading'; // Import SubHeading component

const UserInfoHeader = ({
  userName = "Umar bin Alkufi",
  dateTime = "02 Jan 2024, 12:38PM",
  status = "Picked",
  profileImage = "https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/profile.png"
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Profile Image */}
      <Image 
        source={{ uri: profileImage }} 
        style={styles.profileImage}
        resizeMode="cover"
      />
      
      {/* Text Container */}
      <View style={styles.textContainer}>
        {/* Using SubHeading for user name */}
        <Heading title={userName} textstyle={styles.userName} />
        {/* Using SubHeading for date/time */}
        <SubHeading text={dateTime} style={styles.dateTime} />
      </View>
      
      {/* Status Container */}
      <View style={styles.statusContainer}>
        {/* Using SubHeading for status text */}
        <SubHeading text={status} style={styles.statusText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    minWidth: 320,
    minHeight: 74,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
    gap: 5,
  },
  userName: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  dateTime: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  statusContainer: {
    backgroundColor: '#FEF6E6',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 14,
  },
  statusText: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8AC16',
  },
});

export default UserInfoHeader;
