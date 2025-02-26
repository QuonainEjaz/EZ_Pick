import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';

const UserInfoHeader = ({student}) => {
  const {name, image, date, pickupTime, status} = student;
  dateTime = [date, ', ', pickupTime];
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{uri: image}}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Heading title={name} textstyle={styles.userName} boxStyle={styles.userNameContainer}/>
        <SubHeading text={dateTime} style={styles.dateTime} />
      </View>

      <View style={styles.statusContainer}>
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
    gap: 0,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#FEF5D6',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 14,
  },
  statusText: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8AC16',
  },
});

export default UserInfoHeader;
