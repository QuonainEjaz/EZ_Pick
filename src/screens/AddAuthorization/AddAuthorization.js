import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomPicker from '../../components/CustomPicker';
import InputField from '../../components/InputFeild';
import Success from '../../assets/Icons/svg/Successfull';

const {width} = Dimensions.get('window');

const AddAuthorization = ({navigation, style}) => {
  const students = useSelector(state => state.students.students);
  const [selectedKids, setSelectedKids] = useState([]);
  
  const [formData, setFormData] = useState({
    relation: '',
    name: '',
    idNumber: '',
    cellNo: '',
    vehicleNo: '',
    acknowledgement: false,
    image: {uri: null, type: null, name: null},
  });

  const handleKidSelect = kidId => {
    setSelectedKids(prev => {
      if (prev.includes(kidId)) {
        return prev.filter(id => id !== kidId);
      }
      return [...prev, kidId];
    });
  };

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        const asset = response.assets?.[0];
        if (asset) {
          const {uri, type, fileName} = asset;
          setFormData(prev => ({
            ...prev,
            image: { uri: uri, type: type || 'image/jpeg', name: fileName },
          }));
        }
        else {
          ToastAndroid.show('No image selected', ToastAndroid.SHORT);
        }
        console.log('Image: ', formData.image);
      }
    });
  };

  const setGuardian = async () => {
    try {
      const url = 'https://api.ezpick.co/parents/createGuardian';
      const formDataPayload = new FormData();
  
      formDataPayload.append('name', formData.name || 'Guardian 1');
      // formDataPayload.append('email', 'guardian1@example.com');
      formDataPayload.append('phoneNo', formData.cellNo || '+96599985588');
      formDataPayload.append('clientId', 1000000);
      formDataPayload.append('motherEmail', 'mother@gmail.com');
      formDataPayload.append('role', formData.relation || 'Driver');
      formDataPayload.append('parentId', 1000416);
      formDataPayload.append('nationalId', formData.idNumber || '78786');
      formDataPayload.append('vehicleNo', formData.vehicleNo || '12345');
  
      // Append selected students
      selectedKids.forEach((kidId, index) => {
        formDataPayload.append(`studentIds[${index}]`, kidId);
      });
  
      // Append image if available
      // if (formData.image && formData.image.uri) {
      //   formDataPayload.append('selectedImage', {
      //     uri: formData.image.uri,
      //     type: formData.image.type || 'image/jpeg',
      //     name: formData.image.name || 'photo.jpg',
      //   });
      // }
      
      console.log('Sending formData to API:', formDataPayload);
  
      const response = await axios.put(url, formDataPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Full API Response:', response.data);
  
      // Safely handle server response message
      const serverMessage =
        typeof response.data?.message === 'string'
          ? response.data.message
          : 'Guardian created successfully!';
      ToastAndroid.showWithGravity(
        serverMessage,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );

      if (response.data.success) {
        setFormData({
          relation: '',
          name: '',
          idNumber: '',
          cellNo: '',
          vehicleNo: '',
          acknowledgement: false,
          image: {uri: null, type: null, name: null},
        });
        setSelectedKids([]);
      }
    } catch (error) {
      console.error('Error creating guardian:', error.response?.data || error.message);
      ToastAndroid.showWithGravity(
        'Something went wrong!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };
  

  const handleSave = () => {
    setGuardian();
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Heading
          title="Add New Authorized Pickup"
          textstyle={styles.title}
          boxStyle={[styles.headingContainer, {marginBottom: 20}]}
        />

        {/* Image Upload Section */}
        <View style={styles.imageUploadContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                formData.image.uri
                  ? {uri: formData.image.uri}
                  : require('../../assets/pics/UploadPic.png')
              }
              style={styles.uploadImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePick}
          >
            <SubHeading text="Upload Picture" style={styles.uploadButtonText} />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <CustomPicker
            label="Relation"
            items={[
              'Driver',
              'Maid',
              'Nany',
              'Uncle',
              'Grand father / mother',
              'Brother',
              'Sister',
              'Other',
            ]}
            selectedValue={formData.relation}
            onValueChange={value => setFormData({...formData, relation: value})}
            style={{ label: styles.label, input: styles.input }}
          />

          <InputField
            label="Name"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            style={{ label: styles.label, input: styles.input }}
          />

          <InputField
            label="ID Number"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.idNumber}
            onChangeText={text => setFormData({...formData, idNumber: text})}
            style={{ label: styles.label, input: styles.input }}
          />

          <InputField
            label="Cell No"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.cellNo}
            onChangeText={text => setFormData({...formData, cellNo: text})}
            keyboardType="phone-pad"
            style={{ label: styles.label, input: styles.input }}
          />

          <InputField
            label="Vehicle #"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.vehicleNo}
            onChangeText={text => setFormData({...formData, vehicleNo: text})}
            style={{ label: styles.label, input: styles.input }}
          />

          {/* Kids Selection */}
          <Heading
            title="Select Kids"
            boxStyle={styles.headingContainer}
            textstyle={styles.label}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.kidsScrollContainer}
          >
            <View style={styles.kidsContainer}>
              {students.map(kid => {
                const isSelected = selectedKids.includes(kid.id);
                return (
                  <TouchableOpacity
                    key={kid.id}
                    style={[
                      styles.kidCard,
                      isSelected && styles.kidCardSelected,
                    ]}
                    onPress={() => handleKidSelect(kid.id)}
                  >
                    {isSelected && (
                      <Success style={styles.successIcon} width={18} height={18} />
                    )}
                    <Image
                      source={{ uri: kid?.profileUrl }}
                      style={styles.kidImage}
                      resizeMode="cover"
                    />
                    <SubHeading text={kid.name} style={styles.kidName} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Acknowledgement */}
          <CustomCheckbox
            value={formData.acknowledgement}
            onValueChange={value => setFormData({...formData, acknowledgement: value})}
            label="I acknowledge that the information is accurate & that I am legally responsible for it."
            style={{
              checkboxContainer: styles.checkboxContainer,
              checkboxText: styles.checkboxText,
            }}
          />

          {/* Save Button */}
          <CustomButton
            title="Save"
            onPress={handleSave}
            width={width}
            touchStyle={[styles.saveButtonContainer]}
            textStyle={[styles.saveButton]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAuthorization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width >= 440 ? 440 : '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headingContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#212529',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#fef6e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fcdea1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  formContainer: {},
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#212529',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 12,
    height: 54,
    flex: 1,
  },
  kidsScrollContainer: {
    backgroundColor: '#f8f8f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 12,
  },
  kidsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
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
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 78,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingRight: 20,
    marginBottom: 20,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
  },
  saveButtonContainer: {
    paddingVertical: 12,
    marginBottom: 40,
  },
  saveButton: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  successIcon: {
    position: 'absolute',
    top: 5,
    right: 18,
    zIndex: 1,
  },
});
