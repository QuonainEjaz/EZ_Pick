import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import CustomOptionsModal from '../../components/AuthScreenComponents/CustomOptionsModal';
import AuthConfirmationModal from '../../components/AuthConfirmationModal';
import AuthPickupDetails from './AuthPickupDetails';
import EditAuthorizedPickup from './EditAuthorizedPickup';
import AddAuthorizedPickup from './AddAuthorization';
import StudentPickupCard from './StudentPickupCard';
import ShareOptions from './ShareOptions';

const AuthorizedPickupList = ({navigation}) => {
  const pickupList = [
    {
      id: 1,
      name: 'Zayd al-Masri',
      role: 'Driver',
      image:
        'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile.png',
    },
    {
      id: 2,
      name: 'Rami al-Jabari',
      role: 'Brother',
      image:
        'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-5.png',
    },
    {
      id: 3,
      name: 'Khalid al-Jameel',
      role: 'Uncle',
      image:
        'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-9.png',
    },
    {
      id: 4,
      name: 'Tariq al-Nasr',
      role: 'Guardian',
      image:
        'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/profile-13.png',
    },
  ];

  const [modalVisible, setModalVisible] = React.useState(false);
  const renderPickupItem = ({item}) => (
    <View style={styles.pickupItem}>
      <Image
        source={{uri: item.image}}
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
        onPress={() => setModalVisible(true)}>
        <View style={styles.optionsCircle}>
          <Image
            source={{
              uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/frame-11.png',
            }}
            style={styles.optionsIcon}
          />
        </View>
      </TouchableOpacity>
      <CustomOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onViewDetails={() => navigation.navigate('AuthPickupDetails')}
        onEdit={() => navigation.navigate('EditAuthorizedPickup')}
        // onDelete={handleDelete}
        style={styles.optionsModal}
      />
      <AuthConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Khalid al-Jameel"
        description="Are you sure you want to remove authorized pick-up?"
        imageSource={require('../../assets/pics/EmailPic.png')} // Replace with actual image source
        primaryButtonText="Yes, Sure"
        primaryButtonAction={() => console.log('Confirmed')}
        secondaryButtonText="No, I Don’t"
        secondaryButtonAction={() => console.log('Cancelled')}
        style={{
          titleText: {fontWeight: 'bold', fontSize: 16},
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
          primaryButtonText: {color: '#FFFFFF', fontWeight: '600'},
          secondaryButton: {
            borderWidth: 1,
            borderColor: '#F8AC16',
            backgroundColor: 'transparent',
            borderRadius: 10,
            paddingVertical: 12,
          },
          secondaryButtonText: {color: '#F8AC16', fontWeight: '600'},
        }}
      />
    </View>
  );

  return (
    //  <AuthPickupDetails  />
    //  <EditAuthorizedPickup  />
    //  <AddAuthorizedPickup  />
    //  <StudentPickupCard />
    //  <ShareOptions />
    <View style={styles.container}>
      <Heading
        title="Authorized Pickup"
        boxStyle={styles.headerTitle}
        textstyle={styles.headerTitleText}
      />
      <FlatList
        data={pickupList}
        renderItem={renderPickupItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollView}
      />
      <CustomButton
        onPress={() => navigation.navigate('EditAuthorizedPickup')}
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
    backgroundColor: '#FFFFFF',
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
  optionsIcon: {
    width: 3.11,
    height: 14,
  },
});
