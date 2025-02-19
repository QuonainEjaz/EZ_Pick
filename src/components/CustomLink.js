import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomLink = ({ label, onPress, style,textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.linkContainer, style]}>
      <Text style={[styles.linkText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  linkText: {
    fontSize: 14,
    color: '#D08D06', 
  },
});

export default CustomLink;
