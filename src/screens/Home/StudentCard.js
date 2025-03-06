import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import Heading from '../../components/Heading';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';
import Success from '../../assets/Icons/svg/Successfull';
import Export from '../../assets/Icons/svg/Export';

const { width, height } = Dimensions.get('window');

// School coordinates (replace with your school's actual coordinates)
const SCHOOL_LOCATION = {
  latitude: 24.7136, // Example latitude
  longitude: 46.6753, // Example longitude
};

const StudentCard = ({ student }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(student.range);
  const [timer, setTimer] = useState(5);
  const [parentLocation, setParentLocation] = useState(null);

  // Fetch parent's location
  useEffect(() => {
    const fetchLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setParentLocation({ latitude, longitude });
        },
        error => {
          console.log('Error fetching location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    fetchLocation();
  }, []);

  // Calculate distance and set range
  useEffect(() => {
    if (parentLocation) {
      const distance = getDistance(parentLocation, SCHOOL_LOCATION); // Distance in meters
      const isInRange = distance <= 50000000; // 0.5 km = 500 meters

      if (isInRange) {
        setStatus('in_range');
      } else {
        setStatus('out_of_range');
      }
    }
  }, [parentLocation]);

  const totalTimeInSeconds = useMemo(() => {
    const hoursInSeconds = parseInt(timer, 10) * 3600;
    const minutesInSeconds = parseInt(timer, 10) * 60;
    const secondsInSeconds = parseInt(timer, 10);
    return hoursInSeconds + minutesInSeconds + secondsInSeconds;
  }, [timer]);

  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setStatus(student.range);
    }
  }, [timeLeft, student.range]);

  const time = useMemo(
    () => ({
      hours: Math.floor(timeLeft / 3600),
      minutes: Math.floor((timeLeft % 3600) / 60),
      seconds: timeLeft % 60,
    }),
    [timeLeft],
  );

  const statusConfig = useMemo(
    () => ({
      out_of_range: {
        text: 'You are out of range:',
        buttonText: 'Pickup Request',
        textStyle: { color: '#212529' },
        buttonTextStyle: { color: '#F8AC1650' },
        buttonTouchStyle: { borderWidth: 1, borderColor: '#F8AC1650' },
        disabled: false,
      },
      in_range: {
        text: `You are in School's range:`,
        buttonText: 'Pickup Request',
        textStyle: { color: '#212529', fontSize: width * 0.032 },
        buttonTextStyle: null,
        buttonTouchStyle: null,
        disabled: false,
      },
      ready_to_pickup: {
        text: 'READY TO PICKUP!',
        buttonText: 'Pickup Request',
        textStyle: { color: '#F8AC16' },
        buttonTextStyle: null,
        buttonTouchStyle: null,
        disabled: false,
      },
      request_sent: {
        text: 'REQUEST SENT SUCCESSFULLY',
        buttonText: 'Confirm Pickup',
        textStyle: { color: '#F8AC16', fontSize: width * 0.034 },
        buttonTextStyle: { color: '#FFFFFF', fontWeight: 'bold' },
        buttonTouchStyle: { backgroundColor: '#F8AC16' },
        disabled: false,
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
      },
      pickup_successful: {
        text: 'PICKUP SUCCESSFULLY!',
        buttonText: 'Confirm Pickup',
        textStyle: { color: '#F8AC16' },
        buttonTextStyle: { color: '#FFFFFF' },
        buttonTouchStyle: { backgroundColor: '#F8AC1650', borderWidth: 0 },
        disabled: true,
      },
    }),
    [],
  );

  const renderModal = () => {
    const modalConfig = {
      ready_to_pickup: {
        title: 'Jabir bin Hayan Albarsi',
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
        primaryButtonAction: () => console.log('Settings Pressed'),
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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
          source={{uri: student?.profileUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Heading
            title={student.name}
            textstyle={styles.name}
            boxStyle={styles.nameBox}
          />
          <Text style={styles.grade}>{student?.grade.grade}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text
              style={
                styles.pickupTime
              }>{`Today's Pick up time: ${student.createdAt}`}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.exportContainer}>
          <Export />
        </TouchableOpacity>
      </TouchableOpacity>
      <CustomButton
        title={config.buttonText}
        onPress={() => {
          console.log('Button pressed');
          setModalVisible(prev => !prev);
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
