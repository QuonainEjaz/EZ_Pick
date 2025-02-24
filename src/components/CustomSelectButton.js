import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSelectButton = ({ 
  options = [], 
  onSelect, 
  selectedValue, 
  containerStyle, 
  labelStyle, 
  selectedLabelStyle 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onSelect(option.value)}
        >
          <View style={[
            styles.circle,
            selectedValue === option.value && styles.selectedCircle
          ]} />
          <Text style={[
            styles.label,
            labelStyle,
            selectedValue === option.value && selectedLabelStyle
          ]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    marginRight: 10,
  },
  selectedCircle: {
    borderColor: '#F8AC16',
    backgroundColor: '#F8AC16',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
});

export default CustomSelectButton;
