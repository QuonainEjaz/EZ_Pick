import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  Share as RNShare,
  findNodeHandle,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import LinkButton from '../../components/LinkButton';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import ShareButton from '../../assets/Icons/svg/ShareIcon.js';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const StudentPickupCard = ({style, navigation, route}) => {
  const user = useSelector(state => state.students.parent);
  const baseUrl = useSelector(state => state.students.baseUrl);
  const [guardian, setGuardian] = useState(null);
  const {item} = route.params;
  const viewShotRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize QR data to prevent unnecessary recalculations
  const qrData = useMemo(() => {
    return `${item.userName ?? ''}:${item.password ?? ''}`;
  }, [item.userName, item.password]);
  
  // Fetch students data with proper error handling
  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/parents/${item.id}`);
      if (response.status === 200 && response.data.parent) {
        setGuardian(response.data.parent);
      } else {
        console.error('Fetch Error: Invalid response format', response);
        Alert.alert('Error', 'Failed to load student data');
      }
    } catch (error) {
      console.error('Fetch Students Error:', error);
      Alert.alert('Error', 'Failed to load student data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, item.id]);
  
  useEffect(() => {
    fetchStudents();
    
    // Cleanup function
    return () => {
      // Any cleanup needed when component unmounts
    };
  }, [fetchStudents]);

  // Updated permission handler with better error handling
  const requestSavePermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      });

      const currentStatus = await check(permission);
      
      if (currentStatus === RESULTS.GRANTED) {
        return true;
      } else if (currentStatus === RESULTS.DENIED) {
        const {status} = await request(permission);
        return status === RESULTS.GRANTED;
      } else {
        Alert.alert(
          'Permission Required',
          'Please enable photo library access in your settings to save the card.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return false;
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to check permissions. Please try again.');
      return false;
    }
  };

  // Optimized share functionality with better error handling
  const handleShare = async () => {
    if (!viewShotRef.current) {
      Alert.alert('Error', 'View reference not available');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Add a small delay to ensure view is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const uri = await viewShotRef.current.capture();
      
      const options = {
        title: 'Share Student Card',
        message: 'Student Pick-Up Card',
        url: uri,
        type: 'image/jpeg',
        failOnCancel: false,
      };
      
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing card:', error);
      Alert.alert('Error', 'Failed to share card: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Optimized save functionality with better error handling
  const handleSave = async () => {
    if (!viewShotRef.current) {
      Alert.alert('Error', 'View reference not available');
      return;
    }
    
    try {
      const permissionGranted = await requestSavePermission();
      if (!permissionGranted) return;
      
      setIsProcessing(true);
      
      // Add a small delay to ensure view is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const uri = await viewShotRef.current.capture();
      
      // Save directly to gallery
      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert('Success', 'Card saved to gallery!');
    } catch (error) {
      console.error('Error saving card:', error);
      Alert.alert('Error', 'Failed to save card: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Memoize student list to prevent unnecessary re-renders
  const studentList = useMemo(() => {
    if (!guardian?.students?.length) return null;
    
    return guardian.students.map((student, index) => (
      <View key={index} style={styles.studentView}>
        <FastImage
          source={{uri: student?.profileUrl}}
          style={styles.studentImage}
        />
        <View style={styles.studentInfo}>
          <View style={styles.studentNameRow}>
            <Text style={styles.studentName}>{student?.name}</Text>
            <Text style={[styles.studentGrade, styles.gradeText]}>
              Grade: {student?.grade?.name}
            </Text>
          </View>
          <Text style={styles.studentSchool}>
            {student.grade?.school?.name}
          </Text>
        </View>
      </View>
    ));
  }, [guardian?.students]);

  return (
    <View style={[styles.container, style]}>
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#F8AC16" />
          <Text style={styles.processingText}>Processing...</Text>
        </View>
      )}
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <LinkButton
          label="Back"
          onPress={handleClose}
          style={styles.addButton}
          color={'#FFF'}
        />
        <Heading
          title={'Student Card'}
          textstyle={styles.headingText}
          boxStyle={styles.headingBox}
        />
        <View style={{width: '10%'}} />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F8AC16" />
          <Text style={styles.loadingText}>Loading student data...</Text>
        </View>
      ) : (
        <ViewShot 
          ref={viewShotRef} 
          options={{format: 'jpg', quality: 0.8}}
          style={styles.cardContainer}>
          <Image
            source={require('../../assets/pics/StudentCardBackgroundPic.png')}
            style={styles.backgroundImage}
          />

          <Text style={styles.title}>Student Pick-Up Card</Text>
          <FastImage
            source={{uri: guardian?.students?.[0]?.grade?.school?.profileUrl}}
            style={styles.schoolLogo}
          />

          <View style={styles.qrContainer}>
            {qrData ? <QRCode value={qrData} size={100} /> : null}
          </View>

          <ScrollView
            style={styles.studentStackView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            {studentList}
          </ScrollView>

          <View style={styles.separator} />
          <View style={styles.userDetails}>
            <Text style={styles.authorizedText}>Authorized:</Text>
            <View style={styles.authorizedStackView}>
              <View style={styles.authView}>
                <Image
                  source={require('../../assets/pics/user.png')}
                  style={styles.icon}
                />
                <Text style={styles.authText}>{item?.name}</Text>
              </View>
              <View style={styles.authView}>
                <Image
                  source={require('../../assets/pics/id_card.png')}
                  style={styles.icon}
                />
                <Text style={styles.authText}>{item?.nationalId}</Text>
              </View>
              <View style={styles.authView}>
                <Image
                  source={require('../../assets/pics/car.png')}
                  style={styles.icon}
                />
                <Text style={styles.authText}>{item?.vehicleNo}</Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Share"
              touchStyle={styles.shareButton}
              textStyle={styles.shareText}
              svg={<ShareButton />}
              onPress={handleShare}
            />
            <CustomButton
              title="Save"
              onPress={handleSave}
              touchStyle={styles.saveButton}
              textStyle={styles.saveText}
            />
          </View>
        </ViewShot>
      )}
      
      {/* Bottom Bar */}
      <CustomButton
        title="Close"
        onPress={handleClose}
        textStyle={styles.closeText}
        touchStyle={styles.closeButton}
      />
    </View>
  );
};

export default StudentPickupCard;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#F8AC16',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Outfit',
  },
  processingOverlay: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(33,33,33,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingText: {
    color: '#F8AC16',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Outfit',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 70,
    alignSelf: 'center',
    backgroundColor: '#212121',
    shadowColor: '#676767',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 5,
  },
  headingText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 20,
    textAlign: 'center',
  },
  cardContainer: {
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    gap: 30,
    width: '97%',
    height: 250,
    alignItems: 'center',
    position: 'relative',
  },
  qrCanvas: {
    width: '100%',
    height: 273,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '95%',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEEFD2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  shareText: {
    color: '#F8AC16',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8AC16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
  },
  saveText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#212121',
    width: '90%',
    height: '6%',
    alignSelf: 'center',
    margin: 'auto',
    borderRadius: 8,
  },
  closeText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  backgroundImage: {
    width: '95%',
    height: 250,
  },
  title: {
    position: 'absolute',
    top: 28,
    left: 125,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#212121',
  },
  schoolLogo: {
    position: 'absolute',
    top: 12,
    left: 25,
    width: 80,
    height: 15,
    zIndex: 100,
    resizeMode: 'cover',
  },
  qrContainer: {
    position: 'absolute',
    top: '55%',
    left: 25,
    transform: [{translateY: -55}],
  },
  studentStackView: {
    position: 'absolute',
    right: 20,
    top: 56,
    width: 190,
    height: 120,
  },
  studentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  studentImage: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  studentInfo: {
    marginLeft: 10,
  },
  studentNameRow: {
    flexDirection: 'row',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textTransform: 'capitalize',
    width: '40%',
  },
  studentGrade: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginHorizontal: 'auto',
    width: '40%',
    textAlign: 'right',
  },
  gradeText: {
    alignSelf: 'flex-end',
  },
  studentSchool: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
    textTransform: 'capitalize',
  },
  separator: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    width: 180,
    height: 1,
    backgroundColor: '#000',
  },
  userDetails: {
    position: 'absolute',
    bottom: 25,
    right: 40,
    width: 180,
  },
  authorizedText: {
    letterSpacing: 1,
    lineHeight: 12,
    fontSize: 12,
    color: 'darkgray',
    fontWeight: '900',
    fontFamily: 'Outfit',
  },
  authorizedStackView: {
    flexDirection: 'row',
    gap: 20,
  },
  authView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 18,
    marginRight: 5,
    resizeMode: 'contain',
  },
  authText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
