import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PhotoOptions = ({ onTakePhoto, onUploadPhoto, onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={onTakePhoto}
        >
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={onUploadPhoto}
        >
          <Text style={styles.optionText}>Upload photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={onCancel}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 157,
    flexDirection: 'column',
    gap: 13,
    padding: 10,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d94d',
  },
  optionText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.16,
    color: '#61606c',
    textAlign: 'center',
  },
  cancelButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#e3e3e3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  cancelText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#212529',
    lineHeight: 28,
  },
});

PhotoOptions.defaultProps = {
  onTakePhoto: () => {},
  onUploadPhoto: () => {},
  onCancel: () => {},
};

export default PhotoOptions;

