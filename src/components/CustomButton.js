import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const CustomButton = ({title, onPress, touchStyle, textStyle, svg, disabled,width=useWindowDimensions().width}) => {
  const fontSize = width * 0.04;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        touchStyle
      ]}
      onPress={disabled ? null : onPress} // Disable onPress if the button is disabled
      activeOpacity={0.7} // Normal opacity effect when pressed
    > 
      {svg && (
        svg
      )}
      <Text
        style={[
          styles.btnText,
          {fontSize},
          textStyle,
          svg ? {marginLeft: 5} : {},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8AC16', // Default color
  },
  btnText: {
    fontWeight: '600',
    color: '#FFFFFF', // Default text color
  },
  disabledText: {
    color: '#F8AC1650', // Light orange text
  },
});

export default CustomButton;
