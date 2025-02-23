import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LanguageSelection = ({ defaultLanguage = 'English' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const languages = [
    { id: 1, name: 'English', icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/componen-2.png' },
    { id: 2, name: 'Arabic', icon: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/componen-3.png' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleDone = () => {
    // Handle done action
    console.log('Selected language:', selectedLanguage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon-arr-7.png' }}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Select Preferred Language</Text>
        <Text style={styles.subheading}>Please select your preferred language</Text>

        <View style={styles.languageOptions}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageOption,
                selectedLanguage === language.name && styles.selectedOption
              ]}
              onPress={() => handleLanguageSelect(language.name)}
            >
              <Image 
                source={{ uri: language.icon }}
                style={styles.languageIcon}
              />
              <Text style={[
                styles.languageText,
                selectedLanguage === language.name && styles.selectedText
              ]}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    width: 7,
    height: 12,
  },
  backText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    letterSpacing: 0.14,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginRight: 45,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Outfit',
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
    letterSpacing: 0.22,
    marginBottom: 2,
  },
  subheading: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
    letterSpacing: 0.14,
    marginBottom: 20,
  },
  languageOptions: {
    gap: 20,
    marginBottom: 30,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 19,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F9',
    borderRadius: 8,
    gap: 8,
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
  },
  languageIcon: {
    width: 24,
    height: 24,
  },
  languageText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6C757D',
    letterSpacing: 0.14,
  },
  selectedText: {
    fontWeight: '600',
    color: '#212529',
  },
  doneButton: {
    backgroundColor: '#F8AC16',
    borderRadius: 6,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
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

