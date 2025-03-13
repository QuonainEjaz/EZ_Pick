import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';
import CustomButton from './CustomButton'; // Importing CustomButton
import Heading from './Heading';
import SubHeading from './SubHeading';

const CustomModal = ({
  visible,
  onClose,
  title,
  description,
  imageSource,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  style,
  width
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {imageSource && <Image source={imageSource} style={styles.image} />}

          {title && (
            <Heading
              title={title}
              textstyle={[style?.titleText, styles.title]}
              boxStyle={[style?.title, {alignItems: 'flex-start'}]}
            />
          )}

          {description && (
            <SubHeading
              text={description}
              style={[style?.descriptionText, styles.description]}
              boxStyle={[style?.description]}
            />
          )}

          <View style={styles.buttonContainer}>
            {primaryButtonText && (
              <CustomButton
                title={primaryButtonText}
                width={width}
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
                width={width}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'outfit',
    // fontSize: 20,
    color: '#212529',
    lineHeight: 25.2,
  },

  description: {
    fontFamily: 'outfit',
    // fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#F8AC16',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'outfit',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#F8AC16',
    fontWeight: 'bold',
  },
});

export default CustomModal;
