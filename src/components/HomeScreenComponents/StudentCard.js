import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Heading from '../Heading';
import CustomModal from '../CustomModal';
import HoverableButton from '../HoverableButton';

const StudentCard = ({student}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Heading
          title="You are out of Range:"
          textstyle={styles.headerText}
          boxStyle={styles.headerBox}
        />
        <View style={styles.timerContainer}>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.hours}</Text>
            <Text style={styles.unitLabel}>Hrs</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.minutes}</Text>
            <Text style={styles.unitLabel}>Mins</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>{student.timer.seconds}</Text>
            <Text style={styles.unitLabel}>Secs</Text>
          </View>
        </View>
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

      <HoverableButton
        title="Pickup Request"
        onPress={() => {
          setModalVisible(true);
        }}
        touchStyle={[
          styles.button,
          student.outOfRange && styles.buttonDisabled,
        ]}
        textStyle={[
          styles.buttonText,
          student.outOfRange && styles.buttonTextDisabled,
        ]}
        hoverable={true}
      />
      {/* <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Enable Location"
        description="By turning on location, will allow us to accurately track your child's pickup location and notify you when they are on their way to be picked up or have been dropped off. This will help ensure a safe and efficient pickup process.  "
        // imageSource={require('../assets/location-icon.png')}
        primaryButtonText="Go to Settings"
        primaryButtonAction={() => console.log('Settings Pressed')}
      /> */}
      {/* <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Jabir bin Hayan Albarsi"
        description="Your request for pick-up of your child has been accepted. Please wait patiently. If they're late, feel free to submit another request."
        // imageSource={require('../assets/profile-image.png')}
        primaryButtonText="Ok, Got it"
        primaryButtonAction={() => console.log('Acknowledged')}
      /> */}
      {/* <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmation!"
        description="Have you picked up your child from school?"
        primaryButtonText="Yes, Confirm"
        primaryButtonAction={() => console.log('Confirmed')}
        secondaryButtonText="No, I Don’t"
        secondaryButtonAction={() => console.log('Not Confirmed')}
        style={{
          title: {marginBottom: 5, },
          description: {marginBottom: 20},
          titleText: {fontWeight: '700'},
          descriptionText: {fontSize: 14, marginBottom: 10},
        }}
      /> */}
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
  headerBox: {
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#212529',
    textTransform: 'uppercase',
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
  unitLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: '#6c757d',
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
    flex: 1,
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
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8ac16',
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#f8ac16',
  },
  buttonTextDisabled: {
    color: '#f8ac16',
  },
});

export default StudentCard;
