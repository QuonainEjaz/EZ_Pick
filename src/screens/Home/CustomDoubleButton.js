import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import CustomButton from '../../components/CustomButton';

const UploadButtons = ({ onUploadLater, onSave }) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.43;
  const buttonHeight = width * 0.12;

  return (
    <View style={styles.container}>
      <CustomButton
        title="Upload Later"
        onPress={onUploadLater}
        touchStyle={[styles.uploadLaterButton, { width: buttonWidth, height: buttonHeight}]}
        textStyle={styles.uploadLaterText}
      />
      <CustomButton
        title="Save"
        onPress={onSave}
        touchStyle={[styles.saveButton, { width: buttonWidth,height: buttonHeight}]}
        textStyle={styles.saveText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadLaterButton: {
    borderWidth: 1,
    borderColor: '#F8AC16',
    backgroundColor: 'transparent',
  },
  uploadLaterText: {
    color: '#F8AC16',
  },
  saveButton: {
    backgroundColor: '#F8AC16',
  },
  saveText: {
    color: '#FFFFFF',
  },
});

export default UploadButtons;
