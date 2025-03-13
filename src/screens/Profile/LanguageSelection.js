import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSelectButton from '../../components/CustomSelectButton';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton'; 
import { setLanguage } from '../../store/App/action';


const LanguageSelection = ({navigation }) => {
  const dispatch = useDispatch();
  const defaultLanguage = useSelector((state) => state.students.selectedLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const languages = [
    { id: 1, name: 'English', value: 'English' },
    { id: 2, name: 'Arabic', value: 'Arabic' },
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleDone = () => {
    console.log('Selected language:', selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading title="Select Preferred Language" textstyle={styles.heading} boxStyle={styles.headingBox} />
        <SubHeading text="Please select your preferred language" style={styles.subheading} />
        <CustomSelectButton
          options={languages}
          selectedValue={selectedLanguage}
          onSelect={handleLanguageSelect}
          containerStyle={styles.languageOptions}
          labelStyle={styles.languageText}
          selectedLabelStyle={styles.selectedText}
        />
        <CustomButton
          title="Done"
          onPress={handleDone}
          touchStyle={styles.doneButton}
          textStyle={styles.doneButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  headingBox: {
    alignItems: 'flex-start',
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: 0.22,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
    letterSpacing: 0.14,
    marginBottom: 10,
  },
  languageOptions: {
    gap: 10,
    marginBottom: 30,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#212529',
  },
  doneButton: {
    marginTop: 'auto',
    width: '100%',
    height: 50,
  },
  doneButtonText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 28,
  },
});

export default LanguageSelection;
