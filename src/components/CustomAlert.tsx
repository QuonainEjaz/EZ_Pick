import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttonText,
  onPress,
  type = 'success',
}) => {
  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          name: 'checkmark-circle-outline',
          color: '#4CAF50',
          defaultButtonText: 'Ok, Got it',
        };
      case 'error':
        return {
          name: 'close-circle-outline',
          color: '#F44336',
          defaultButtonText: 'Close',
        };
      case 'warning':
        return {
          name: 'warning-outline',
          color: '#FFC107',
          defaultButtonText: 'I Understand',
        };
      case 'info':
        return {
          name: 'information-circle-outline',
          color: '#2196F3',
          defaultButtonText: 'Ok',
        };
      default:
        return {
          name: 'checkmark-circle-outline',
          color: '#4CAF50',
          defaultButtonText: 'Ok, Got it',
        };
    }
  };

  const { name: iconName, color: iconColor, defaultButtonText } = getIconConfig();
  const finalButtonText = buttonText || defaultButtonText;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
            <Icon
              name={iconName}
              size={50}
              color={iconColor}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: iconColor }]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>{finalButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert; 