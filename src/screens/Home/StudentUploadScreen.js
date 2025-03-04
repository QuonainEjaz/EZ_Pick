import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import StudentUploadCard from './StudentUploadCard';
import Heading from '../../components/Heading';
import CustomDoubleButton from './CustomDoubleButton';
import PhotoSelectionModal from '../../components/PhotoSelectionModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setStudents} from '../../store/App/action';

const StudentUploadScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students, shallowEqual);
  const [isPhotoSelectionModalVisible, setIsPhotoSelectionModalVisible] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);

  const handleUploadPicturePress = student => {
    setSelectedStudent(student);
    setIsPhotoSelectionModalVisible(true);
  };

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
          setUpdatedImage(photoUri);
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
          setUpdatedImage(photoUri);
        }
      },
    );
    setIsPhotoSelectionModalVisible(false);
  };

  const handleSavePhoto = () => {
    if (updatedImage && selectedStudent) {
      const updatedStudent = {
        ...selectedStudent,
        profileUrl : updatedImage,
      };
      const updatedStudents = students.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student,
      );
      console.log('Updated Students:', updatedStudents);
      dispatch(setStudents(updatedStudents));
    }
    setIsPhotoSelectionModalVisible(false);
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <Heading
          title="Upload Kids Picture"
          textstyle={styles.heading}
          boxStyle={styles.headingContainer}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={students}
          renderItem={({item}) => (
            <StudentUploadCard
              key={item.id}
              student={item}
              image={
                item.id === selectedStudent?.id && updatedImage
                  ? updatedImage
                  : item.image
              }
              style={styles.studentCard}
              onPress={() => handleUploadPicturePress(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
        <CustomDoubleButton
          onUploadLater={() => navigation.navigate('TabNavigator')}
          onSave={handleSavePhoto}
        />
        <PhotoSelectionModal
          onClose={() => setIsPhotoSelectionModalVisible(false)}
          visible={isPhotoSelectionModalVisible}
          onTakePhoto={handleTakePhoto}
          onUploadPhoto={handleUploadPhoto}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f9',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 14,
  },
  studentCard: {
    width: '100%',
    height: 'auto',
  },
  heading: {
    fontFamily: 'Outfit',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  headingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default StudentUploadScreen;
