import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Heading from './Heading';

const CustomSelectButton = ({
  options = [],
  onSelect,
  selectedValue,
  containerStyle,
  labelStyle,
  selectedLabelStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onSelect(option?.value)}>
          <View
            style={[
              styles.circleOuter,
              selectedValue !== option?.value && {
                borderColor: '#6C757D80',
              },
            ]}>
            {selectedValue === option?.value && (
              <View style={styles.circleInner} />
            )}
          </View>
          <Heading
            title={option?.name}
            textstyle={[
              styles.label,
              labelStyle,
              selectedValue === option?.value && {
                fontWeight: '700',
              },
              selectedValue === option?.value && selectedLabelStyle,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  option: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  circleOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#F8AC16',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F8AC16',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Outfit',
    color: '#6C757D',
  },
});

export default CustomSelectButton;
