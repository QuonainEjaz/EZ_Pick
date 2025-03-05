import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import CustomToggleButton from '../../components/CustomToggleButton';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import InputField from '../../components/InputFeild';
import CustomLink from '../../components/CustomLink';
import CustomButton from '../../components/CustomButton';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email address') // Checks for valid email format
    .matches(/^\S*$/, 'Username cannot contain spaces') // Checks if username has spaces
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long') // Checks for minimum length
    .required('Password is required'),
});

const Login = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleLanguageChange = language => {
    console.log('Selected Language:', language);
  };

  const handleLogin = async (values) => {
    setIsLoading(true); // Start loading
  
    try {
      const response = await axios.get('https://fronttest.ezpick.org/login', {
        username: values.username,
        password: values.password,
      });
  
      // Check the response (you can adjust this based on your API's response)
      if (response.status === 200) {
        console.log('Login Success:', response.data);
        navigation.navigate('TabNavigator');
      } else {
        Alert.alert('Error', 'Invalid credentials or something went wrong');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login Error:', error.response.status, error.response.data);
        Alert.alert('Error', `Server responded with: ${error.response.status}`);
      } else {
        console.error('Login Error:', error.message);
        Alert.alert('Error', 'Network issue, please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomToggleButton
        onToggle={handleLanguageChange}
        customStyle={{ width: width * 0.4, alignSelf: 'flex-end' }}
      />
      <View style={[styles.viewContainer, { width: width * 0.9 }]}>
        <Heading boxStyle={styles.heading} title="Welcome to EZpick" />
        <SubHeading
          text="Lorem ipsum dolor sit amet consectetur. Elit malesuada massa sit sagittis."
          boxStyle={styles.heading}
          style={{
            fontSize: 14,
            textAlign: 'start',
            color: '#6C757D',
            marginBottom: '5%',
          }}
        />

        {/* Formik Form */}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin} // Call handleLogin on form submission
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <InputField
                label="Username"
                placeholder="Enter your username"
                placeholderColor="#6C757D"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                style={{
                  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
                  input: {
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    color: '#333',
                  },
                }}
                keyboardType="email-address"
                secureTextEntry={false}
                multiline={false}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <InputField
                label="Password"
                placeholder=""
                placeholderColor="#6C757D"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={{
                  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
                  input: {
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                  },
                }}
                keyboardType="default"
                secureTextEntry={true}
                multiline={false}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <CustomLink
                label="Forget Password?"
                onPress={() => {
                  navigation.navigate('Forget_Password');
                }}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: -15,
                  marginBottom: 40,
                }}
              />
              <CustomButton
                title={isLoading ? 'Loading...' : 'Login'}
                onPress={handleSubmit} // Trigger form submission
                touchStyle={{ width: width * 0.9, height: height * 0.06 }}
                disabled={isLoading} // Disable button when loading
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#FFFFFF',
  },
  toggleButton: {},
  viewContainer: {
    flex: 1,
    padding: 1,
    paddingTop: 30,
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 15,
  },
});

export default Login;
