import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6C757D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1 1 6 6 6-6"
    />
  </Svg>
)
const CustomPicker = ({items, label, style, selectedValue, onValueChange}) => {
  const {width} = useWindowDimensions();
  const [selectedItem, setSelectedItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const endsWithStar = label.endsWith('*');
  const mainText = endsWithStar ? label.slice(0, -1) : label;
  const star = endsWithStar ? '*' : '';

  useEffect(() => {
    setSelectedItem(selectedValue);
  }, [selectedValue]);
  const handleSelectItem = item => {
    setSelectedItem(item);
    setIsVisible(false);
    onValueChange(item);
  };

  const handleToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={[styles.container, {width: '100%'}]}>
      <Text style={[styles.text, style?.label]}>
        {mainText}
        <Text style={styles.star}>{star}</Text>
      </Text>
      <TouchableOpacity
        onPress={handleToggleDropdown}
        style={styles.pickerButton}>
        <TextInput
          style={styles.pickerButtonText}
          value={selectedValue}
          placeholder={`Select ${mainText}`}
          placeholderTextColor="#999"
          editable={false}
        />
        <SvgComponent style={styles.arrow}/>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={items}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelectItem(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: '#61606C',
    marginBottom: 5,
  },
  star: {
    fontFamily: 'poppins',
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 70,
    width: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    color: '#07193D99',
    fontSize: 16,
  },
});

export default CustomPicker;
