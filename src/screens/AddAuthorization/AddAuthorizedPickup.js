import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import CustomModal from '../../components/CustomModal';
const AddAuthorizedPickup = ({ 
  style,
  onSave = () => {},
  onBack = () => {},
  defaultRelation = '',
  defaultName = '',
  defaultIdNumber = '',
  defaultCellNo = '',
  defaultVehicleNo = '',
  defaultSelectedKids = []
}) => {
  const [selectedKids, setSelectedKids] = useState(defaultSelectedKids.length > 0 ? defaultSelectedKids : [
    {
      id: 1,
      name: 'Jabir bin Hayan',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/rectangl.png',
      selected: false
    },
    {
      id: 2, 
      name: 'Ali bin Abi Talib',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/rectangl-6.png',
      selected: false
    },
    {
      id: 3,
      name: 'Umar bin Alkufi',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/rectangl-12.png',
      selected: false
    },
    {
      id: 4,
      name: 'Sara al-Nasr',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/rectangl-19.png',
      selected: false
    },
    {
      id: 5,
      name: 'Rami al-Jabari',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/rectangl-25.png',
      selected: false
    }
  ]);

  const [formData, setFormData] = useState({
    relation: defaultRelation,
    name: defaultName,
    idNumber: defaultIdNumber,
    cellNo: defaultCellNo,
    vehicleNo: defaultVehicleNo,
    acknowledgement: false
  });

  const handleKidSelect = (kidId) => {
    setSelectedKids(prevKids => 
      prevKids.map(kid => ({
        ...kid,
        selected: kid.id === kidId ? !kid.selected : kid.selected
      }))
    );
  };

  const handleSave = () => {
    const selectedKidIds = selectedKids.filter(kid => kid.selected).map(kid => kid.id);
    onSave({
      ...formData,
      selectedKids: selectedKidIds
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-arr.png' }}
            style={styles.backIcon}
            resizeMode="contain"
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Authorized Pickup Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add New Authorized Pickup</Text>

        <View style={styles.imageUploadContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/image.png' }}
              style={styles.uploadImage}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relation</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Select Relation"
                placeholderTextColor="#6c757d"
                value={formData.relation}
                onChangeText={(text) => setFormData({...formData, relation: text})}
              />
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/dropdown.png' }}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                placeholderTextColor="#6c757d"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ID Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter ID Number"
                placeholderTextColor="#6c757d"
                value={formData.idNumber}
                onChangeText={(text) => setFormData({...formData, idNumber: text})}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cell No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Cell Number"
                placeholderTextColor="#6c757d"
                value={formData.cellNo}
                onChangeText={(text) => setFormData({...formData, cellNo: text})}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle #</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Vehicle Number"
                placeholderTextColor="#6c757d"
                value={formData.vehicleNo}
                onChangeText={(text) => setFormData({...formData, vehicleNo: text})}
              />
            </View>
          </View>

          <Text style={styles.label}>Select Kids</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.kidsScrollContainer}
          >
            <View style={styles.kidsContainer}>
              {selectedKids.map((kid) => (
                <TouchableOpacity 
                  key={kid.id}
                  style={[styles.kidCard, kid.selected && styles.kidCardSelected]}
                  onPress={() => handleKidSelect(kid.id)}
                >
                  <Image 
                    source={{ uri: kid.image }}
                    style={styles.kidImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.kidName}>{kid.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setFormData({...formData, acknowledgement: !formData.acknowledgement})}
            >
              <Image 
                source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/componen.png' }}
                style={styles.checkboxIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I acknowledge that the information is accurate & that i am legally responsible for it.
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.saveButton,
              (!formData.acknowledgement || !selectedKids.some(kid => kid.selected)) && 
              styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!formData.acknowledgement || !selectedKids.some(kid => kid.selected)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Khalid al-Jameel"
        description="Are you sure you want to remove authorized pick-up?"
        // imageSource={require('../assets/profile-image.png')}
        primaryButtonText="Yes, Sure"
        primaryButtonAction={() => console.log('Removed Authorized Pick-Up')}
        secondaryButtonText="No, I Don’t"
        secondaryButtonAction={() => console.log('Cancelled Removal')}
      />
    </View>
  );
};

export default AddAuthorizedPickup;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width >= 440 ? 440 : '100%',
    minWidth: 320,
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 5,
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
    marginLeft: 65,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 24,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 20,
  },
  imageContainer: {
    width: 85,
    height: 85,
    backgroundColor: '#fef6e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fcdea1',
    padding: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: 48,
    height: 48,
  },
  uploadButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  formContainer: {
    gap: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 10,
    height: 54,
  },
  input: {
    flex: 1,
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#212529',
    height: '100%',
  },
  dropdownIcon: {
    width: 24,
    height: 24,
  },
  kidsScrollContainer: {
    marginBottom: 12,
  },
  kidsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
  },
  kidCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: 98,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  kidCardSelected: {
    borderColor: '#f8ac16',
    backgroundColor: '#fef6e6',
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
    maxWidth: 78,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 12,
    paddingRight: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
  },
  checkboxText: {
    flex: 1,
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});
