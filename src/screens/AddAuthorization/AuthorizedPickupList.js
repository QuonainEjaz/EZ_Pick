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


const AuthorizedPickupList = ({onAddNew = () => {}}) => {
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
    <TouchableOpacity style={styles.pickupItem}>
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
      <TouchableOpacity style={styles.optionsButton} onPress={() => setModalVisible(true)}>
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
        onClose={() => setModalVisible(false)} // Set modal visibility to false to close it
        // onViewDetails={handleViewDetails}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
        style={styles.optionsModal}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Heading title="Authorized Pickup" style={styles.headerTitle} />
      <FlatList
        data={pickupList}
        renderItem={renderPickupItem}
        keyExtractor={item => item.id.toString()} // keyExtractor ensures a unique key is used
        contentContainerStyle={styles.scrollView} // FlatList content style
      />
      <CustomButton
        onPress={onAddNew}
        title="Add New"
        style={styles.addButton}
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
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    paddingVertical: 12,
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
