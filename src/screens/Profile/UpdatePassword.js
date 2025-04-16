import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import axios from 'axios'; // Import Axios
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputFeild';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import CustomAlert from '../../components/CustomAlert';
import Approved from '../../assets/Icons/svg/Approved';
import {useSelector} from 'react-redux';

const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain an uppercase, lowercase, number, and special character',
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const UpdatePassword = () => {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success',
  });
  
  const baseUrl = useSelector(state => state.students.baseUrl);
  const id = useSelector(state => state.students.parent?.id);

  const handleUpdatePassword = async (values, resetForm) => {
    try {
      const response = await axios.patch(`${baseUrl}/parents/update-password`, {
        id: id || 1000001,
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.data.success) {
        setAlertConfig({
          visible: true,
          title: 'Success',
          message: 'Your password has been updated successfully.',
          type: 'success',
        });
        resetForm();
      } else {
        setAlertConfig({
          visible: true,
          title: 'Error',
          message: response.data.message || 'Password update failed.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
    }
  };

  const handleAlertClose = () => {
    setAlertConfig(prev => ({...prev, visible: false}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading
          title="Update Password"
          textstyle={styles.title}
          boxStyle={styles.titleBox}
        />

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={passwordValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {resetForm}) =>
            handleUpdatePassword(values, resetForm)
          }>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <>
              <View style={styles.inputContainer}>
                <InputField
                  label="Current Password"
                  value={values.currentPassword}
                  onChangeText={handleChange('currentPassword')}
                  onBlur={handleBlur('currentPassword')}
                  secureTextEntry
                  style={inputStyles}
                  keyboardType={'password'}
                />
                {errors.currentPassword && (
                  <Text style={styles.errorText}>{errors.currentPassword}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <InputField
                  label="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  secureTextEntry
                  style={inputStyles}
                  keyboardType={'password'}
                />
                {errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <InputField
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                  style={inputStyles}
                  keyboardType={'password'}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <CustomButton
                title="Save"
                onPress={handleSubmit}
                touchStyle={styles.saveButton}
                textStyle={styles.saveButtonText}
              />
            </>
          )}
        </Formik>
      </View>
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onPress={handleAlertClose}
      />
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
  inputContainer: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
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

const inputStyles = {
  input: {borderWidth: 1, borderColor: '#E3E3E3'},
  label: {color: '#212529', fontWeight: 'bold', fontSize: 14},
};

export default UpdatePassword;
