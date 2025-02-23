import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileList = ({ childrenProfiles = [], otherPages = [] }) => {
  const children = childrenProfiles.length > 0 ? childrenProfiles : [
    {
      name: 'Jabir bin Hayan',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile.png',
    },
    {
      name: 'Ali Bin abi Talib', 
      image: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile-2.png',
    },
    {
      name: 'Umar bin Alkufi',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile-3.png',
    },
    {
      name: 'Sara al Nasr',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile-4.png',
    },
    {
      name: 'Rami al- Jabari',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile-5.png',
    }
  ];

  const pages = otherPages.length > 0 ? otherPages : [
    {
      title: 'Authorized Pickup',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon.png',
    },
    {
      title: 'Update Password',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon-2.png',
    },
    {
      title: 'Enable Smart Login',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/fi-76159.png',
    },
    {
      title: 'Language',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon-3.png',
    },
    {
      title: 'Logout',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/logout.png',
    }
  ];

  const renderListItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.listItem}>
      <Image source={{uri: item.image}} style={styles.profileImage} />
      <View style={styles.listItemContent}>
        <Text style={styles.profileName}>{item.name}</Text>
      </View>
      <Image 
        source={{uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/vuesax-o.png'}}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  const renderOtherPageItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.listItem}>
      <Image source={{uri: item.icon}} style={styles.pageIcon} />
      <View style={styles.listItemContent}>
        <Text style={styles.profileName}>{item.title}</Text>
      </View>
      <Image 
        source={{uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/vuesax-o.png'}}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Children</Text>
      {children.map(renderListItem)}
      
      <Text style={styles.sectionTitle}>Other Pages</Text>
      {pages.map(renderOtherPageItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    padding: 10,
  },
  sectionTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.08,
    color: '#212529',
    marginVertical: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 4,
  },
  pageIcon: {
    width: 24,
    height: 24,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.16,
    color: '#6c757d',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default ProfileList;

