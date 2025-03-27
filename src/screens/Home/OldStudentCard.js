import React, {useState, useEffect, useRef} from 'react';
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
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');

const StudentCard = ({student}) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [status, setStatus] = useState('out_of_range');
  const [timer, setTimer] = useState(0);
  const [parentLocation, setParentLocation] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const pickupTime = '17:45';
  const SCHOOL_LOCATION = {
    latitude: student?.grade?.school.lat,
    longitude: student?.grade?.school.long,
  };

  const checkPermission = async () => {
    console.log('Checking permissions');
    const permissionStatus =
      Platform.OS === 'ios'
        ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (permissionStatus === RESULTS.GRANTED) {
      setIsLocationEnabled(true);
      setStatus('in_range');
      console.log('Location permission granted');
    } else if (permissionStatus === RESULTS.DENIED) {
      setIsLocationEnabled(false);
      console.log('Location permission denied');
    } else {
      setIsLocationEnabled(false);
      console.log('Location permission not granted');
    }
  };

  useEffect(() => {
    checkPermission();
  }, [locationModalVisible, status, isLocationEnabled]);

  const convertTo12HourFormat = pickupTime => {
    const [hours, minutes] = pickupTime.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedTime;
  };

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
      },
      error => {
        console.log('Error fetching location:', error);
        setIsLocationEnabled(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

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
  }, []);

  useEffect(() => {
    if (parentLocation) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION);
      const isInRange = distance <= 1000000000;
      if (!isInRange) {
        setStatus('out_of_range');
      }
    }
  }, [parentLocation]);

  const openGoogleMaps = () => {
    if (parentLocation) {
      const {latitude, longitude} = parentLocation;
      const schoolLatitude = SCHOOL_LOCATION.latitude;
      const schoolLongitude = SCHOOL_LOCATION.longitude;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${schoolLatitude},${schoolLongitude}&travelmode=driving`;

      console.log('Google Maps URL:', url);
      Linking.openURL(url)
        .then(() => {
          console.log('Google Maps opened successfully');
        })
        .catch(err => {
          console.error('Error opening Google Maps:', err);
        });
    } else {
      console.error('Parent location is not available');
    }
  };

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
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const time = {
    hours: Math.floor(timer / 3600),
    minutes: Math.floor((timer % 3600) / 60),
    seconds: (timer % 60).toFixed(0),
  };

  const statusConfig = {
    out_of_range: {
      text: 'You are out of range:',
      buttonText: 'Pickup Request',
      textStyle: {color: '#212529'},
      buttonTextStyle: {color: '#F8AC1650'},
      buttonTouchStyle: {borderWidth: 1, borderColor: '#F8AC1650'},
      disabled: false,
    },
    in_range: {
      text: `You are in School's range:`,
      buttonText: 'Pickup Request',
      textStyle: {color: '#212529', fontSize: width * 0.032},
      buttonTextStyle: null,
      buttonTouchStyle: null,
      disabled: false,
    },
    ready_to_pickup: {
      text: 'READY TO PICKUP!',
      buttonText: 'Pickup Request',
      textStyle: {color: '#F8AC16'},
      buttonTextStyle: null,
      buttonTouchStyle: null,
      disabled: false,
    },
    request_sent: {
      text: 'REQUEST SENT SUCCESSFULLY',
      buttonText: 'Confirm Pickup',
      textStyle: {color: '#F8AC16', fontSize: width * 0.034},
      buttonTextStyle: {color: '#FFFFFF', fontWeight: 'bold'},
      buttonTouchStyle: {backgroundColor: '#F8AC16'},
      disabled: false,
    },
    request_accepted: {
      text: 'REQUEST ACCEPTED',
      buttonText: 'Confirm Pickup',
      textStyle: {color: '#F8AC16'},
      buttonTextStyle: {color: '#FFFFFF'},
      buttonTouchStyle: {backgroundColor: '#F8AC16'},
      disabled: false,
      cardStyle: {backgroundColor: '#FEF8EB'},
      headerStyle: {backgroundColor: '#FEEFD2', borderColor: '#F8AC16'},
    },
    pickup_successful: {
      text: 'PICKUP SUCCESSFULLY!',
      buttonText: 'Confirm Pickup',
      textStyle: {color: '#F8AC16'},
      buttonTextStyle: {color: '#FFFFFF'},
      buttonTouchStyle: {backgroundColor: '#F8AC1650', borderWidth: 0},
      disabled: true,
    },
  };

  const renderModal = () => {
    const modalConfig = {
      in_range: {
        title: student.name,
        description:
          "Your request for pick-up of your child has been accepted. Please wait patiently. If they're late, feel free to submit another request.",
        primaryButtonText: 'Ok, Got it',
        primaryButtonAction: () => setStatus('ready_to_pickup'),
      },
      ready_to_pickup: {
        title: student.name,
        description:
          "Your request for pick-up of your child has been accepted. Please wait patiently. If they're late, feel free to submit another request.",
        primaryButtonText: 'Ok, Got it',
        primaryButtonAction: () => console.log('Acknowledged'),
      },
      out_of_range: {
        title: 'Enable Location',
        description:
          "By turning on location, will allow us to accurately track your child's pickup location and notify you when they are on their way to be picked up or have been dropped off. This will help ensure a safe and efficient pickup process.",
        primaryButtonText: 'Go to Settings',
        primaryButtonAction: () => {
          Linking.openSettings();
          checkPermission();
        },
      },
      request_accepted: {
        title: 'Confirmation!',
        description: 'Have you picked up your child from school?',
        primaryButtonText: 'Yes, Confirm',
        primaryButtonAction: () => console.log('Confirmed'),
        secondaryButtonText: 'No, I Don’t',
        secondaryButtonAction: () => console.log('Not Confirmed'),
        style: {
          title: {marginBottom: 5},
          description: {marginBottom: 20},
          titleText: {fontWeight: '700'},
          descriptionText: {fontSize: 14, marginBottom: 10},
        },
      },
    };
    return modalConfig[status] ? (
      <CustomModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        {...modalConfig[status]}
      />
    ) : null;
  };

  const config = statusConfig[status] || {};

  
  return (
    <View style={{...styles.card, ...config.cardStyle}}>
      <View
        style={[
          styles.header,
          config.headerStyle,
          student.status === 'pickup_successful' && styles.successHeader,
        ]}>
        <Heading
          title={config.text}
          textstyle={[styles.headerText, config.textStyle]}
          boxStyle={[styles.headerBox]}
        />
        {status === 'pickup_successful' && <Success />}
        {status !== 'pickup_successful' && (
          <View style={styles.timerContainer}>
            {status !== 'request_accepted' && status !== 'request_sent' && (
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
            title={student.name}
            textstyle={styles.name}
            boxStyle={styles.nameBox}
          />
          <Text style={styles.grade}>{student?.grade?.name}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text
              style={
                styles.pickupTime
              }>{`Today's Pick up time: ${convertTo12HourFormat(
              pickupTime,
            )}`}</Text>
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
            if (!isLocationEnabled) {
              setLocationModalVisible(true);
            } else {
              console.log('Button pressed');
              setLocationModalVisible(true);
            }
          }
          else if(status === 'in_range' || status === 'ready_to_pickup') {
            setLocationModalVisible(true);
          }
        }}
        touchStyle={[styles.button, config.buttonTouchStyle]}
        textStyle={[styles.buttonText, config.buttonTextStyle]}
        disabled={config.disabled}
      />
      {renderModal()}
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
    shadowOffset: {width: 0, height: 2},
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
  pickupTimeLabel: {
    fontWeight: '500',
    fontSize: width * 0.036,
    color: '#6c757d',
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