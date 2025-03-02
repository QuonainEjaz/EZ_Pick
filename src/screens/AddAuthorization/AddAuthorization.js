import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomPicker from '../../components/CustomPicker';
import InputField from '../../components/InputFeild';

const {width} = Dimensions.get('window');

const AddAuthorization = ({navigation,style, onSave = () => {navigation.goBack();}, onBack = () => {}}) => {
  const students = useSelector(state => state.students.students);

  const defaultRelation = '';
  const defaultName = '';
  const defaultIdNumber = '';
  const defaultCellNo = '';
  const defaultVehicleNo = '';
  const defaultSelectedKids = [];
  const [selectedKids, setSelectedKids] = useState(
    defaultSelectedKids.length > 0
      ? defaultSelectedKids
      : students.map(student => ({
          id: student.id,
          name: student.name,
          image: student.image,
          selected: false,
        })),
  );

  const [formData, setFormData] = useState({
    relation: defaultRelation,
    name: defaultName,
    idNumber: defaultIdNumber,
    cellNo: defaultCellNo,
    vehicleNo: defaultVehicleNo,
    acknowledgement: false,
    picture: null,
  });

  const handleKidSelect = kidId => {
    setSelectedKids(prevKids =>
      prevKids.map(kid => ({
        ...kid,
        selected: kid.id === kidId ? !kid.selected : kid.selected,
      })),
    );
  };

  const handleSave = () => {
    const selectedKidIds = selectedKids
      .filter(kid => kid.selected)
      .map(kid => kid.id);
    onSave({
      ...formData,
      selectedKids: selectedKidIds,
    });
  };
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else {
          const {uri} = response.assets[0]; // Extract URI from the selected asset
          setFormData(prevData => ({
            ...prevData,
            picture: uri, // Update the formData with the selected image URI
          }));
        }
      },
    );
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Heading
          title="Add New Authorized Pickup"
          textstyle={styles.title}
          boxStyle={styles.headingContainer}
        />

        <View style={styles.imageUploadContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                formData.picture
                  ? {uri: formData.picture}
                  : require('../../assets/pics/UploadPic.png')
              }
              style={styles.uploadImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePick}>
            <SubHeading text="Upload Picture" style={styles.uploadButtonText} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <CustomPicker
            label="Relation"
            items={['Father', 'Mother', 'Uncle', 'Aunt', 'Other']}
            selectedValue={formData.relation}
            onValueChange={value => setFormData({...formData, relation: value})}
            style={{label: styles.label, input: styles.input}}
          />

          <InputField
            label="Name"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            style={{label: styles.label, input: styles.input}}
          />

          <InputField
            label="ID Number"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.idNumber}
            onChangeText={text => setFormData({...formData, idNumber: text})}
            style={{label: styles.label, input: styles.input}}
          />

          <InputField
            label="Cell No"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.cellNo}
            onChangeText={text => setFormData({...formData, cellNo: text})}
            keyboardType="phone-pad"
            style={{label: styles.label, input: styles.input}}
          />

          <InputField
            label="Vehicle #"
            placeholder=""
            placeholderColor="#6c757d"
            value={formData.vehicleNo}
            onChangeText={text => setFormData({...formData, vehicleNo: text})}
            style={{label: styles.label, input: styles.input}}
          />

          <Heading
            title="Select Kids"
            boxStyle={styles.headingContainer}
            textstyle={styles.label}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.kidsScrollContainer}>
            <View style={styles.kidsContainer}>
              {selectedKids.map(kid => (
                <TouchableOpacity
                  key={kid.id}
                  style={[
                    styles.kidCard,
                    kid.selected && styles.kidCardSelected,
                  ]}
                  onPress={() => handleKidSelect(kid.id)}>
                  <Image
                    source={{uri: kid.image}}
                    style={styles.kidImage}
                    resizeMode="cover"
                  />
                  <SubHeading text={kid.name} style={styles.kidName} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <CustomCheckbox
            value={formData.acknowledgement}
            onValueChange={value =>
              setFormData({...formData, acknowledgement: value})
            }
            label="I acknowledge that the information is accurate & that I am legally responsible for it."
            style={{
              checkboxContainer: styles.checkboxContainer,
              checkboxText: styles.checkboxText,
            }}
          />

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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width >= 440 ? 440 : '100%',
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
  headingContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
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
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 12,
    height: 54,
    flex: 1,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
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
    marginBottom: 12,
  },
  checkboxTouch: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  saveButtonContainer: {
    paddingVertical: 12,
    marginBottom: 40,
  },
  saveButton: {
    fontFamily: 'Outfit',
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  saveButtonText: {},
});
