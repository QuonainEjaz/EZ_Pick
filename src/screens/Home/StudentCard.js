import React, { useState, useEffect } from 'react';
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
import { getDistance } from 'geolib';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import io from 'socket.io-client';

// Custom components and icons
import Heading from '../../components/Heading';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';
import Success from '../../assets/Icons/svg/Successfull';
import Export from '../../assets/Icons/svg/Export';

const SOCKET_ENDPOINT = 'https://api.ezpick.co';
const { width, height } = Dimensions.get('window');

const StudentCard = ({ data }) => {
  const { item, token } = data;
  const student = item;

  // ------------------------- Socket & Status States -------------------------
  const [socket, setSocket] = useState(null);
  const [socketStatus, setSocketStatus] = useState('Disconnected');
  // Status can be: out_of_range, in_range, ready_to_pickup, request_sent, request_accepted, pickup_successful
  const [status, setStatus] = useState('out_of_range');
  const [timer, setTimer] = useState(0);
  const [parentLocation, setParentLocation] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  // ------------------------- Modal States -------------------------
  const [outOfRangeModalVisible, setOutOfRangeModalVisible] = useState(false);
  const [inRangeModalVisible, setInRangeModalVisible] = useState(false);
  const [requestAcceptedModalVisible, setRequestAcceptedModalVisible] = useState(false);

  // ------------------------- Constants -------------------------
  const pickupTime = '17:45'; // Pickup time string (could be dynamic)
  const SCHOOL_LOCATION = {
    latitude: student?.grade?.school.lat,
    longitude: student?.grade?.school.long,
  };
   // Convert pickup time to a 12-hour format for display
   const convertTo12HourFormat = pickupTime => {
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
  // ------------------------- SOCKET SETUP -------------------------
  // Create and configure socket connection using token.
  const createSocket = (token) => {
    // console.log('[Socket] Creating socket with token:', token);
    const sock = io(SOCKET_ENDPOINT, {
      auth: { token, role: 'CLIENT' },
      transports: ['websocket', 'polling'],
    });

    sock.on('connect', () => {
      // console.log('[Socket] Connected with id:', sock.id);
      setSocketStatus('Connected');
      // Fetch student details on connection.
      sendFetchStudent(sock, student.parentId);
    });

    sock.on('disconnect', () => {
      // console.log('[Socket] Disconnected');
      setSocketStatus('Disconnected');
    });

    // When a pickup request event is received
    sock.on('_parent_requests', (data) => {
      // console.log('[Socket] Received _parent_requests:', data);
      if (data.studentId === student.id) {
        setStatus('request_sent');
        // Uncomment if you wish to show a confirmation modal automatically:
        // setRequestAcceptedModalVisible(true);
      }
    });

    // When the server approves the pickup request
    sock.on('_approved_request', (data) => {
      // console.log('[Socket] Received _approved_request:', data);
      if (data.studentId === student.id) {
        setStatus('pickup_successful');
      }
    });

    return sock;
  };

  // Emit _fetch_student event to fetch/update student data.
  const sendFetchStudent = (sock, studentId) => {
    if (sock && sock.connected) {
      // console.log('[Socket] Emitting _fetch_student for parentId:', studentId);
      sock.emit(
        '_fetch_student',
        { parentId: studentId, socketId: sock.id },
        (response) => {
          // console.log('[Socket] Response for _fetch_student:', response);
        }
      );
    } else {
      // console.error('[Socket] Socket is not connected.');
    }
  };

  // ------------------------- LOCATION & PERMISSION HANDLING -------------------------
  // Check location permission and update the state accordingly.
  const checkPermission = async () => {
    // console.log('[Location] Checking permission...');
    const permissionStatus =
      Platform.OS === 'ios'
        ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // console.log('[Location] Permission status:', permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      setIsLocationEnabled(true);
      setStatus('in_range'); // Assume in range if permission granted; this will be rechecked later.
    } else {
      setIsLocationEnabled(false);
      // Optionally, you could display a modal here to ask the user to enable location.
    }
  };

  // Fetch current location using Geolocation service.
  const fetchLocation = async () => {
    // console.log('[Location] Fetching location...');
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // console.error('[Location] Permission not granted on Android.');
        setIsLocationEnabled(false);
        return;
      }
    }

    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('[Location] Got current location:', position.coords);
        const { latitude, longitude } = position.coords;
        setParentLocation({ latitude, longitude });
        setIsLocationEnabled(true);
      },
      (error) => {
        // console.error('[Location] Error fetching location:', error);
        setIsLocationEnabled(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // ------------------------- TIMER LOGIC -------------------------
  // Calculate remaining seconds until the pickup time.
  const calculateTimer = () => {
    const now = new Date();
    const [pickupHours, pickupMinutes] = pickupTime.split(':');
    const pickupDate = new Date();
    pickupDate.setHours(pickupHours, pickupMinutes, 0, 0);
    const timeDifference = pickupDate - now;
    return Math.max(timeDifference / 1000, 0);
  };

  // ------------------------- EFFECTS -------------------------
  // Initial location fetch after mount
  useEffect(() => {
    // console.log('[Effect] Initial location fetch scheduled.');
    const timerId = setTimeout(() => {
      fetchLocation();
    }, 2000);
    return () => clearTimeout(timerId);
  }, []);

  // Periodically update location every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update status based on distance between parent location and school location
  useEffect(() => {
    if (parentLocation) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION);
      const isInRange = distance <= 1000; // 1km threshold
      // console.log('[Location] Calculated distance:', distance, 'isInRange:', isInRange);
      setStatus(isInRange ? 'in_range' : 'out_of_range');
      // Optionally show/hide modals based on range:
      // setInRangeModalVisible(isInRange);
      // setOutOfRangeModalVisible(!isInRange);
    }
  }, [parentLocation]);

  // Check permissions on relevant state changes.
  useEffect(() => {
    checkPermission();
  }, [outOfRangeModalVisible, inRangeModalVisible, status, isLocationEnabled]);

  // Start socket connection when token is available.
  useEffect(() => {
    if (token) {
      try {
        // console.log('[Socket] Token available, creating socket connection...');
        const sock = createSocket(token);
        if (!sock) throw new Error('Failed to create socket.');
        setSocket(sock);
        // console.log('[Socket] Socket created and set.');
        return () => {
          if (sock) {
            // console.log('[Socket] Disconnecting socket...');
            sock.disconnect();
            // console.log('[Socket] Socket disconnected.');
          }
        };
      } catch (error) {
        // console.error('[Socket] Error during socket setup:', error);
      }
    }
  }, [token]);

  // Update timer based on status changes (only update if in_range or out_of_range)
  useEffect(() => {
    if (status === 'in_range' || status === 'out_of_range') {
      setTimer(calculateTimer());
    }
  }, [status]);

  // Timer interval to decrement the timer every second.
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Build time object for display
  const time = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: (timer % 60).toFixed(0),
  };

  // ------------------------- USER ACTIONS -------------------------
  // Handle pickup request button press.
  const handlePickupRequest = () => {
    // console.log('[UserAction] Pickup request pressed. Current socket status:', socketStatus);
    if (socket?.connected) {
      sendRequestStudent(socket, student.id);
    } else {
      Alert.alert('Error', 'Socket not connected');
    }
  };

  // Emit _request_student event.
  const sendRequestStudent = (sock, studentId) => {
    if (sock && sock.connected) {
      // console.log('[Socket] Emitting _request_student for studentId:', studentId);
      sock.emit('_request_student', { studentId, socketId: sock.id }, (response) => {
        // console.log('[Socket] Response for _request_student:', response);
      });
    } else {
      // console.error('[Socket] Cannot send _request_student; socket not connected.');
    }
  };

  // Handle confirmation of pickup.
  const handleConfirmPickup = () => {
    // console.log('[UserAction] Confirm pickup pressed.');
    if (socket?.connected) {
      sendConfirmRequest(socket, student.id);
    } else {
      Alert.alert('Error', 'Socket not connected');
    }
  };

  // Emit _confirm_request event.
  const sendConfirmRequest = (sock, studentId) => {
    if (sock && sock.connected) {
      // console.log('[Socket] Emitting _confirm_request for studentId:', studentId);
      sock.emit('_confirm_request', { studentId, socketId: sock.id }, (response) => {
        // console.log('[Socket] Response for _confirm_request:', response);
      });
    } else {
      // console.error('[Socket] Cannot send _confirm_request; socket not connected.');
    }
  };

  // Optional: Emit _update_location event if needed.
  const sendUpdateLocation = (sock, lat, lng) => {
    if (sock && sock.connected) {
      sock.emit('_update_location', { lat, lng });
      // console.log('[Socket] Emitted _update_location with', lat, lng);
    } else {
      // console.error('[Socket] Cannot update location; socket not connected.');
    }
  };

  // ------------------------- MODAL RENDERING -------------------------
  const renderModals = () => (
    <>
      {outOfRangeModalVisible && (
        <CustomModal
          visible={outOfRangeModalVisible}
          onClose={() => setOutOfRangeModalVisible(false)}
          title="Enable Location"
          description="By turning on location, we can accurately track your child's pickup location and notify you when they are on their way."
          primaryButtonText="Go to Settings"
          primaryButtonAction={() => {
            Linking.openSettings();
            checkPermission();
            setOutOfRangeModalVisible(false);
          }}
        />
      )}
      {inRangeModalVisible && (
        <CustomModal
          visible={inRangeModalVisible}
          onClose={() => setInRangeModalVisible(false)}
          title={student?.name}
          description="You are within the school range. You can now request a pickup."
          primaryButtonText="Ok, Got it"
          primaryButtonAction={() => {
            setStatus('ready_to_pickup');
            setInRangeModalVisible(false);
          }}
        />
      )}
      {requestAcceptedModalVisible && (
        <CustomModal
          visible={requestAcceptedModalVisible}
          onClose={() => setRequestAcceptedModalVisible(false)}
          title="Confirmation!"
          description="Have you picked up your child from school?"
          primaryButtonText="Yes, Confirm"
          primaryButtonAction={() => {
            handleConfirmPickup();
            setRequestAcceptedModalVisible(false);
          }}
          secondaryButtonText="No, I Don’t"
          secondaryButtonAction={() => {
            // console.log('[Modal] Pickup not confirmed.');
            setRequestAcceptedModalVisible(false);
          }}
          style={{
            title: { marginBottom: 5 },
            description: { marginBottom: 20 },
            titleText: { fontWeight: '700' },
            descriptionText: { fontSize: 14, marginBottom: 10 },
          }}
        />
      )}
    </>
  );

  // ------------------------- CONFIGURATION FOR UI -------------------------
  // Define UI texts and styles based on current status.
  const statusConfig = {
    out_of_range: {
      text: 'You are out of range:',
      buttonText: 'Pickup Request',
      textStyle: { color: '#212529' },
      buttonTextStyle: { color: '#F8AC1650' },
      buttonTouchStyle: { borderWidth: 1, borderColor: '#F8AC1650' },
      disabled: false,
      buttonAction: 'request',
    },
    in_range: {
      text: "You are in School's range:",
      buttonText: 'Pickup Request',
      textStyle: { color: '#212529', fontSize: width * 0.032 },
      buttonTextStyle: null,
      buttonTouchStyle: null,
      disabled: false,
      buttonAction: 'request',
    },
    ready_to_pickup: {
      text: 'READY TO PICKUP!',
      buttonText: 'Pickup Request',
      textStyle: { color: '#F8AC16' },
      buttonTextStyle: null,
      buttonTouchStyle: null,
      disabled: false,
      buttonAction: 'request',
    },
    request_sent: {
      text: 'REQUEST SENT SUCCESSFULLY',
      buttonText: 'Confirm Pickup',
      textStyle: { color: '#F8AC16', fontSize: width * 0.034 },
      buttonTextStyle: { color: '#FFFFFF', fontWeight: 'bold' },
      buttonTouchStyle: { backgroundColor: '#F8AC16' },
      disabled: false,
      buttonAction: 'confirm',
    },
    request_accepted: {
      text: 'REQUEST ACCEPTED',
      buttonText: 'Confirm Pickup',
      textStyle: { color: '#F8AC16' },
      buttonTextStyle: { color: '#FFFFFF' },
      buttonTouchStyle: { backgroundColor: '#F8AC16' },
      disabled: false,
      cardStyle: { backgroundColor: '#FEF8EB' },
      headerStyle: { backgroundColor: '#FEEFD2', borderColor: '#F8AC16' },
      buttonAction: 'confirm',
    },
    pickup_successful: {
      text: 'PICKUP SUCCESSFULLY!',
      buttonText: 'Confirm Pickup',
      textStyle: { color: '#F8AC16' },
      buttonTextStyle: { color: '#FFFFFF' },
      buttonTouchStyle: { backgroundColor: '#F8AC1650', borderWidth: 0 },
      disabled: true,
      buttonAction: 'confirm',
    },
  };

  const config = statusConfig[status] || {};

  // ------------------------- RENDERING THE COMPONENT -------------------------
  return (
    <View style={{ ...styles.card, ...config.cardStyle }}>
      {/* Header section with status text and timer */}
      <View
        style={[
          styles.header,
          config.headerStyle,
          student?.status === 'pickup_successful' && styles.successHeader,
        ]}
      >
        <Heading
          title={config.text}
          textstyle={[styles.headerText, config.textStyle]}
          boxStyle={[styles.headerBox]}
        />
        {status === 'pickup_successful' ? (
          <Success />
        ) : (
          <View style={styles.timerContainer}>
            {(status !== 'request_accepted' && status !== 'request_sent') && (
              <>
                <View style={styles.timeUnit}>
                  <Text style={styles.timerText}>
                    {time.hours.toString().padStart(2, '0')}
                  </Text>
                  <Text style={styles.unitLabel}>Hrs</Text>
                </View>
                <Text style={styles.timerText}>:</Text>
              </>
            )}
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

      {/* Info section with student image, details, and export button */}
      <TouchableOpacity style={styles.infoContainer}>
        <Image
          source={{
            uri:
              student?.profileUrl ||
              'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655653/Profile_Image_5_at2qw9.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Heading
            title={student?.name}
            textstyle={styles.name}
            boxStyle={styles.nameBox}
          />
          <Text style={styles.grade}>{student?.grade?.name}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text style={styles.pickupTime}>
              {`Today's Pick up time: ${convertTo12HourFormat(pickupTime)}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.exportContainer}
          onPress={() => {
            if (parentLocation) {
              const { latitude, longitude } = parentLocation;
              const schoolLatitude = SCHOOL_LOCATION.latitude;
              const schoolLongitude = SCHOOL_LOCATION.longitude;
              const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${schoolLatitude},${schoolLongitude}&travelmode=driving`;
              Linking.openURL(url).catch((err) =>
                console.error('[Export] Error opening Google Maps:', err)
              );
            } else {
              // console.error('[Export] Parent location not available.');
            }
          }}
        >
          <Export />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Button to trigger pickup request or confirm pickup based on status */}
      <CustomButton
        title={config.buttonText}
        onPress={() => {
          if (config.buttonAction === 'request') handlePickupRequest();
          else if (config.buttonAction === 'confirm') handleConfirmPickup();
        }}
        touchStyle={styles.button}
        textStyle={styles.buttonText}
        disabled={status === 'pickup_successful'}
      />

      {/* Render modals based on various flows */}
      {renderModals()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.05,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0.1,
    marginBottom: 20,
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
  successHeader: {
    backgroundColor: '#FFF3CD',
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
    gap: 5,
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
    borderRadius: 4,
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
    gap: 15,
  },
  image: {
    width: width * 0.22,
    height: height * 0.1,
    borderRadius: 8,
  },
  detailsContainer: {
    paddingVertical: 2,
    flex: 1,
    gap: 10,
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
    gap: 5,
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
});

export default StudentCard;
