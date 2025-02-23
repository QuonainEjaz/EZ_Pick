import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LogoutConfirmation = ({ onLogout = () => {}, onCancel = () => {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/fi-10152.png' }}
          style={styles.icon}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.description}>Are you sure you want to logout?</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onCancel}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={onLogout}
          >
            <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 334,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignSelf: 'center',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  icon: {
    width: 77,
    height: 77,
  },
  textContainer: {
    width: '100%',
    gap: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.16,
    color: '#3c3b43',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 127,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1.6,
    borderColor: '#f8ac16',
  },
  logoutButton: {
    backgroundColor: '#f8ac16',
  },
  buttonText: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 28,
  },
  cancelButtonText: {
    color: '#f8ac16',
  },
  logoutButtonText: {
    color: '#fff',
  },
});

export default LogoutConfirmation;

