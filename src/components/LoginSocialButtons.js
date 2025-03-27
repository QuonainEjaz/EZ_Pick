import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const SocialButton = (props) => {
  const Icon = props.icon ? props.icon : null;
  const title = props.title ? props.title : 'Continue';
  const onPress = props.onPress ? props.onPress : () => {};
  const width = props.width ? props.width : '100%';
  const containerStyle = props.containerStyle ? props.containerStyle : {};
  const textStyle = props.textStyle ? props.textStyle : {};
  const iconContainerStyle = props.iconContainerStyle ? props.iconContainerStyle : {};

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { width: width }, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.innerContainer}>
        {Icon && (
          <View style={[styles.iconContainer, iconContainerStyle]}>
            {Icon}
          </View>
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    marginVertical: 6,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
