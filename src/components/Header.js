import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Heading from './Heading';

const CustomHeader = ({screen}) => {
  if (screen === 'Home') {
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
      <View style={styles.headerContainer}>
        <Heading
          title={'History'}
          textstyle={{
            color: '#212529',
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 22.68,
          }}
          boxStyle={{justifyContent: 'center',}}
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
            textAlign: 'center'
          }}
          boxStyle={{
            justifyContent: 'center',
          }}
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
