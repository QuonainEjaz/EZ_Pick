import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileDetail = ({
  name = "Jabir bin Hayan",
  arabicName = "جابر بن حيان",
  studentId = "ST-515656",
  grade = "6A",
  gender = "Male",
  email = "jabir@whetstonez.com",
  profileImage = "https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/profile-6.png"
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image 
            source={{uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon-arr.png'}}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image 
          source={{uri: profileImage}}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <Image 
            source={{uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/edit-edi.png'}}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsHeaderText}>Student Details</Text>
        </View>
        
        <View style={styles.detailsContent}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Arabic Name</Text>
              <Text style={styles.value}>{arabicName}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Student ID</Text>
              <Text style={styles.value}>{studentId}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Grade</Text>
              <Text style={styles.value}>{grade}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{gender}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Student Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    width: 7,
    height: 12,
  },
  backText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    letterSpacing: 0.14,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginLeft: -45,
  },
  profileImageContainer: {
    position: 'relative',
    width: '100%',
    height: 440,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
  },
  editButton: {
    position: 'absolute',
    top: 23,
    right: 20,
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 3.3,
    borderWidth: 1,
    borderColor: '#f8ac16',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  detailsContainer: {
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  detailsHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingBottom: 6,
  },
  detailsHeaderText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  detailsContent: {
    padding: 12,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
  },
});

export default ProfileDetail;

