import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserInfoHeader = ({
  userName = "Umar bin Alkufi",
  dateTime = "02 Jan 2024, 12:38PM",
  status = "Picked",
  profileImage = "https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/profile.png"
}) => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={{ uri: profileImage }} 
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
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

