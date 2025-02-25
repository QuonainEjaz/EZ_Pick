import React from 'react';
import { Modal, View, StyleSheet, useWindowDimensions } from 'react-native';
import CustomButton from './CustomButton';

const PhotoSelectionModal = ({ visible, onClose, onTakePhoto, onUploadPhoto }) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <CustomButton
            title="Take Photo"
            onPress={onTakePhoto}
            touchStyle={[styles.optionButton, { width: buttonWidth }]}
            textStyle={styles.optionText}
          />
          <View style={styles.divider} />
          <CustomButton
            title="Upload Photo"
            onPress={onUploadPhoto}
            touchStyle={[styles.optionButton, { width: buttonWidth }]}
            textStyle={styles.optionText}
          />
          <CustomButton
            title="Cancel"
            onPress={onClose}
            touchStyle={[styles.cancelButton, { width: buttonWidth }]}
            textStyle={styles.cancelText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 10,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
  },
  optionText: {
    color: '#333',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    marginTop: 10,
    paddingVertical: 15,
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PhotoSelectionModal;
