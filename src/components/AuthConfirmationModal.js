import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import Heading from './Heading';
import SubHeading from './SubHeading';

const AuthConfirmationModal = ({
  visible,
  onClose,
  title,
  description,
  imageSource,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.imageContainer}>
              {imageSource && (
                <Image source={imageSource} style={styles.image} />
              )}
            </View>
            {title && <Text style={styles.title}>{title}</Text>}
          </View>
          {description && <Text style={styles.description}>{description}</Text>}
          <View style={styles.buttonContainer}>
            {primaryButtonText && (
              <CustomButton
                title={primaryButtonText}
                onPress={() => {
                  primaryButtonAction && primaryButtonAction();
                  onClose();
                }}
                touchStyle={styles.primaryButton}
                textStyle={styles.primaryButtonText}
              />
            )}
            {secondaryButtonText && (
              <CustomButton
                title={secondaryButtonText}
                onPress={() => {
                  secondaryButtonAction && secondaryButtonAction();
                  onClose();
                }}
                touchStyle={styles.secondaryButton}
                textStyle={styles.secondaryButtonText}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginTop: 20,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    // backgroundColor: '#F8AC16',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#F8AC16',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#F8AC16',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AuthConfirmationModal;
