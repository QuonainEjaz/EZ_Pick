import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import SubHeading from '../SubHeading';

const CustomOptionsModal = ({
  visible,
  onClose,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const handleOptionPress = (action) => {
    action(); // Call the action (onViewDetails, onEdit, or onDelete)
    onClose(); // Close the modal after action
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress(onViewDetails)} // Hide modal after clicking option
          >
            <SubHeading text="View Details" style={styles.optionText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress(onEdit)} // Hide modal after clicking option
          >
            <SubHeading text="Edit" style={styles.optionText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress(onDelete)} // Hide modal after clicking option
          >
            <SubHeading text="Delete" style={styles.optionText} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 60,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    paddingVertical: 10,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomOptionsModal;
