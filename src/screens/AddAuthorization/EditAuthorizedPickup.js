import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomPicker from '../../components/CustomPicker';
import Heading from '../../components/Heading';
import InputField from '../../components/InputFeild';
import SubHeading from '../../components/SubHeading';
import AddKidsModal from './AddKidsModal';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  relation: Yup.string().required('Relation is required'),
  name: Yup.string().required('Name is required'),
  idNumber: Yup.string().required('ID Number is required'),
  cellNo: Yup.string().required('Cell No is required'),
  vehicleNo: Yup.string().required('Vehicle # is required'),
});

const EditAuthorizedPickup = ({ 
  initialData = {
    relation: 'Driver',
    name: 'Khalid al-Jameel',
    idNumber: '545135',
    cellNo: '+966 123 456 7890',
    vehicleNo: 'SA-5715B',
  },
  assignedKids = [
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
  onSave = () => {},
  style = {},
  navigation
}) => {
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/kid-imag-2.png'); 

  // Function to handle image picking
  const handleChangePicture = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setProfileImage(selectedImage.uri); // Set the selected image URI
        }
      }
    );
  };

  const handleSave = (values) => {
    if (acknowledgement) {
      onSave(values);
    }
    navigation.goBack();
  };

  const handleAssignKids = (selectedKids) => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={[styles.container, style]}>
      <Heading title="Edit Authorized Pickup" textstyle={styles.title} />
      
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.content}>
            <View style={styles.imageSection}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: profileImage }}  // Display the selected or default image
                  style={styles.profileImage}
                />
              </View>
              <CustomButton
                title="Change Picture"
                touchStyle={styles.changePictureButton}
                textStyle={styles.changePictureText}
                onPress={handleChangePicture}  // Call the image picker
              />
            </View>

            <View style={styles.formContainer}>
              <CustomPicker
                label="Relation"
                items={['Driver', 'Parent', 'Guardian']}
                selectedValue={values.relation}
                onValueChange={handleChange('relation')}
                style={styles.inputGroup}
              />
              {errors.relation && touched.relation && <Text style={styles.errorText}>{errors.relation}</Text>}

              <InputField
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Enter name"
                style={styles.inputGroup}
              />
              {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <InputField
                label="ID Number"
                value={values.idNumber}
                onChangeText={handleChange('idNumber')}
                onBlur={handleBlur('idNumber')}
                placeholder="Enter ID number"
                style={styles.inputGroup}
              />
              {errors.idNumber && touched.idNumber && <Text style={styles.errorText}>{errors.idNumber}</Text>}

              <InputField
                label="Cell No"
                value={values.cellNo}
                onChangeText={handleChange('cellNo')}
                onBlur={handleBlur('cellNo')}
                placeholder="Enter cell number"
                style={styles.inputGroup}
              />
              {errors.cellNo && touched.cellNo && <Text style={styles.errorText}>{errors.cellNo}</Text>}

              <InputField
                label="Vehicle #"
                value={values.vehicleNo}
                onChangeText={handleChange('vehicleNo')}
                onBlur={handleBlur('vehicleNo')}
                placeholder="Enter vehicle number"
                style={styles.inputGroup}
              />
              {errors.vehicleNo && touched.vehicleNo && <Text style={styles.errorText}>{errors.vehicleNo}</Text>}

              <View style={styles.assignedKidsSection}>
                <SubHeading text="Assigned Kids" style={styles.label} />
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
                        <SubHeading text={kid.name} style={styles.kidName} />
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity style={styles.addKidButton} onPress={() => setIsModalVisible(true)}>
                    <Image 
                      source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/interfac-3.png' }}
                      style={styles.addKidIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.acknowledgementContainer}>
                <CustomCheckbox
                  value={acknowledgement}
                  onValueChange={setAcknowledgement}
                  label="I acknowledge that the information is accurate & that I am legally responsible for it."
                  style={{checkboxTouch: styles.checkbox,
                  checkboxText: styles.checkboxText
                  }}
                />
              </View>

              <CustomButton 
                title="Save"
                onPress={handleSubmit}
                touchStyle={[styles.saveButton, !acknowledgement && styles.saveButtonDisabled]}
                textStyle={styles.saveButtonText}
                disabled={!acknowledgement}
              />
            </View>
          </View>
        )}
      </Formik>

      <AddKidsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        kids={assignedKids}
        onAssign={handleAssignKids}
      />
    </ScrollView>
  );
};

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
    width: width * 0.22, 
    height: width * 0.22, 
    borderRadius: 9.66,
    backgroundColor: '#fef6e6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  profileImage: {
    width: width * 0.14,
    height: width * 0.14, 
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
  checkboxText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
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
