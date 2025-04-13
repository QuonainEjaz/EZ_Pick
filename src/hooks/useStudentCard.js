import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'https://api.ezpick.co';

const useStudentCard = (student, token) => {
  // ------------------------- Socket & Status States -------------------------
  const [socket, setSocket] = useState(null);
  const [socketStatus, setSocketStatus] = useState('Disconnected');
  const approvedRequests = useRef({});
  // Status can be: out_of_range, in_range, ready_to_pickup, request_sent, request_accepted, pickup_successful
  const [status, setStatus] = useState('out_of_range');
  const [timer, setTimer] = useState(0);
  const [requestTimer, setRequestTimer] = useState(5);
  const [requestTimerActive, setRequestTimerActive] = useState(false);
  const [showRequestAgain, setShowRequestAgain] = useState(false);
  const [headerCountdown, setHeaderCountdown] = useState(5); // 5 seconds
  const [headerCountdownActive, setHeaderCountdownActive] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [parentLocation, setParentLocation] = useState(null);

  // ------------------------- Modal States -------------------------
  const [outOfRangeModalVisible, setOutOfRangeModalVisible] = useState(false);
  const [inRangeModalVisible, setInRangeModalVisible] = useState(false);
  const [requestAcceptedModalVisible, setRequestAcceptedModalVisible] = useState(false);
  const [pickupRequestModalVisible, setPickupRequestModalVisible] = useState(false);

  // ------------------------- Constants -------------------------
  const pickupTime = '17:45'; // Pickup time string (could be dynamic)
  const SCHOOL_LOCATION = useMemo(() => ({
    latitude: student?.grade?.school.lat,
    longitude: student?.grade?.school.long,
  }), [student?.grade?.school.lat, student?.grade?.school.long]);

  // ------------------------- SOCKET SETUP -------------------------
  // Create and configure socket connection using token.
  const createSocket = useCallback((token) => {
    const sock = io(SOCKET_ENDPOINT, {
      auth: { token, role: 'CLIENT' },
      transports: ['websocket'],
    });

    sock.on('connect', () => {
      setSocketStatus('Connected');
      // Fetch student details on connection
      sendFetchStudent(sock, student.parentId);
    });

    sock.on('disconnect', () => {
      setSocketStatus('Disconnected');
    });

    // When a pickup request event is received
    sock.on('_parent_requests', (data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const requests = data[0]?.result || [];
        updateStudentStatuses(requests);
      }
    });

    // When the server approves the pickup request
    sock.on('_approved_request', (data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const approvedStudent = data[0];
        handleApprovedRequest(approvedStudent);
      }
    });

    return sock;
  }, [student.parentId, handleApprovedRequest, updateStudentStatuses]);

  // Emit _fetch_student event to fetch/update student data
  const sendFetchStudent = (sock, parentId) => {
    if (sock && sock.connected) {
      sock.emit('_fetch_student', { parentId, socketId: sock.id }, (response) => {
        // Handle response if needed
      });
    }
  };

  // Update student statuses based on server response
  const updateStudentStatuses = useCallback((requests) => {
    const request = requests.find(r => r.studentId === student.id);
    if (request) {
      setStatus(request.status);
      // Update other relevant states based on request data
    }
  }, [student.id, setStatus]);

  // Handle approved request from server
  const handleApprovedRequest = useCallback((approvedStudent) => {
    if (approvedStudent.studentId === student.id) {
      setStatus('request_accepted');
      approvedRequests.current[approvedStudent.studentId] = approvedStudent;
    }
  }, [student.id, setStatus]);

  // Send pickup request to server
  const sendRequestStudent = (sock, studentId) => {
    if (sock && sock.connected) {
      const requestTime = new Date().toISOString();
      const params = {
        parentId: student.parentId || 0,
        studentId: studentId,
        clientId: student.clientId || 0,
        timestamp: requestTime,
        gradeId: student.gradeId || 0,
        pickUpGuardian: student.pickUpGuardian || '',
      };

      sock.emit('_request_student', params, () => {
        setStatus('request_sent');
        // Start the 5-second countdown timer
        setHeaderCountdown(5);
        setHeaderCountdownActive(true);
        setShowRequestAgain(false);
      });
    }
  };

  // Send confirmation of pickup to server
  const sendConfirmRequest = (sock, studentId) => {
    if (sock && sock.connected) {
      const confirmTime = new Date().toISOString();
      sock.emit('_confirm_request', {
        studentId: studentId,
        timestamp: confirmTime,
        gradeId: student.gradeId || 0,
      }, () => {
        setStatus('pickup_successful');
      });
    }
  };

  // Update parent's location
  const sendUpdateLocation = (sock, lat, lng) => {
    if (sock && sock.connected) {
      sock.emit('_update_location', { lat, lng });
    }
  };

  // ------------------------- LOCATION & PERMISSION HANDLING -------------------------
  // Check location permission and update the state accordingly.
  const checkPermission = async () => {
    const permissionStatus =
      Platform.OS === 'ios'
        ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (permissionStatus === RESULTS.GRANTED) {
      setIsLocationEnabled(true);
      setStatus('in_range'); // Assume in range if permission granted; this will be rechecked later.
    } else {
      setIsLocationEnabled(false);
    }
  };

  // Fetch current location using Geolocation service.
  const fetchLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setIsLocationEnabled(false);
        return;
      }
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setParentLocation({ latitude, longitude });
        setIsLocationEnabled(true);
      },
      (error) => {
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

  // Convert pickup time to a 12-hour format for display
  const convertTo12HourFormat = (pickupTime) => {
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

  // ------------------------- USER ACTIONS -------------------------
  // Handle pickup request button press.
  const handlePickupRequest = () => {
    setPickupRequestModalVisible(true);
  };

  // Handle confirmation after showing pickup request modal
  const handlePickupRequestConfirmed = () => {
    setPickupRequestModalVisible(false);
    
    if (socket?.connected) {
      // Send the request to the server
      sendRequestStudent(socket, student.id);
      
      // Start the 5-second countdown timer for status change
      setRequestTimer(90);
      setRequestTimerActive(true);

      // Start the 5-minute countdown in header
      setHeaderCountdown(90);
      setHeaderCountdownActive(true);
      setShowRequestAgain(false);
    } else {
      Alert.alert('Error', 'Socket not connected');
    }
  };

  // Handle request again button press
  const handleRequestAgain = () => {
    if (socket?.connected) {
      // Send the request to the server
      sendRequestStudent(socket, student.id);
      
      // Reset and start the header countdown
      setHeaderCountdown(300);
      setHeaderCountdownActive(true);
      setShowRequestAgain(false);
    } else {
      Alert.alert('Error', 'Socket not connected');
    }
  };

  // Handle confirmation of pickup.
  const handleConfirmPickup = () => {
    if (socket?.connected) {
      sendConfirmRequest(socket, student.id);
    } else {
      Alert.alert('Error', 'Socket not connected');
    }
  };

  // Open Google Maps directions
  const openMapDirections = () => {
    if (parentLocation) {
      const { latitude, longitude } = parentLocation;
      const schoolLatitude = SCHOOL_LOCATION.latitude;
      const schoolLongitude = SCHOOL_LOCATION.longitude;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${schoolLatitude},${schoolLongitude}&travelmode=driving`;
      Linking.openURL(url).catch((err) => {
        console.error('[Export] Error opening Google Maps:', err);
      });
    }
  };

  // Handle location settings
  const handleOpenLocationSettings = () => {
    Linking.openSettings();
    checkPermission();
    setOutOfRangeModalVisible(false);
  };

  // Handle ready to pickup action
  const handleReadyToPickup = () => {
    setStatus('ready_to_pickup');
    setInRangeModalVisible(false);
  };

  // Format countdown time for display
  const formatCountdownTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  // ------------------------- EFFECTS -------------------------
  // Initial location fetch after mount
  useEffect(() => {
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
    if (parentLocation && SCHOOL_LOCATION.latitude && SCHOOL_LOCATION.longitude) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION);
      const isInRange = distance <= 1000; // 1km threshold
      setStatus(isInRange ? 'in_range' : 'out_of_range');
    }
  }, [parentLocation, SCHOOL_LOCATION]);

  // Check permissions on relevant state changes.
  useEffect(() => {
    checkPermission();
  }, [outOfRangeModalVisible, inRangeModalVisible, status, isLocationEnabled]);

  // Start socket connection when token is available.
  useEffect(() => {
    if (token) {
      try {
        const sock = createSocket(token);
        if (!sock) throw new Error('Failed to create socket.');
        setSocket(sock);
        return () => {
          if (sock) {
            sock.disconnect();
          }
        };
      } catch (error) {
        console.error('[Socket] Error during socket setup:', error);
      }
    }
  }, [token, student, createSocket]);

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

  // Request countdown timer after confirmation
  useEffect(() => {
    let interval;
    if (requestTimerActive && requestTimer > 0) {
      interval = setInterval(() => {
        setRequestTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setRequestTimerActive(false);
            setStatus('request_sent');
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [requestTimerActive, requestTimer]);

  // Header countdown timer effect
  useEffect(() => {
    let interval;
    if (headerCountdownActive && headerCountdown > 0) {
      interval = setInterval(() => {
        setHeaderCountdown(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setHeaderCountdownActive(false);
            setShowRequestAgain(true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [headerCountdownActive, headerCountdown]);

  // Build time object for display
  const time = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: (timer % 60).toFixed(0),
  };

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
      textStyle: { color: '#212529', fontSize: undefined },
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
      textStyle: { color: '#F8AC16', fontSize: undefined },
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

  // Update location periodically
  useEffect(() => {
    let interval;
    if (parentLocation && socket?.connected) {
      interval = setInterval(() => {
        sendUpdateLocation(socket, parentLocation.latitude, parentLocation.longitude);
      }, 10000); // Update every 10 seconds
    }
    return () => clearInterval(interval);
  }, [parentLocation, socket]);

  return {
    student,
    status,
    time,
    pickupTime,
    parentLocation,
    socketStatus,
    isLocationEnabled,
    outOfRangeModalVisible,
    inRangeModalVisible,
    requestAcceptedModalVisible,
    pickupRequestModalVisible,
    requestTimerActive,
    requestTimer,
    statusConfig: statusConfig[status] || {},
    convertTo12HourFormat,
    handlePickupRequest,
    handlePickupRequestConfirmed,
    handleConfirmPickup,
    handleOpenLocationSettings,
    handleReadyToPickup,
    openMapDirections,
    setOutOfRangeModalVisible,
    setInRangeModalVisible,
    setRequestAcceptedModalVisible,
    setPickupRequestModalVisible,
    showRequestAgain,
    headerCountdown,
    headerCountdownActive,
    formatCountdownTime,
    handleRequestAgain,
  };
};

export default useStudentCard; 