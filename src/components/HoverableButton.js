import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const CustomButton = ({title, onPress, touchStyle, textStyle, hoverable}) => {
  const {width, height} = useWindowDimensions();
  const buttonPadding = width * 0.045;
  const fontSize = width * 0.04;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {paddingVertical: buttonPadding},
        touchStyle,
        hoverable && isHovered && styles.hoveredButton,
      ]}
      onPress={onPress}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}>
      <Text
        style={[
          styles.btnText,
          {fontSize},
          textStyle,
          hoverable && isHovered && styles.hoveredText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F8AC16',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '600',
    color: '#F8AC16',
  },
  hoveredButton: {
    backgroundColor: '#F8AC16',
  },
  hoveredText: {
    color: '#FFFFFF',
  },
});

export default CustomButton;
