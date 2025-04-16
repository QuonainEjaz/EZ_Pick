import React from 'react';
import { View, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading'; 
import CustomButton from '../../components/CustomButton'; 
import LogoutIcon from '../../assets/Icons/svg/LogoutIcon';

const LogoutConfirmation = ({ visible = false, onConfirm = () => {}, onCancel = () => {} }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onCancel}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <LogoutIcon style={styles.icon} />
            
            <View style={styles.textContainer}>
              <Heading title="Logout" textstyle={styles.title} boxStyle={styles.headingBox} />
              <SubHeading 
                text="Are you sure you want to logout?" 
                style={styles.description} 
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton 
                title="Cancel" 
                onPress={onCancel}
                touchStyle={[styles.button, styles.cancelButton]} 
                textStyle={styles.cancelButtonText} 
              />
              
              <CustomButton 
                title="Logout" 
                onPress={onConfirm}
                touchStyle={[styles.button, styles.logoutButton]} 
                textStyle={styles.logoutButtonText} 
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'column',
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
    fontFamily: 'Outfit',
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
  headingBox: {
    alignItems: 'center',
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
  cancelButtonText: {
    color: '#f8ac16',
  },
  logoutButtonText: {
    color: '#fff',
  },
});

export default LogoutConfirmation;
