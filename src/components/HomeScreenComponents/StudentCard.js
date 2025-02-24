import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Heading from '../Heading';
import CustomModal from '../CustomModal';
import CustomButton from '../CustomButton';

const StudentCard = ({student}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('out_of_range');
  const hoursInSeconds = parseInt(student.timer.hours, 10) * 3600;
  const minutesInSeconds = parseInt(student.timer.minutes, 10) * 60;
  const secondsinseconds = parseInt(student.timer.seconds, 10);
  const totalTimeInSeconds =
    hoursInSeconds + minutesInSeconds + secondsinseconds;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setStatus('out_of_range');
    }
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const getStatusText = status => {
    switch (status) {
      case 'out_of_range':
        return 'You are out of range:';
      case 'ready_to_pickup':
        return 'READY TO PICKUP!';
      case 'request_sent':
        return 'REQUEST SENT SUCCESSFULLY';
      case 'request_accepted':
        return 'REQUEST ACCEPTED';
      case 'pickup_successful':
        return 'PICKUP SUCCESSFULLY!';
      default:
        return '';
    }
  };

  const getButtonText = status => {
    switch (status) {
      case 'out_of_range':
      case 'ready_to_pickup':
        return 'Pickup Request';
      case 'request_sent':
      case 'request_accepted':
      case 'pickup_successful':
        return 'Confirm Pickup';
      default:
        return 'Pickup Request';
    }
  };
  const getStatusTextStyle = status => {
    switch (status) {
      case 'out_of_range':
        return {
          color: '#212529',
          fontWeight: '700',
          fontFamily: 'Outfit',
          fontSize: 13,
        };
      case 'ready_to_pickup':
      case 'request_sent':
      case 'request_accepted':
      case 'pickup_successful':
      default:
        return {color: '#F8AC16', fontWeight: 'normal'};
    }
  };
  const getButtonTextStyle = status => {
    switch (status) {
      case 'out_of_range':
        return {color: '#F8AC1650'};
      case 'ready_to_pickup':
        return null;
      case 'request_sent':
      case 'request_accepted':
        return {color: '#FFFFFF', fontWeight: 'bold'};
      case 'pickup_successful':
        return {color: 'white', fontWeight: 'bold'};
      default:
        return {color: 'black', fontWeight: 'normal'};
    }
  };

  const getButtonTouchStyle = status => {
    switch (status) {
      case 'out_of_range':
        return {borderWidth: 1, borderColor: '#F8AC1650'};
      case 'ready_to_pickup':
        return null;
      case 'request_sent':
      case 'request_accepted':
        return {backgroundColor: '#F8AC16'};
      case 'pickup_successful':
        return {backgroundColor: '#F8AC1650', borderWidth: 0};
      default:
        return {backgroundColor: '#F8AC1650'};
    }
  };
  const getDisabled = status => {
    switch (status) {
      case 'out_of_range':
        return {disabled: false};
      case 'ready_to_pickup':
        return {disabled: false};
      case 'request_sent':
        return {disabled: false};
      case 'request_accepted':
        return {disabled: false};
      case 'pickup_successful':
        return {disabled: true};
      default:
        return {disabled: false};
    }
  };
  const renderModal = () => {
    switch (status) {
      case 'ready_to_pickup':
        return (
          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Jabir bin Hayan Albarsi"
            description="Your request for pick-up of your child has been accepted. Please wait patiently. If they're late, feel free to submit another request."
            primaryButtonText="Ok, Got it"
            primaryButtonAction={() => console.log('Acknowledged')}
          />
        );
      case 'out_of_range':
        return (
          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Enable Location"
            description="By turning on location, will allow us to accurately track your child's pickup location and notify you when they are on their way to be picked up or have been dropped off. This will help ensure a safe and efficient pickup process."
            primaryButtonText="Go to Settings"
            primaryButtonAction={() => console.log('Settings Pressed')}
          />
        );
      case 'request_accepted':
        return (
          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Confirmation!"
            description="Have you picked up your child from school?"
            primaryButtonText="Yes, Confirm"
            primaryButtonAction={() => console.log('Confirmed')}
            secondaryButtonText="No, I Don’t"
            secondaryButtonAction={() => console.log('Not Confirmed')}
            style={{
              title: {marginBottom: 5},
              description: {marginBottom: 20},
              titleText: {fontWeight: '700'},
              descriptionText: {fontSize: 14, marginBottom: 10},
            }}
          />
        );
      default:
        return null; // Return null for undefined status
    }
  };
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.header,
          student.status === 'pickup_successful' && styles.successHeader,
        ]}>
        <Heading
          title={getStatusText(status)}
          textstyle={[styles.headerText, getStatusTextStyle(status)]}
          boxStyle={[styles.headerBox]}
        />

        {student.status !== 'pickup_successful' && (
          <View style={styles.timerContainer}>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {hours.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Hrs</Text>
            </View>
            <Text style={styles.timerText}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {minutes.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Mins</Text>
            </View>
            <Text style={styles.timerText}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>
                {seconds.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.unitLabel}>Secs</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Image
          source={{uri: student.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Heading
            title={student.name}
            textstyle={styles.name}
            boxStyle={styles.nameBox}
          />
          <Text style={styles.grade}>{student.grade}</Text>
          <View style={styles.pickupTimeContainer}>
            <Text style={styles.pickupTimeLabel}>Today's Pick up time:</Text>
            <Text style={styles.pickupTime}>{student.pickupTime}</Text>
          </View>
        </View>
      </View>
      <CustomButton
        title={getButtonText(status)}
        onPress={() => setModalVisible(true)}
        touchStyle={[styles.button, getButtonTouchStyle(status)]}
        textStyle={[styles.buttonText, getButtonTextStyle(status)]}
        disabled={getDisabled(status).disabled}
      />
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    minWidth: 300,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  successHeader: {
    backgroundColor: '#FFF3CD',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 13,
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
    gap: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 4,
  },
  timeUnit: {
    width: 40,
    alignItems: 'center',
    padding: 2,
    borderRadius: 4,
  },
  timerText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#212529',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    width: 84,
    height: 87,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    gap: 10,
  },
  nameBox: {
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#212529',
  },
  grade: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  pickupTimeLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  pickupTime: {
    fontWeight: '500',
    fontSize: 16,
    color: '#6c757d',
  },
  button: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#F8AC16',
    fontWeight: 'bold',
  },
});

export default StudentCard;
