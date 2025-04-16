import React from 'react';
import {Modal, View, Image, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import Heading from './Heading';
import SubHeading from './SubHeading';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomAlert = ({
  visible,
  onClose,
  label,
  message,
  buttonText,
  image,
  svg = null,
  style = {},
  title,
  type = 'success',
  onPress,
}) => {
  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          name: 'checkmark-circle',
          color: '#4CAF50',
          defaultButtonText: 'Ok, Got it',
        };
      case 'error':
        return {
          name: 'close-circle',
          color: '#F44336',
          defaultButtonText: 'Close',
        };
      case 'warning':
        return {
          name: 'warning',
          color: '#FFC107',
          defaultButtonText: 'I Understand',
        };
      case 'info':
        return {
          name: 'information-circle',
          color: '#2196F3',
          defaultButtonText: 'Ok',
        };
      default:
        return {
          name: 'checkmark-circle',
          color: '#F8AC16',
          defaultButtonText: 'Ok, Got it',
        };
    }
  };

  const { name: iconName, color: iconColor, defaultButtonText } = getIconConfig();
  const finalButtonText = buttonText || defaultButtonText;
  const finalTitle = title || label;
  const handlePress = onPress || onClose;

  const isEnhancedAlert = title !== undefined || type !== 'success';

  const renderIcon = () => {
    try {
      return (
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <Icon
            name={iconName}
            size={50}
            color={iconColor}
          />
        </View>
      );
    } catch (error) {
      console.warn('Error rendering icon:', error);
      return null;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handlePress}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, style?.alert]}>
          {isEnhancedAlert ? (
            renderIcon()
          ) : (
            <>
              {svg}
              {image !== 'noImage' && (
                <Image
                  source={require('../assets/pics/EmailPic.png')}
                  style={styles.image}
                />
              )}
            </>
          )}
          <Heading 
            title={finalTitle} 
            textstyle={[
              styles.title,
              isEnhancedAlert && styles.enhancedTitle
            ]} 
          />
          <SubHeading 
            text={message} 
            style={[
              styles.message,
              isEnhancedAlert && styles.enhancedMessage
            ]} 
          />
          <CustomButton
            title={finalButtonText}
            onPress={handlePress}
            touchStyle={[
              styles.button,
              style?.button
            ]}
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3B43',
    marginBottom: 5,
  },
  enhancedTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 20,
  },
  enhancedMessage: {
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
