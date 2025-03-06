import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import CustomOptionsModal from '../../components/AuthScreenComponents/CustomOptionsModal';
import AuthConfirmationModal from '../../components/AuthConfirmationModal';
import { useSelector } from 'react-redux';
import Svg, { Circle, Rect } from 'react-native-svg';

const OptionButton = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}>
    <Circle cx={13} cy={13} r={13} fill="#F8F8F9" />
    <Rect
      width={3.111}
      height={3.111}
      x={11.445}
      y={6}
      fill="#525252"
      rx={1.556}
    />
    <Rect
      width={3.111}
      height={3.111}
      x={11.445}
      y={11.444}
      fill="#525252"
      rx={1.556}
    />
    <Rect
      width={3.111}
      height={3.111}
      x={11.445}
      y={16.889}
      fill="#525252"
      rx={1.556}
    />
  </Svg>
);

const AuthorizedPickupList = ({ navigation }) => {
  const students = useSelector((state) => state.students.students);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationVisible, setConfirmationVisible] = React.useState(false);

  const handleDelete = () => {
    console.log('Deleted');
  };

  const handleOptionPress = (itemId) => {
    setSelectedItemId(itemId);
    setModalVisible(true);
  };

  const handleConfirmationPress = (itemId) => {
    setSelectedItemId(itemId);
    setConfirmationVisible(true);
  };

  const renderPickupItem = ({ item }) => (
    <View style={styles.pickupItem}>
      <Image
        source={{ uri: item?.image }}
        style={styles.profileImage}
        defaultSource={require('../../assets/pics/EmailPic.png')}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <SubHeading text={item.name} style={styles.nameText} />
        <SubHeading text={item.role} style={styles.roleText} />
      </View>
      <TouchableOpacity
        style={styles.optionsButton}
        onPress={() => handleOptionPress(item.id)}>
        <View style={styles.optionsCircle}>
          <OptionButton />
        </View>
      </TouchableOpacity>

      <CustomOptionsModal
        visible={modalVisible && selectedItemId === item.id}
        onClose={() => setModalVisible(false)}
        onViewDetails={() => navigation.navigate('AuthPickupDetails')}
        onEdit={() => navigation.navigate('EditAuthorizedPickup')}
        onDelete={() => handleConfirmationPress(item.id)}
        style={styles.optionsModal}
      />

      <AuthConfirmationModal
        visible={confirmationVisible && selectedItemId === item.id}
        onClose={() => setConfirmationVisible(false)}
        title={item.name}
        description="Are you sure you want to remove authorized pick-up?"
        imageSource={{ uri: item.image }}
        primaryButtonText="Yes, Sure"
        primaryButtonAction={handleDelete}
        secondaryButtonText="No, I Don’t"
        secondaryButtonAction={() => console.log('Cancelled')}
        style={{
          titleText: { fontWeight: 'bold', fontSize: 16 },
          descriptionText: {
            textAlign: 'center',
            fontSize: 14,
            color: '#6C757D',
          },
          primaryButton: {
            backgroundColor: '#F8AC16',
            borderRadius: 10,
            paddingVertical: 12,
          },
          primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
          secondaryButton: {
            borderWidth: 1,
            borderColor: '#F8AC16',
            backgroundColor: 'transparent',
            borderRadius: 10,
            paddingVertical: 12,
          },
          secondaryButtonText: { color: '#F8AC16', fontWeight: '600' },
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Heading
        title="Authorized Pickup"
        boxStyle={styles.headerTitle}
        textstyle={styles.headerTitleText}
      />
      <FlatList
        data={students}
        renderItem={renderPickupItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollView}
      />
      <CustomButton
        onPress={() => navigation.navigate('AddAuthorization')}
        title="Add New"
        touchStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />
    </View>
  );
};

export default AuthorizedPickupList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    alignItems: 'flex-start',
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  pickupItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 74,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    gap: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  addButton: {
    backgroundColor: '#F8AC16',
    borderRadius: 6,
    padding: 16,
    marginTop: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionsButton: {
    width: 26,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F8F8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});