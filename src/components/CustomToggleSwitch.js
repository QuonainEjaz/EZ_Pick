import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomToggleSwitch = ({ value, onToggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onToggle(!value)}
      style={[styles.switch, value ? styles.activeBackground : styles.inactiveBackground]}
    >
      <View style={[styles.slider, value ? styles.activeSlider : styles.inactiveSlider]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 45,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeBackground: {
    backgroundColor: '#F8AC16',
    justifyContent: 'flex-end',
  },
  inactiveBackground: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'flex-start',
  },
  slider: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  activeSlider: {
    marginRight: 2,
  },
  inactiveSlider: {
    marginLeft: 2,
  }
});

export default CustomToggleSwitch;
