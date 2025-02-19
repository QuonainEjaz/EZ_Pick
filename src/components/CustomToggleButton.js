import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

const CustomToggleButton = ({ onToggle,customStyle }) => {
  const { width } = useWindowDimensions();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleToggle = (language) => {
    setSelectedLanguage(language);
    if (onToggle) {
      onToggle(language);
    }
  };

  return (
    <View style={[styles.container, { width: width * 0.5 },customStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedLanguage === "ar" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleToggle("ar")}
      >
        <Text style={[styles.text, selectedLanguage === "ar" ? styles.selectedText : styles.unselectedText]}>
          العربية
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selectedLanguage === "en" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleToggle("en")}
      >
        <Text style={[styles.text, selectedLanguage === "en" ? styles.selectedText : styles.unselectedText]}>
          ENG
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F8F8F9",
    borderRadius: 10,
    padding: 2,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "#F8AC16",
  },
  unselectedButton: {
    backgroundColor: "#F8F8F9",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#F8F8F9",
  },
  unselectedText: {
    color: "#6C757D",
  },
});

export default CustomToggleButton;
