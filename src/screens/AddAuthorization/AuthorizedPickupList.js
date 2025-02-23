import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AuthorizedPickupList = ({ onAddNew = () => {} }) => {
  const pickupList = [
    {
      id: 1,
      name: 'Zayd al-Masri',
      role: 'Driver',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile.png'
    },
    {
      id: 2, 
      name: 'Rami al-Jabari',
      role: 'Brother',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-5.png'
    },
    {
      id: 3,
      name: 'Khalid al-Jameel',
      role: 'Uncle',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-9.png'
    },
    {
      id: 4,
      name: 'Tariq al-Nasr',
      role: 'Guardian',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-13.png'
    }
  ];

  const renderPickupItem = (item) => (
    <View key={item.id} style={styles.pickupItem}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.roleText}>{item.role}</Text>
      </View>
      <TouchableOpacity style={styles.optionsButton}>
        <View style={styles.optionsCircle}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/frame-11.png' }}
            style={styles.optionsIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Authorized Pickup</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listContainer}>
          {pickupList.map(renderPickupItem)}
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddNew}
      >
        <Text style={styles.addButtonText}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthorizedPickupList;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    paddingVertical: 12,
  },
  scrollView: {
    flexGrow: 1,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
  },
  pickupItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 74,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    gap: 5,
  },
  nameText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  roleText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  optionsButton: {
    width: 26,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F8F8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIcon: {
    width: 3.11,
    height: 14,
  },
  addButton: {
    backgroundColor: '#F8AC16',
    borderRadius: 6,
    padding: 16,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

