import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SubHeading = ({text, style,boxStyle}) => {
  return (
    <View style={[style?.container,boxStyle]}>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#6C757D',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
});

export default SubHeading;
