import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const CustomCheckbox = ({value, onValueChange, label, style}) => {
  return (
    <View style={[styles.customcheckboxContainer, style?.checkboxContainer]}>
      <TouchableOpacity
        style={styles.checkboxTouch}
        onPress={() => onValueChange(!value)}>
        <View style={[styles.checkbox, value && styles.checkboxChecked]}>
          {value && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={[styles.checkboxText, style?.checkboxText]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customcheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 25,
    marginLeft: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    padding: 1,
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: '#07193D4D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F8AC16',
    alignSelf: 'center',
    padding: 1,
    paddingHorizontal: 3,
  },
  checkmark: {
    fontSize: width >= 410 ? 12 : 12,
    color: 'white',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomCheckbox;
