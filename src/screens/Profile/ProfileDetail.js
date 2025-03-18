import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import EditImage from '../../assets/Icons/svg/EditImage';
import {useSelector, useDispatch} from 'react-redux';
import PhotoSelectionModal from '../../components/PhotoSelectionModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UPDATE_STUDENT_ProfileUrl} from '../../store/App/action';

const ProfileDetail = ({route}) => {
  const dispatch = useDispatch();
  const {student} = route.params;
  const {profileUrl, name, nameAr, id, grade, gender} = student;
  const parent = useSelector(state => state.students.parent);
  const [isPhotoSelectionModalVisible, setIsPhotoSelectionModalVisible] =
    useState(false);

    const handleTakePhoto = () => { 
      launchCamera(
        {
          mediaType: 'photo',
          quality: 1,
          saveToPhotos: true,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker for uploading a photo');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const photoUri = response.assets[0].uri;
            dispatch(UPDATE_STUDENT_ProfileUrl({ studentId: id, profileUrl: photoUri }));
          }
        },
      );
      setIsPhotoSelectionModalVisible(false);
    };
    
    const handleUploadPhoto = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const photoUri = response.assets[0].uri;
            dispatch(UPDATE_STUDENT_ProfileUrl({ studentId: id, profileUrl: photoUri }));
          }
        },
      );
      setIsPhotoSelectionModalVisible(false);
    };
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri: profileUrl}}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setIsPhotoSelectionModalVisible(true);
          }}>
          <EditImage />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Heading
          title="Student Details"
          textstyle={styles.detailsHeaderText}
          boxStyle={styles.detailsHeaderBox}
        />

        <View style={styles.detailsContent}>
          <View style={styles.row}>
            <View style={styles.column}>
              <SubHeading text="Name" style={styles.label} />
              <SubHeading text={name} style={styles.value} />
            </View>
            <View style={styles.column}>
              <SubHeading text="Arabic Name" style={styles.label} />
              <SubHeading text={nameAr} style={styles.value} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <SubHeading text="Student ID" style={styles.label} />
              <SubHeading text={id} style={styles.value} />
            </View>
            <View style={styles.column}>
              <SubHeading text="Grade" style={styles.label} />
              <SubHeading text={grade?.name} style={styles.value} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <SubHeading text="Gender" style={styles.label} />
              <SubHeading text={gender} style={styles.value} />
            </View>
            <View style={styles.column}>
              <SubHeading text="Student Email" style={styles.label} />
              <SubHeading text={parent?.email} style={styles.value} />
            </View>
          </View>
        </View>
      </View>
      <PhotoSelectionModal
        onClose={() => setIsPhotoSelectionModalVisible(false)}
        visible={isPhotoSelectionModalVisible}
        onTakePhoto={handleTakePhoto}
        onUploadPhoto={handleUploadPhoto}
      />
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  profileImageContainer: {
    position: 'relative',
    width: '100%',
    height: '53%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 12,
    overflow: 'hidden',
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
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailsHeaderBox: {
    alignItems: 'flex-start',
    paddingTop: 12,
    marginHorizontal: 12,
    paddingBottom: 5,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  detailsHeaderText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  detailsContent: {
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#212529',
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
  },
});
