import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomCheckbox = ({value, onValueChange, label, style}) => {
  return (
    <View style={[styles.customcheckboxContainer, style?.checkboxContainer]}>
      {/* Custom TouchableOpacity checkbox */}
      <TouchableOpacity style={styles.checkboxTouch} onPress={() => onValueChange(!value)}>
        <View style={[styles.checkbox, value && styles.checkboxChecked]}>
          {value && <Text style={styles.checkmark}>✔</Text>}
        </View>
        {/* Checkbox label */}
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
    width: 20,
    height: 20,
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
  },
  checkboxChecked: {
    backgroundColor: '#07193D4D',
  },
  checkmark: {
    fontSize: 12,
    color: 'white',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomCheckbox;
