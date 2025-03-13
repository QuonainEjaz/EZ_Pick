import React from 'react';
import {Modal, View, Image, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import Heading from './Heading';
import SubHeading from './SubHeading';

const CustomAlert = ({visible, onClose, label, message, buttonText, image, svg=null}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {svg}
          {image == 'noImage' ? null : (
            <Image
              source={require('../assets/pics/EmailPic.png')}
              style={styles.image}
            />
          )}
          <Heading title={label} textstyle={styles.title} />
          <SubHeading text={message} style={styles.message} />
          <CustomButton
            title={buttonText}
            onPress={onClose}
            touchStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3B43',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F8AC16',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
