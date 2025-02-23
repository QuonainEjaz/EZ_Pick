import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinkButton from './LinkButton';
import Heading from './Heading';

const CustomHeader = ({ screen, name, navigation }) => {
  let title;
  let button = false;

  if (name === 'HistoryScreen') {
    title = 'History';
  } else if (name === 'PickupDetails') {
    title = 'Pickup Details';
    button = true;
  }

  if (screen === 'HomeScreen') {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../assets/Logo/whetstonezLogo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  if (screen === 'History') {
    return (
      <View style={button ? styles.headerContentWithButton : styles.headerContainer}>
        {button && (
          <LinkButton
            label="Back"
            onPress={(() => navigation.goBack())}
            touchStyle={styles.addButton}
          />
        )}
        <Heading
          title={title}
          textstyle={{
            color: '#212529',
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 22.68,
          }}
          boxStyle={{ justifyContent: 'center' }}
        />
      </View>
    );
  }

  if (screen === 'Add') {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../assets/Logo/whetstonezLogo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (screen === 'Notification') {
    return (
      <View style={styles.headerContainer}>
        <Heading
          title={'Notifications'}
          textstyle={{
            color: '#212529',
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 22.68,
            textAlign: 'center',
          }}
          boxStyle={{ justifyContent: 'center' }}
        />
      </View>
    );
  }

  if (screen === 'Profile') {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../assets/Logo/whetstonezLogo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
  },
  headerContentWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  headerContent: {
    justifyContent: 'center',
    width: '90%',
  },
  logoContainer: {
    width: '38%',
    height: '60%',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
  },
});

export default CustomHeader;
