import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Custom components and icons
import Heading from '../../components/Heading';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';
import Success from '../../assets/Icons/svg/Successfull';
import Export from '../../assets/Icons/svg/Export';

// Custom hook for functionality
import useStudentCard from '../../hooks/useStudentCard';

const {width, height} = Dimensions.get('window');

const StudentCard = ({data}) => {
  const {item, token} = data;
  const student = item;

  // Use our custom hook for all functionality
  const {
    status,
    time,
    pickupTime,
    outOfRangeModalVisible,
    inRangeModalVisible,
    requestAcceptedModalVisible,
    pickupRequestModalVisible,
    requestTimerActive,
    requestTimer,
    showRequestAgain,
    headerCountdown,
    headerCountdownActive,
    statusConfig,
    convertTo12HourFormat,
    handlePickupRequest,
    handlePickupRequestConfirmed,
    handleConfirmPickup,
    handleOpenLocationSettings,
    handleReadyToPickup,
    handleRequestAgain,
    openMapDirections,
    formatCountdownTime,
    setOutOfRangeModalVisible,
    setInRangeModalVisible,
    setRequestAcceptedModalVisible,
    setPickupRequestModalVisible,
  } = useStudentCard(student, token);

  // Render header timer or request again button
  const renderHeaderTimer = () => {
    if (status === 'request_sent') {
      if (showRequestAgain) {
        return (
          <CustomButton
            title="Request again"
            onPress={handleRequestAgain}
            touchStyle={styles.requestAgainButton}
            textStyle={styles.requestAgainButtonText}
          />
        );
      }
      if (headerCountdownActive) {
        const time = formatCountdownTime(headerCountdown);
        return (
          <View style={styles.timerContainer}>
            <View style={styles.timeUnit}>
              <Text style={styles.timerText}>{time.seconds}</Text>
              <Text style={styles.unitLabel}>Secs</Text>
            </View>
          </View>
        );
      }
    }

    // Default timer display
    return (
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
        {requestTimerActive ? (
          <View style={styles.timeUnit}>
            <Text style={styles.timerText}>
              {requestTimer.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.unitLabel}>Secs</Text>
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>
    );
  };

  // Render modals
  const renderModals = () => (
    <>
      {outOfRangeModalVisible && (
        <CustomModal
          visible={outOfRangeModalVisible}
          onClose={() => setOutOfRangeModalVisible(false)}
          title="Enable Location"
          description="By turning on location, we can accurately track your child's pickup location and notify you when they are on their way."
          primaryButtonText="Go to Settings"
          primaryButtonAction={handleOpenLocationSettings}
        />
      )}
      {inRangeModalVisible && (
        <CustomModal
          visible={inRangeModalVisible}
          onClose={() => setInRangeModalVisible(false)}
          title={student?.name}
          description="You are within the school range. You can now request a pickup."
          primaryButtonText="Ok, Got it"
          primaryButtonAction={handleReadyToPickup}
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
          secondaryButtonText="No, I Don't"
          secondaryButtonAction={() => {
            setRequestAcceptedModalVisible(false);
          }}
          style={{
            title: {marginBottom: 5},
            description: {marginBottom: 20},
            titleText: {fontWeight: '700'},
            descriptionText: {fontSize: 14, marginBottom: 10},
          }}
        />
      )}
      {pickupRequestModalVisible && (
        <CustomModal
          visible={pickupRequestModalVisible}
          onClose={() => setPickupRequestModalVisible(false)}
          title={student?.name}
          description="Your request for pick up your child has been accepted. Please wait patiently. If they're late, feel free to submit another request."
          imageSource={{
            uri:
              student?.profileUrl ||
              'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655653/Profile_Image_5_at2qw9.png',
          }}
          primaryButtonText="Ok, Got it"
          primaryButtonAction={handlePickupRequestConfirmed}
          style={{
            title: {marginBottom: 5},
            description: {marginBottom: 20},
            titleText: {fontWeight: '700', fontSize: 18, color: '#212529'},
            descriptionText: {fontSize: 16, lineHeight: 22, color: '#6c757d'},
          }}
        />
      )}
    </>
  );

  return (
    <View style={{...styles.card, ...statusConfig.cardStyle}}>
      {/* Header section with status text and timer/button */}
      <View
        style={[
          styles.header,
          statusConfig.headerStyle,
          status === 'pickup_successful' && styles.successHeader,
        ]}>
        <Heading
          title={requestTimerActive ? 'REQUEST SENDING...' : statusConfig.text}
          textstyle={[styles.headerText, statusConfig.textStyle]}
          boxStyle={[styles.headerBox]}
        />
        {status === 'pickup_successful' ? <Success /> : renderHeaderTimer()}
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
          onPress={openMapDirections}>
          <Export />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Button to trigger pickup request or confirm pickup based on status */}
      <CustomButton
        title={statusConfig.buttonText}
        onPress={() => {
          if (statusConfig.buttonAction === 'request') handlePickupRequest();
          else if (statusConfig.buttonAction === 'confirm')
            handleConfirmPickup();
        }}
        touchStyle={{
          ...styles.button,
          ...statusConfig.buttonTouchStyle,
        }}
        textStyle={{
          ...styles.buttonText,
          ...statusConfig.buttonTextStyle,
        }}
        disabled={status === 'pickup_successful' || requestTimerActive}
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
  requestAgainButton: {
    backgroundColor: '#F8AC16',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: width * 0.3, // Match the width of the timer container
  },
  requestAgainButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default StudentCard;
