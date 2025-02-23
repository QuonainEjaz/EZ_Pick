import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const defaultProps = {
  initialData: {
    relation: 'Driver',
    name: 'Khalid al-Jameel',
    idNumber: '545135',
    cellNo: '+966 123 456 7890',
    vehicleNo: 'SA-5715B',
  },
  assignedKids: [
    {
      id: 1,
      name: 'Jabir bin Hayan',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/kid-imag.png'
    },
    {
      id: 2, 
      name: 'Ali bin Abi Talib',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/kid-imag-2.png'
    }
  ],
  onSave: () => {},
  style: {}
};

const EditAuthorizedPickup = ({ 
  initialData = defaultProps.initialData,
  assignedKids = defaultProps.assignedKids,
  onSave = defaultProps.onSave,
  style = defaultProps.style 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [acknowledgement, setAcknowledgement] = useState(false);

  const handleSave = () => {
    if (acknowledgement) {
      onSave(formData);
    }
  };

  return (
    <ScrollView style={[styles.container, style]}>
      <Text style={styles.title}>Edit Authorized Pickup</Text>
      
      <View style={styles.content}>
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/image-2.png' }}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity style={styles.changePictureButton}>
            <Text style={styles.changePictureText}>Change Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relation</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={formData.relation}
                onChangeText={(text) => setFormData({...formData, relation: text})}
                placeholder="Select relation"
                placeholderTextColor="#6c757d"
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/dropdown-2.png' }}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Enter name"
                placeholderTextColor="#6c757d"
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-i-5.png' }}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ID Number</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={formData.idNumber}
                onChangeText={(text) => setFormData({...formData, idNumber: text})}
                placeholder="Enter ID number"
                placeholderTextColor="#6c757d"
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-i-6.png' }}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cell No</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={formData.cellNo}
                onChangeText={(text) => setFormData({...formData, cellNo: text})}
                placeholder="Enter cell number"
                placeholderTextColor="#6c757d"
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-i-7.png' }}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle #</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={formData.vehicleNo}
                onChangeText={(text) => setFormData({...formData, vehicleNo: text})}
                placeholder="Enter vehicle number"
                placeholderTextColor="#6c757d"
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-i-8.png' }}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.assignedKidsSection}>
            <Text style={styles.label}>Assigned Kids</Text>
            <View style={styles.kidsContainer}>
              {assignedKids.map((kid) => (
                <View key={kid.id} style={styles.kidCard}>
                  <View style={styles.kidInfo}>
                    <TouchableOpacity style={styles.removeKidButton}>
                      <Image 
                        source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/interfac.png' }}
                        style={styles.removeKidIcon}
                      />
                    </TouchableOpacity>
                    <Image 
                      source={{ uri: kid.image }}
                      style={styles.kidImage}
                    />
                    <Text style={styles.kidName}>{kid.name}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.addKidButton}>
                <Image 
                  source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/interfac-3.png' }}
                  style={styles.addKidIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.acknowledgementContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAcknowledgement(!acknowledgement)}
            >
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/componen-2.png' }}
                style={styles.checkboxIcon}
              />
            </TouchableOpacity>
            <Text style={styles.acknowledgementText}>
              I acknowledge that the information is accurate & that i am legally responsible for it.
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, !acknowledgement && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!acknowledgement}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

EditAuthorizedPickup.defaultProps = defaultProps;

export default EditAuthorizedPickup;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 24,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    width: 85,
    height: 85,
    borderRadius: 9.66,
    backgroundColor: '#fef6e6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 17.386,
  },
  profileImage: {
    width: 48.3,
    height: 48.3,
  },
  changePictureButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
    justifyContent: 'center',
  },
  changePictureText: {
    color: '#fff',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  formContainer: {
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14,
    color: '#212529',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 38,
  },
  input: {
    flex: 1,
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#6c757d',
    height: '100%',
    padding: 0,
  },
  inputIcon: {
    width: 24,
    height: 24,
  },
  assignedKidsSection: {
    gap: 6,
    marginTop: 18,
  },
  kidsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f8f8f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 8,
    minHeight: 126,
    gap: 10,
  },
  kidCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  kidInfo: {
    alignItems: 'center',
    width: 78,
    gap: 6,
  },
  removeKidButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 1,
  },
  removeKidIcon: {
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
  addKidButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 65,
    height: 65,
  },
  addKidIcon: {
    width: 45,
    height: 45,
  },
  acknowledgementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
  },
  acknowledgementText: {
    flex: 1,
    fontFamily: 'Outfit',
    fontSize: 14,
    lineHeight: 14,
    color: '#212529',
  },
  saveButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
  },
});
