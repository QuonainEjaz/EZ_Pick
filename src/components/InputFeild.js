import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const SvgEyeComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#6C757D"
      strokeWidth={1.5}
      d="M1.178 9.03a1.453 1.453 0 0 1 0-1.394A8.906 8.906 0 0 1 9 3a8.906 8.906 0 0 1 7.822 4.636c.237.435.237.96 0 1.395A8.906 8.906 0 0 1 9 13.667 8.906 8.906 0 0 1 1.178 9.03Z"
    />
    <Circle cx={9} cy={8.333} r={2.667} stroke="#6C757D" strokeWidth={1.7} />
  </Svg>
);

const InputField = ({
  label,
  placeholder,
  placeholderColor,
  value,
  onChangeText,
  style,
  keyboardType,
  onBlur,
  secureTextEntry,
  multiline,
}) => {
  const endsWithStar = label.endsWith('*');
  const mainText = endsWithStar ? label.slice(0, -1) : label;
  const star = endsWithStar ? '*' : '';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };
  return (
    <View style={{marginBottom: 20}}>
      <Text style={[styles.text, style?.label]}>
        {mainText}
        <Text style={styles.star}>{star}</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, style?.input]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={
            keyboardType === 'password' ? !isPasswordVisible : secureTextEntry
          }
          multiline={multiline}
        />
        {keyboardType === 'password' && (
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.eyeIconContainer}>
            <SvgEyeComponent
              width={20}
              height={20}
              stroke={isPasswordVisible ? 'transparent' : '#6C757D'}
              strokeWidth={1.5}
            />

            {isPasswordVisible && <View style={styles.strikeThrough}></View>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'poppins',
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F8F8F9',
  },
  inputContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 13,
    top: '53%',
    transform: [{translateY: -10}],
    zIndex: 1,
  },
  strikeThrough: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 2,
    height: 1.5,
    backgroundColor: '#6C757D',
    transform: [{rotate: '45deg'}],
    zIndex: 10,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: '#212529',
    marginBottom: 5,
  },
  star: {
    fontFamily: 'poppins',
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
});
export default InputField;
