import React, {memo} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import LinkButton from './LinkButton';
import Heading from './Heading';

const CustomHeader = ({screen, name, navigation}) => {
  const getTitleAndButton = () => {
    switch (name) {
      case 'HistoryScreen':
        return {title: 'History', button: false};
      case 'PickupDetails':
        return {title: 'Pickup Details', button: true};
      case 'NotificationScreen':
        return {title: 'Notifications', button: false};
      case 'ProfileScreen':
        return {title: 'Profile', button: false};
      case 'AddAuthorization':
        return {title: 'Add Authorization', button: false};
      case 'ProfileDetail':
        return {title: 'Profile', button: true};
      case 'UpdatePassword':
        return {title: 'Update Password', button: true};
      case 'LanguageSelection':
        return {title: 'Language', button: true};
      default:
        return {title: '', button: false};
    }
  };

  const {title, button} = getTitleAndButton();

  const renderLogo = () => (
    <TouchableOpacity style={styles.logoContainer}>
      <Image
        resizeMode="contain"
        source={require('../assets/Logo/whetstonezLogo.png')}
        style={styles.logo}
      />
    </TouchableOpacity>
  );

  const renderContent = () => (
    <>
      {button && (
        <LinkButton
          label="Back"
          onPress={() => navigation.goBack()}
          style={styles.addButton}
        />
      )}
      <Heading
        title={title}
        textstyle={styles.headingText}
        boxStyle={styles.headingBox}
      />
      {button && <View width={'10%'} />}
    </>
  );

  const renderHeader = () => {
    switch (screen) {
      case 'History':
      case 'NotificationScreen':
      case 'Profile':
      case 'ProfileDetail':
      case 'UpdatePassword':
      case 'LanguageSelection':
        return (
          <View
            style={
              button ? styles.headerContentWithButton : styles.headerContainer
            }>
            {renderContent()}
          </View>
        );
      case 'HomeScreen':
      case 'Add':
        return (
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>{renderLogo()}</View>
          </View>
        );
      default:
        return null;
    }
  };

  return renderHeader();
};

export default memo(CustomHeader);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    shadowColor: '#676767',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 16,
  },
  headerContentWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 70,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#676767',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 5,
  },
  headerContent: {
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  logoContainer: {
    width: '38%',
    height: '60%',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
  },
  headingText: {
    color: '#212529',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22.68,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  headingBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
