import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';

const CustomButton = ({ title, onPress, touchStyle, textStyle }) => {
  const { width, height } = useWindowDimensions();  
  const buttonPadding = width * 0.045; 
  const fontSize = width * 0.04; 

  return (
    <TouchableOpacity
      style={[styles.button, {paddingVertical: buttonPadding }, touchStyle]} 
      onPress={onPress}
    >
      <Text style={[styles.btnText, { fontSize }, textStyle]}>{title}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8AC16',
  },
  btnText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CustomButton;
