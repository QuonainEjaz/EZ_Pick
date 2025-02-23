import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UpdatePassword = ({ initialCurrentPassword = '', initialNewPassword = '', initialConfirmPassword = '' }) => {
  const [currentPassword, setCurrentPassword] = useState(initialCurrentPassword);
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  const [confirmPassword, setConfirmPassword] = useState(initialConfirmPassword);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    // Handle password update logic here
    console.log('Password update requested');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/icon-arr-6.png' }} style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Password</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Update Password</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your current password"
              placeholderTextColor="#6c757d"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <Image source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/iconex-l.png' }} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="#6c757d"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Image source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/iconex-l-2.png' }} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              placeholderTextColor="#6c757d"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7l_eFCHtJJZ6wAs/iconex-l-3.png' }} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 7,
    height: 12,
    marginRight: 6,
  },
  backButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    letterSpacing: 0.14,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 65,
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  content: {
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 39,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingHorizontal: 10,
    height: 54,
  },
  input: {
    flex: 1,
    fontFamily: 'Barlow',
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  eyeIcon: {
    width: 16,
    height: 16,
  },
  saveButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  saveButtonText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});

export default UpdatePassword;

