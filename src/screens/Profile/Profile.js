import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import SubHeading from '../../components/SubHeading';
import Heading from '../../components/Heading';
import { useSelector } from 'react-redux';
import ArrowRight from '../../assets/Icons/svg/ArrowRight';
import { ProfileScreenIcons } from '../../assets/Icons/svg/ProfileScreenIcons';
import ReactNativeBiometrics from 'react-native-biometrics'; // Import the biometric library

const renderItem = ({ item, index, navigation }, isPage = false) => {
  console.log(item);
  const IconComponent = isPage ? ProfileScreenIcons[item.icon] : null;
  const handlePress = item => {
    if (item.title === 'Enable Smart Login') {
      // Trigger biometric authentication when "Enable Smart Login" is clicked
      handleBiometricAuthentication();
    } else {
      // Navigate to other screens for non-smart-login options
      if (!isPage) {
        navigation.navigate('ProfileDetail', { student: item });
      }
      if (isPage) {
        navigation.navigate(item.screen);
      }
    }
  };

  const handleBiometricAuthentication = async () => {
    try {
      const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable();

      if (available) {
        // Trigger biometric authentication
        const { success, error } = await ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Login using fingerprint or face recognition',
        });

        if (success) {
          Alert.alert('Authentication Successful');
          // Perform the login logic here (e.g., navigate to the dashboard or home screen)
        } else {
          Alert.alert('Authentication Failed');
        }
      } else {
        Alert.alert('Biometric authentication is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableOpacity key={index} style={styles.listItem} onPress={() => handlePress(item)}>
      {isPage && IconComponent && <IconComponent />}
      {isPage ? null : <Image source={{ uri: item.image }} style={styles.profileImage} />}
      <View style={styles.listItemContent}>
        <SubHeading
          text={isPage ? item.title : item.name}
          boxStyle={styles.profileNameBox}
          style={styles.profileName}
        />
      </View>
      <ArrowRight style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const Profile = ({ navigation }) => {
  const students = useSelector(state => state.students.students);

  const pages = [
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
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Heading
        title="Children"
        textstyle={styles.sectionTitle}
        boxStyle={styles.sectionTitleBox}
      />
      <FlatList
        data={students}
        renderItem={({ item, index }) => renderItem({ item, index, navigation })}
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
            <TouchableOpacity style={styles.listItem}>
              {item.icon && ProfileScreenIcons[item.icon] && <ProfileScreenIcons.LogoutIcon />}
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
            renderItem({ item, index, navigation }, true)
          )
        }
        keyExtractor={item => item.title}
        contentContainerStyle={styles.listContentContainer}
      />
    </ScrollView>
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
  pageIcon: {
    flex: 1,
    marginLeft: 15,
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
});

export default Profile;
