import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';

const PickupDetails = ({route}) => {
  const {
    imageSource,
    pickupTime,
    status,
    name,
    id,
    grade,
    requestBy,
    date,
    requestTime,
    responseTime,
    confirmTime,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* User Info Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={{uri: imageSource}}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Heading
              title={name}
              textstyle={styles.userName}
              boxStyle={styles.userNameContainer}
            />
            <SubHeading text={pickupTime} style={styles.dateTime} />
          </View>
          <View style={styles.statusContainer}>
            <SubHeading text={status} style={styles.statusText} />
          </View>
        </View>

        {/* Details Container Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Heading title="Details" textstyle={styles.headerTitle} />
          </View>

          <View style={styles.detailsContent}>
            <View style={styles.row}>
              <View style={styles.column}>
                <SubHeading text="Student ID" style={styles.label} />
                <SubHeading text={id} style={styles.value} />
              </View>
              <View style={styles.column}>
                <SubHeading text="Grade" style={styles.label} />
                <SubHeading text={grade} style={styles.value} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <SubHeading text="Request by" style={styles.label} />
                <SubHeading text={requestBy} style={styles.value} />
              </View>
              <View style={styles.column}>
                <SubHeading text="Date" style={styles.label} />
                <SubHeading text={date} style={styles.value} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <SubHeading text="Request Time" style={styles.label} />
                <SubHeading text={requestTime} style={styles.value} />
              </View>
              <View style={styles.column}>
                <SubHeading text="Response" style={styles.label} />
                <SubHeading text={responseTime} style={styles.value} />
              </View>
            </View>

            <View style={styles.confirmSection}>
              <SubHeading text="Confirm Pickup" style={styles.label} />
              <SubHeading text={confirmTime} style={styles.value} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  // User Info Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    minWidth: 320,
    minHeight: 74,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    textTransform: 'capitalize',
  },
  dateTime: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  statusContainer: {
    backgroundColor: '#FEF5D6',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 14,
  },
  statusText: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8AC16',
  },
  // Details Container Styles
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    maxWidth: Math.min(400, windowWidth - 40),
    minWidth: 300,
    shadowColor: '#67676714',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginBottom: 14,
  },
  headerTitle: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    lineHeight: 22,
  },
  detailsContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '900',
    color: '#212529',
    lineHeight: 18,
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  confirmSection: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
});

export default PickupDetails;

