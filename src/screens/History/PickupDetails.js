import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import { useSelector } from 'react-redux';

const PickupDetails = ({ route }) => {
  const { params } = route;
  const windowWidth = Dimensions.get('window').width;
  const students = useSelector(state => state.students.students);
  const student = students.find(student => student.id === params.id);

  // Dynamically generate DETAILS_CONFIG after student is defined
  const DETAILS_CONFIG = [
    [
      { label: 'Student ID', value: 'id' },
      { label: 'Grade', value: student?.grade?.name || 'N/A' }, // Use optional chaining and fallback
    ],
    [
      { label: 'Request by', value: 'requestBy' },
      { label: 'Date', value: 'date' },
    ],
    [
      { label: 'Request Time', value: 'requestTime' },
      { label: 'Response', value: 'responseTime' },
    ],
  ];

  const DetailRow = ({ items }) => (
    <View style={styles.row}>
      {items.map(({ label, value }) => (
        <View key={label} style={styles.column}>
          <SubHeading text={label} style={styles.label} />
          <SubHeading text={params[value] || value} style={styles.value} />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: params.imageSource }}
            style={styles.profileImage}
            resizeMode="cover"
            defaultSource={require('../../assets/pics/personPlaceholder.png')}
          />
          <View style={styles.textContainer}>
            <Heading
              title={params.name}
              textstyle={styles.userName}
              boxStyle={styles.userNameContainer}
            />
            <SubHeading text={params.pickupTime} style={styles.dateTime} />
          </View>
          <View style={styles.statusContainer}>
            <SubHeading text={params.status} style={styles.statusText} />
          </View>
        </View>

        {/* Details Section */}
        <View
          style={[
            styles.detailsContainer,
            { maxWidth: Math.min(400, windowWidth - 40) },
          ]}>
          <View style={styles.detailsHeader}>
            <Heading title="Details" textstyle={styles.headerTitle} />
          </View>

          <View style={styles.detailsContent}>
            {DETAILS_CONFIG.map((items, index) => (
              <DetailRow key={`row-${index}`} items={items} />
            ))}

            <View style={styles.confirmSection}>
              <SubHeading text="Confirm Pickup" style={styles.label} />
              <SubHeading text={params.confirmTime} style={styles.value} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    gap: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
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
  userName: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    textTransform: 'capitalize',
  },
  dateTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF5D6',
    paddingHorizontal: 14,
    marginVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#F8AC16',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    minWidth: 300,
    shadowColor: '#67676714',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginBottom: 14,
    paddingBottom: 6,
  },
  headerTitle: {
    color: '#212529',
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '700',
  },
  detailsContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#212529',
    fontFamily: 'outfits',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
    textTransform: 'capitalize',
  },
  confirmSection: {
    gap: 8,
  },
});

export default React.memo(PickupDetails);