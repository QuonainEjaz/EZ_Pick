import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Svg, {Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {setScannedUserId, SET_PARENT, setStudents} from '../../store/App/action';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

const CameraIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={78}
    fill="none"
    {...props}>
    <Path
      fill="#F8AC16"
      d="M92.712 10.658H66.241L60.9 1.674A2.9 2.9 0 0 0 58.405.258H41.594A2.9 2.9 0 0 0 39.1 1.674l-5.342 8.984h-8.686V8.674a2.9 2.9 0 0 0-2.9-2.9H11.449a2.9 2.9 0 0 0-2.9 2.9v1.984H7.288A7.288 7.288 0 0 0 0 17.942v52.77A7.288 7.288 0 0 0 7.288 78h85.424A7.29 7.29 0 0 0 100 70.712v-52.77a7.288 7.288 0 0 0-7.288-7.284ZM50 65.072a20.746 20.746 0 1 1 0-41.492 20.746 20.746 0 0 1 0 41.492ZM88.164 25.68h-9.082a2.9 2.9 0 0 1 0-5.8h9.082a2.9 2.9 0 1 1 0 5.8Z"
    />
  </Svg>
);

const GuardScreen = ({navigation}) => {
  const [showScanner, setShowScanner] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const dispatch = useDispatch();
  const [tempLoginData, setTempLoginData] = useState(null);
  const baseUrl = 'https://api.ezpick.co';
  const isProcessing = useRef(false);

  const fetchStudents = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/parents/${userId}`);
      if (response.status === 200) {
        dispatch(SET_PARENT(response.data.parent));
        dispatch(setStudents(response.data.parent.students));
        return true;
      } else {
        console.error('Fetch Error:', response);
        return false;
      }
    } catch (error) {
      console.error('Fetch Students Error:', error);
      return false;
    }
  };

  const handleQRCodeScanned = async data => {
    // Prevent multiple scans
    if (isProcessing.current) return;
    isProcessing.current = true;
    
    try {
      // Parse the QR code data
      const [username, password] = data.split(':');

      if (!username || !password) {
        Alert.alert(
          'Error',
          'Invalid QR code format. Expected format: username:password',
        );
        isProcessing.current = false;
        return;
      }

      console.log('Username:', username);
      console.log('Password:', password);

      // Call the login API to get the user data
      try {
        const response = await axios.post(
          'https://api.ezpick.co/parents/loginByUsername',
          {
            username: username,
            password: password,
          },
        );

        if (response.status === 200 && response.data.data) {
          // Store the login data temporarily
          setTempLoginData(response.data.data);
          // Extract the ID from the login data
          const userId = response.data.data.id;

          if (userId) {
            // Store the ID in Redux
            dispatch(setScannedUserId(userId));
            
            // Fetch students data
            const fetchSuccess = await fetchStudents(userId);
            
            if (fetchSuccess) {
              setShowScanner(false);
              // Navigate directly to StudentListScreen
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'StudentListScreen'}],
                }),
              );
            } else {
              Alert.alert('Error', 'Failed to fetch student data');
              isProcessing.current = false;
            }
          } else {
            Alert.alert('Error', 'User ID not found in login data');
            isProcessing.current = false;
          }
        } else {
          Alert.alert('Error', 'Failed to authenticate user');
          isProcessing.current = false;
        }
      } catch (error) {
        console.error('Login API Error:', error);
        Alert.alert(
          'Error',
          'Failed to authenticate user. Please check credentials.',
        );
        isProcessing.current = false;
      }
    } catch (error) {
      console.error('QR Processing Error:', error);
      Alert.alert('Error', 'Failed to process QR code');
      isProcessing.current = false;
    }
  };

  const handleScanPress = async () => {
    try {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Permission',
            'Please grant camera permission to scan QR codes',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        }
      }
      setShowScanner(true);
    } catch (err) {
      console.error('Error requesting camera permission:', err);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  return (
    <View style={styles.container}>
      {showScanner && device ? (
        <View style={styles.cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={{
              codeTypes: ['qr'],
              onCodeScanned: codes => {
                if (codes.length > 0) {
                  handleQRCodeScanned(codes[0].value);
                }
              },
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}>
            <Text style={styles.closeButtonText}>Close Scanner</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <CameraIcon style={styles.icon} />
          <Text style={styles.heading}>Camera</Text>
          <Text style={styles.description}>
            Open your device camera to scan student QR code
          </Text>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  content: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fffff6',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    elevation: 1,
  },
  icon: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4D33',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
    paddingHorizontal: 20,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8AC16',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 3,
  },
  closeButtonText: {
    color: '#F8AC16',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuardScreen;
