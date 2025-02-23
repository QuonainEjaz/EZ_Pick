import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import CustomLink from '../../components/CustomLink';

const PickupDetails = ({ style, pickupData = {} }) => {
  const defaultPickupData = {
    name: 'Khalid al-Jameel',
    relation: 'Uncle',
    idNumber: '545135',
    cellNo: '02 Jan 2024',
    vehicleNo: 'SA-5715B',
    profileImage: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-20.png',
    assignedKids: [
      {
        name: 'Jabir bin Hayan',
        image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/kid-1-im.png'
      },
      {
        name: 'Ali bin Abi Talib',
        image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/kid-2-im.png'
      }
    ],
    ...pickupData
  };

  return (
    <ScrollView style={[styles.container, style]}>
      {/* Back Navigation */}
      <View style={styles.header}>
        <CustomLink title="Back" touchStyle={styles.backButton} textStyle={styles.backText} />
        <Heading title="Pickup Details" textstyle={styles.headerTitle} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: defaultPickupData.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <SubHeading text={defaultPickupData.name} style={styles.profileName} />
          <SubHeading text={defaultPickupData.relation} style={styles.profileRelation} />
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <SubHeading text="Authorized Pickup Details" style={styles.detailsTitle} />
          <TouchableOpacity style={styles.editButton}>
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/edit-edi.png' }}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContent}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="Relation" style={styles.label} />
              <SubHeading text={defaultPickupData.relation} style={styles.value} />
            </View>
            <View style={styles.detailsColumn}>
              <SubHeading text="Name" style={styles.label} />
              <SubHeading text={defaultPickupData.name} style={styles.value} />
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="ID Number" style={styles.label} />
              <SubHeading text={defaultPickupData.idNumber} style={styles.value} />
            </View>
            <View style={styles.detailsColumn}>
              <SubHeading text="Cell No" style={styles.label} />
              <SubHeading text={defaultPickupData.cellNo} style={styles.value} />
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="Vehicle #" style={styles.label} />
              <SubHeading text={defaultPickupData.vehicleNo} style={styles.value} />
            </View>
          </View>
        </View>
      </View>

      {/* Assigned Kids Section */}
      <View style={styles.assignedKidsContainer}>
        <SubHeading text="Assigned Kids" style={styles.assignedKidsTitle} />
        <View style={styles.kidsRow}>
          {defaultPickupData.assignedKids.map((kid, index) => (
            <View key={index} style={styles.kidCard}>
              <TouchableOpacity style={styles.removeKidButton}>
                <Image 
                  source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/interfac-4.png' }}
                  style={styles.removeIcon}
                />
              </TouchableOpacity>
              <Image 
                source={{ uri: kid.image }}
                style={styles.kidImage}
              />
              <SubHeading text={kid.name} style={styles.kidName} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.qrContainer}>
        <View style={styles.qrContent}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/qr.png' }}
            style={styles.qrCode}
          />
          <SubHeading text="Scan QR Code" style={styles.qrText} />
          <CustomButton title="Copy" touchStyle={styles.copyButton} textStyle={styles.copyButtonText} />
        </View>
        <View style={styles.shareContainer}>
          <CustomButton title="Share" touchStyle={styles.shareButton} textStyle={styles.shareText} />
          <CustomButton title="Save" touchStyle={styles.saveButton} textStyle={styles.saveButtonText} />
          <TouchableOpacity style={styles.viewButton}>
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/iconex-l.png' }}
              style={styles.viewIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PickupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 7,
    height: 12,
  },
  backText: {
    marginLeft: 13,
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
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  profileInfo: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  profileRelation: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  detailsTitle: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  editButton: {
    padding: 4,
    backgroundColor: '#f8f8f9',
    borderRadius: 2.8,
  },
  editIcon: {
    width: 19.6,
    height: 19.6,
  },
  detailsContent: {
    marginTop: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsColumn: {
    flex: 1,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
  },
  assignedKidsContainer: {
    marginVertical: 10,
  },
  assignedKidsTitle: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 6,
  },
  kidsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f9',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  kidCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 98,
  },
  removeKidButton: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  kidImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  kidName: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    marginTop: 6,
  },
  qrContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f9',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginVertical: 10,
  },
  qrContent: {
    alignItems: 'center',
    flex: 1,
  },
  qrCode: {
    width: 99,
    height: 99,
  },
  qrText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '600',
    color: '#212529',
    marginVertical: 6,
  },
  copyButton: {
    backgroundColor: '#212529',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
  },
  copyButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#feefd2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8ac16',
    paddingVertical: 4,
    paddingHorizontal: 22,
    marginRight: 6,
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  shareText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#f8ac16',
    lineHeight: 28,
  },
  saveButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
    marginRight: 6,
  },
  saveButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  viewButton: {
    backgroundColor: '#e3e3e3',
    borderRadius: 6,
    padding: 4,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    width: 24,
    height: 24,
  },
});