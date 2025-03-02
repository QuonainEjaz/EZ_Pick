import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, FlatList, Alert, Image, Modal } from 'react-native';
import SubHeading from '../../components/SubHeading';
import Heading from '../../components/Heading';
import { useSelector } from 'react-redux';
import ArrowRight from '../../assets/Icons/svg/ArrowRight';
import { ProfileScreenIcons } from '../../assets/Icons/svg/ProfileScreenIcons';
import ReactNativeBiometrics from 'react-native-biometrics';
import CustomToggleSwitch from '../../components/CustomToggleSwitch';
import LogoutConfirmation from './LogoutConfirmation'; // Assuming this component is in the same directory

const Profile = ({ navigation }) => {
  const [toggleSwitchValue, setToggleSwitchValue] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state
  const students = useSelector(state => state.students.students);

  const pages = useMemo(
    () => [
      {
        title: 'Authorized Pickup',
        icon: 'AuthorizedPickupIcon',
        screen: 'Add',
      },
      {
        title: 'Update Password',
        icon: 'UpdatePasswordIcon',
        screen: 'UpdatePassword',
      },
      {
        title: 'Enable Smart Login',
        icon: 'EnableSmartLoginIcon',
        screen: 'AuthorizedPickupList',
      },
      {
        title: 'Language',
        icon: 'LanguageIcon',
        screen: 'LanguageSelection',
      },
      {
        title: 'Logout',
        icon: 'LogoutIcon',
        screen: 'Login',
      },
    ],
    [],
  );

  const handleEnableSmartLogin = useCallback(async () => {
    try {
      const { available, biometryType } =
        await ReactNativeBiometrics.isSensorAvailable();

      if (available) {
        const { success, error } = await ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Login using fingerprint or face recognition',
        });

        if (success) {
          Alert.alert('Authentication Successful');
        } else {
          Alert.alert('Authentication Failed');
        }
      } else {
        Alert.alert(
          'Biometric authentication is not available on this device.',
        );
      }
    } catch (error) {
      console.error('Error during biometric authentication', error);
      Alert.alert('Error', error.message);
    }
  }, []);

  const onToggleSwitch = useCallback(
    value => {
      setToggleSwitchValue(value);
      if (value) {
        handleEnableSmartLogin();
      }
    },
    [handleEnableSmartLogin],
  );

  // Show Modal when Logout button is clicked
  const handleLogoutPress = () => {
    setIsModalVisible(true);
  };

  // Handle Cancel logout action
  const handleCancelLogout = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Handle Confirm logout action (Logout logic can be added here)
  const handleConfirmLogout = () => {
    setIsModalVisible(false);
    // Add logout logic here (e.g., clearing session, navigating to login page)
    navigation.navigate('Login'); // Example: Navigate to login screen
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Heading
        title="Children"
        textstyle={styles.sectionTitle}
        boxStyle={styles.sectionTitleBox}
      />
      <FlatList
        data={students}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            index={index}
            navigation={navigation}
            handleEnableSmartLogin={toggleSwitchValue ? handleEnableSmartLogin : null}
            toggleSwitchValue={toggleSwitchValue}
            onToggleSwitch={onToggleSwitch}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />

      <Heading
        title="Other Pages"
        textstyle={styles.sectionTitle}
        boxStyle={styles.sectionTitleBox}
      />
      <FlatList
        data={pages}
        renderItem={({ item, index }) =>
          item.title === 'Logout' ? (
            <TouchableOpacity style={styles.listItem} onPress={handleLogoutPress}>
              {item.icon && ProfileScreenIcons[item.icon] && (
                <ProfileScreenIcons.LogoutIcon />
              )}
              <View style={styles.listItemContent}>
                <SubHeading
                  text={item.title}
                  boxStyle={styles.profileNameBox}
                  style={styles.profileName}
                />
              </View>
              <ArrowRight style={styles.arrowIcon} />
            </TouchableOpacity>
          ) : (
            <ListItem
              item={item}
              index={index}
              navigation={navigation}
              isPage={true}
              handleEnableSmartLogin={handleEnableSmartLogin}
              toggleSwitchValue={toggleSwitchValue}
              setToggleSwitchValue={setToggleSwitchValue}
              onToggleSwitch={onToggleSwitch}
            />
          )
        }
        keyExtractor={item => item.title}
        contentContainerStyle={styles.listContentContainer}
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <LogoutConfirmation
            onLogout={handleConfirmLogout}
            onCancel={handleCancelLogout}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const ListItem = ({
  item,
  index,
  navigation,
  isPage = false,
  handleEnableSmartLogin,
  toggleSwitchValue,
  setToggleSwitchValue,
  onToggleSwitch,
}) => {
  const IconComponent = isPage ? ProfileScreenIcons[item.icon] : null;
  const handlePress = item => {
    if (item.title === 'Enable Smart Login') {
      if (toggleSwitchValue) {
        setToggleSwitchValue(false);
        return;
      }
      setToggleSwitchValue(true);
      handleEnableSmartLogin();
    } else {
      if (!isPage) {
        navigation.navigate('ProfileDetail', { student: item });
      }
      if (isPage) {
        navigation.navigate(item.screen);
      }
    }
  };

  return (
    <TouchableOpacity
      key={index}
      style={styles.listItem}
      onPress={() => handlePress(item)}
    >
      {isPage && IconComponent && <IconComponent />}
      {isPage ? null : <Image source={{ uri: item.image }} style={styles.profileImage} />}
      <View style={styles.listItemContent}>
        <SubHeading
          text={isPage ? item.title : item.name}
          boxStyle={styles.profileNameBox}
          style={styles.profileName}
        />
      </View>
      {item.title === 'Enable Smart Login' ? (
        <CustomToggleSwitch
          value={toggleSwitchValue}
          onToggle={onToggleSwitch}
        />
      ) : (
        <ArrowRight style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  sectionTitleBox: {
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.08,
    color: '#212529',
    marginVertical: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F8F8F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 4,
  },
  profileName: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.16,
    color: '#6c757d',
  },
  profileNameBox: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Profile;
