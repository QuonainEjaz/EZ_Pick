import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
import Heading from '../../components/Heading';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';
import Success from '../../assets/Icons/svg/Successfull';
import Export from '../../assets/Icons/svg/Export';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import io from 'socket.io-client';

const {width, height} = Dimensions.get('window');

// Define your socket endpoint
const SOCKET_ENDPOINT = 'https://api.ezpick.co';

const StudentCard = ({student, token}) => {
  // Socket state
  const [socket, setSocket] = useState(null);
  const [socketStatus, setSocketStatus] = useState('Disconnected');

  // Component states
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [status, setStatus] = useState('out_of_range');
  const [timer, setTimer] = useState(0);
  const [parentLocation, setParentLocation] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  const SCHOOL_LOCATION = {
    latitude: student?.grade?.school.lat,
    longitude: student?.grade?.school.long,
  };

  // ========= Socket Functions =========

  // Create socket connection and set up event listeners
  const createSocket = (token) => {
    const sock = io(SOCKET_ENDPOINT, {
      auth: { token, role: 'CLIENT' },
      transports: ['websocket', 'polling'],
    });
  
    sock.on('connect', () => {
      console.log('Socket connected with id:', sock.id);
      setSocketStatus('Connected');
      sendFetchStudent(sock, student.parentId);
    });
  
    sock.on('disconnect', () => {
      console.log('Socket disconnected');
      setSocketStatus('Disconnected');
    });
  
    sock.on('_parent_requests', (data) => {
      console.log('Received _parent_requests:', data);
      if (data.studentId === student.id) {
        setStatus('request_sent');
      }
    });
  
    sock.on('_approved_request', (data) => {
      console.log('Received _approved_request:', data);
      if (data.studentId === student.id) {
        setStatus('pickup_successful');
      }
    });
  
    sock.on('_student_list', (data) => {
      console.log('Received _student_list:', data);
    });
  
    return sock;
  };

  // Emit _fetch_student event
  const sendFetchStudent = (sock, studentId) => {
    if (sock && sock.connected) {
      sock.emit('_fetch_student', {parentId: studentId, socketId: sock.id}, (response) => {
        console.log('Response for _fetch_student:', response);
      });
    } else {
      console.error('Socket is not connected.');
    }
  };

  // Emit _update_location event
  const sendUpdateLocation = (sock, lat, lng) => {
    if (sock && sock.connected) {
      sock.emit('_update_location', {lat, lng});
      console.log('Emitted _update_location with', lat, lng);
    } else {
      console.error('Socket is not connected.');
    }
  };

  // Emit _request_student event
  const sendRequestStudent = (sock, studentId) => {
    if (sock && sock.connected) {
      sock.emit('_request_student', {studentId, socketId: sock.id}, (response) => {
        console.log('Response for _request_student:', response);
      });
    } else {
      console.error('Socket is not connected.');
    }
  };

  // Emit _confirm_request event
  const sendConfirmRequest = (sock, studentId) => {
    if (sock && sock.connected) {
      sock.emit('_confirm_request', {studentId, socketId: sock.id}, (response) => {
        console.log('Response for _confirm_request:', response);
      });
    } else {
      console.error('Socket is not connected.');
    }
  };

  // ========= Location & Permission Functions =========

  const checkPermission = async () => {
    const permissionStatus =
      Platform.OS === 'ios'
        ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (permissionStatus === RESULTS.GRANTED) {
      setIsLocationEnabled(true);
      console.log('Location permission granted');
    } else {
      setIsLocationEnabled(false);
      console.log('Location permission denied');
    }
  };
  useEffect(() => {
    if (parentLocation && (status === 'out_of_range' || status === 'in_range')) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION);
      const isInRange = distance <= 1000; // Example threshold: 1km
      setStatus(isInRange ? 'in_range' : 'out_of_range');
    }
  }, [parentLocation, status]);
  const fetchLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        setIsLocationEnabled(false);
        return;
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setParentLocation({latitude, longitude});
        setIsLocationEnabled(true);
        // Send location update to server
        if (socket && socket.connected) {
          sendUpdateLocation(socket, latitude, longitude);
        }
      },
      error => {
        console.error('Error fetching location:', error);
        setIsLocationEnabled(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // ========= Socket Connection =========

  // Create socket connection when token is available
  useEffect(() => {
    if (token) {
      const sock = createSocket(token);
      setSocket(sock);
      return () => {
        if (sock) sock.disconnect();
      };
    }
  }, [token]);

  // ========= Location Updates =========

  useEffect(() => {
    checkPermission();
  }, [locationModalVisible, status, isLocationEnabled]);

  useEffect(() => {
    const locationFetchTimer = setTimeout(() => {
      fetchLocation();
    }, 2000);
    return () => clearTimeout(locationFetchTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, [socket]);

  useEffect(() => {
    if (parentLocation) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION);
      const isInRange = distance <= 1000000000; // Adjust the threshold as needed
      if (!isInRange) {
        setStatus('out_of_range');
      }
    }
  }, [parentLocation]);

  // ========= Timer Logic =========

  const pickupTime = '17:45';

  const calculateTimer = () => {
    const now = new Date();
    const [pickupHours, pickupMinutes] = pickupTime.split(':');
    const pickupDate = new Date();
    pickupDate.setHours(pickupHours, pickupMinutes, 0, 0);
    const timeDifference = pickupDate - now;
    return Math.max(timeDifference / 1000, 0);
  };

  useEffect(() => {
    if (status === 'in_range' || status === 'out_of_range') {
      const remainingTime = calculateTimer();
      setTimer(remainingTime);
    }
  }, [status]);

  useEffect(() => {
    let timerInterval;
    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timer]);

  const time = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: (timer % 60).toFixed(0),
  };

  // ========= User Actions =========

  const handlePickupRequest = () => {
    if (socket && socket.connected) {
      sendRequestStudent(socket, student.id);
    } else {
      Alert.alert('Socket not connected');
    }
  };

  const handleConfirmPickup = () => {
    if (socket && socket.connected) {
      sendConfirmRequest(socket, student.id);
    } else {
      Alert.alert('Socket not connected');
    }
  };

  const openGoogleMaps = () => {
    if (parentLocation) {
      const {latitude, longitude} = parentLocation;
      const {latitude: schoolLat, longitude: schoolLong} = SCHOOL_LOCATION;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${schoolLat},${schoolLong}&travelmode=driving`;
      Linking.openURL(url).catch(err => console.error('Error opening Google Maps:', err));
    } else {
      console.error('Parent location is not available');
    }
  };

  // ========= Modal Rendering =========

  const renderModal = () => {
    // Customize modal content based on status if needed
    return null;
  };

  const statusConfig = {
    out_of_range: {
      text: 'You are out of range:',
      buttonText: 'Pickup Request',
    },
    in_range: {
      text: "You are in School's range:",
      buttonText: 'Pickup Request',
    },
    request_sent: {
      text: 'REQUEST SENT SUCCESSFULLY',
      buttonText: 'Confirm Pickup',
    },
    // Additional statuses can be added here
  };

  const config = statusConfig[status] || {};

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Heading
          title={config.text}
          textstyle={styles.headerText}
          boxStyle={styles.headerBox}
        />
        {status === 'pickup_successful' ? (
          <Success />
        ) : (
          <View style={styles.timerContainer}>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {time.hours.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Hrs</Text>
            </View>
            <Text style={styles.timerText}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {time.minutes.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Mins</Text>
            </View>
            <Text style={styles.timerText}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {time.seconds.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Secs</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.infoContainer}>
        <Image
          source={{
            uri:
              student?.profileUrl ||
              'https://example.com/default-profile.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Heading
            title={student.name}
            textstyle={styles.name}
            boxStyle={styles.nameBox}
          />
          <Text style={styles.grade}>{student?.grade?.name}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text style={styles.pickupTime}>
              {`Today's Pickup Time: ${pickupTime}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.exportContainer}
          onPress={openGoogleMaps}>
          <Export />
        </TouchableOpacity>
      </TouchableOpacity>

      <CustomButton
        title={config.buttonText}
        onPress={() => {
          if (status === 'out_of_range') {
            setLocationModalVisible(true);
          } else if (status === 'in_range' || status === 'ready_to_pickup') {
            handlePickupRequest();
          } else if (status === 'request_sent') {
            handleConfirmPickup();
          }
        }}
        touchStyle={styles.button}
        textStyle={styles.buttonText}
      />

      {renderModal()}
      <Text style={styles.socketStatus}>Socket Status: {socketStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.05,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    paddingHorizontal: width * 0.025,
    paddingVertical: width * 0.015,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  headerText: {
    fontFamily: 'Outfit',
    fontWeight: 'bold',
    fontSize: width * 0.038,
    color: 'black',
    textTransform: 'uppercase',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  timeUnit: {
    width: width * 0.1,
    alignItems: 'center',
    paddingVertical: width * 0.005,
  },
  timerText: {
    fontWeight: '700',
    fontSize: width * 0.055,
    color: '#212529',
  },
  unitLabel: {
    fontWeight: '500',
    fontSize: width * 0.03,
    color: '#6C757D',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: width * 0.22,
    height: height * 0.1,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 2,
    marginHorizontal: 10,
  },
  nameBox: {
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: width * 0.042,
    color: '#212529',
  },
  grade: {
    fontWeight: '500',
    fontSize: width * 0.036,
    color: '#6c757d',
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupTime: {
    fontWeight: '500',
    fontSize: width * 0.036,
    color: '#6c757d',
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#F8AC16',
    fontWeight: 'bold',
  },
  exportContainer: {
    padding: 2,
  },
  socketStatus: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});

export default StudentCard;
