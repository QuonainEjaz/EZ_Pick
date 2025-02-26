import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const Heading = ({ title, textstyle, boxStyle }) => {


  return (
    <View style={[styles.container, boxStyle]}>
    <Text style={[styles.heading, textstyle]}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Outfit'
  },
});

export default Heading;
