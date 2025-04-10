import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Heading from '../../components/Heading';
import CustomDoubleButton from './CustomDoubleButton';
import PhotoSelectionModal from '../../components/PhotoSelectionModal';
import CustomButton from '../../components/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setStudents, toggleFirstLoad} from '../../store/App/action';
import {CommonActions} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const StudentUploadScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students, shallowEqual);
  const hasNavigated = useRef(false);

  console.log('StudentUploadScreen rendered with students:', students);

  // Filter students with no profile picture (profileUrl is null)
  const studentsWithoutProfilePic = useMemo(() => {
    return students?.filter(student => student?.profileUrl === null) || [];
  }, [students]);

  console.log('Students without profile pic:', studentsWithoutProfilePic.length);

  // Navigate directly if no student is found with a null profile picture
  useEffect(() => {
    console.log('StudentUploadScreen navigation effect triggered');
    console.log('hasNavigated:', hasNavigated.current);
    console.log('studentsWithoutProfilePic:', studentsWithoutProfilePic.length);
    
    if (studentsWithoutProfilePic.length === 0 && !hasNavigated.current) {
      console.log('No students need profile pictures, navigating to TabNavigator');
      hasNavigated.current = true;
      
      // Set isFirstLoad to false before navigation
      dispatch(toggleFirstLoad(false));
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabNavigator' }],
        })
      );
    }
    
    return () => {
      console.log('StudentUploadScreen navigation effect cleanup');
    };
  }, [studentsWithoutProfilePic, navigation, dispatch]);

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
      {mediaType: 'photo', quality: 1, saveToPhotos: true},
      response => {
        if (!response.didCancel && !response.errorCode) {
          setUpdatedImage(response.assets[0].uri);
        }
      },
    );
    setIsPhotoSelectionModalVisible(false);
  };

  const handleUploadPhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (!response.didCancel && !response.errorCode) {
        setUpdatedImage(response.assets[0].uri);
      }
    });
    setIsPhotoSelectionModalVisible(false);
  };

  const navigateToTabNavigator = () => {
    if (hasNavigated.current) return;
    
    console.log('Navigating to TabNavigator from StudentUploadScreen');
    hasNavigated.current = true;
    
    // Set isFirstLoad to false before navigation
    dispatch(toggleFirstLoad(false));
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      })
    );
  };

  const handleSavePhoto = () => {
    if (updatedImage && selectedStudent) {
      const updatedStudent = {...selectedStudent, profileUrl: updatedImage};
      const updatedStudents = students.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student,
      );
      dispatch(setStudents(updatedStudents));
      console.log('Student photo updated');
    }
    setIsPhotoSelectionModalVisible(false);
    navigateToTabNavigator();
  };

  const handleUploadLater = () => {
    navigateToTabNavigator();
  };

  return (
    <View style={styles.container}>
      <Heading
        title="Upload Kids Picture"
        textstyle={styles.heading}
        boxStyle={styles.headingContainer}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={studentsWithoutProfilePic} // Only render students with a null profileUrl
        renderItem={({item}) => (
          <StudentUploadCard
            key={item.id}
            student={item}
            image={
              item.id === selectedStudent?.id && updatedImage
                ? updatedImage
                : item.profileUrl
            }
            onPress={() => handleUploadPicturePress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <CustomDoubleButton
        onUploadLater={handleUploadLater}
        onSave={handleSavePhoto}
      />
      <PhotoSelectionModal
        onClose={() => setIsPhotoSelectionModalVisible(false)}
        visible={isPhotoSelectionModalVisible}
        onTakePhoto={handleTakePhoto}
        onUploadPhoto={handleUploadPhoto}
      />
    </View>
  );
};

const StudentUploadCard = ({student, onPress, image}) => {
  const pickupTime = student?.grade?.offTime;
  const convertTo12HourFormat = pickupTime => {
    if (!pickupTime) return 'N/A';
    
    const [hours, minutes] = pickupTime.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {image ? (
          <Image 
            source={{uri: image}} 
            style={styles.image} 
            resizeMode="cover" 
          />
        ) : (
          <View style={[styles.image, {backgroundColor: '#E3E3E3'}]} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{student.name || 'Student'}</Text>
          <Text style={styles.grade}>{student?.grade?.name || 'Grade not set'}</Text>
          <Text style={styles.pickupTime}>
            {`Today's Pick up time: ${convertTo12HourFormat(pickupTime)}`}
          </Text>
        </View>
      </View>
      <CustomButton
        title="Upload Picture"
        touchStyle={styles.uploadButton}
        textStyle={styles.uploadButtonText}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: 15,
    elevation: 1,
  },
  infoContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 8,
    backgroundColor: '#E3E3E3',
  },
  detailsContainer: {marginLeft: 15, flex: 1},
  name: {fontWeight: 'bold', fontSize: width * 0.045, color: '#212529'},
  grade: {fontSize: width * 0.04, color: '#6c757d', marginBottom: 4},
  pickupTime: {fontSize: width * 0.035, color: '#6c757d'},
  uploadButton: {
    borderWidth: 1,
    borderColor: '#F8AC16',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {color: '#F8AC16', fontWeight: 'bold'},
});

export default StudentUploadScreen;
