import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import InputField from '../../components/InputFeild';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';

const UpdatePassword = ({
  initialCurrentPassword = '',
  initialNewPassword = '',
  initialConfirmPassword = '',
}) => {
  const [currentPassword, setCurrentPassword] = useState(
    initialCurrentPassword,
  );
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  const [confirmPassword, setConfirmPassword] = useState(
    initialConfirmPassword,
  );

  const handleSave = () => {
    console.log('Password update requested');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading
          title="Update Password"
          textstyle={styles.title}
          boxStyle={styles.titleBox}
        />
        <InputField
          label="Current Password"
          placeholder=""
          value={currentPassword}
          onChangeText={setCurrentPassword}
          keyboardType="password"
          style={{
            input: {borderWidth: 1, borderColor: '#E3E3E3'},
            label: {color: '#212529',fontWeight: 'bold', fontSize: 14},
          }}
        />
        <InputField
          label="New Password"
          placeholder=""
          value={newPassword}
          onChangeText={setNewPassword}
          keyboardType="password"
          style={{input: {borderWidth: 1, borderColor: '#E3E3E3'},
          label: {color: '#212529',fontWeight: 'bold', fontSize: 14},}}
        />
        <InputField
          label="Confirm Password"
          placeholder=""
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType="password"
          style={{input: {borderWidth: 1, borderColor: '#E3E3E3'},
          label: {color: '#212529',fontWeight: 'bold', fontSize: 14},}}
        />
        <CustomButton
          title="Save"
          onPress={handleSave}
          touchStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  content: {
    paddingVertical: 20,
  },
  titleBox: {
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: '#212529',
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 40,
    width: '100%',
    height: 50,
  },
  saveButtonText: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});

export default UpdatePassword;
