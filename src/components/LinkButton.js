import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ButtonWithIcon = ({ label, onPress, style, iconSize }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <View style={styles.iconContainer}>
        <Svg
          width={iconSize || 10} 
          height={iconSize || 16}
          viewBox="0 0 10 10" 
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <Path
            stroke="#1C1F1E"
            strokeLinecap="round"
            strokeWidth={2}
            d="M5.6 10 2 5.8l3.6-4.2"
          />
        </Svg>
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 5,
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 2, 
    alignSelf: 'center', 
  },
  buttonText: {
    fontSize: 14,
    color: '#212529', 
    fontWeight: '500',
  },
});

export default ButtonWithIcon;
