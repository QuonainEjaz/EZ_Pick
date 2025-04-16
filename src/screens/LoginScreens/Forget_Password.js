import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LinkButton from '../../components/LinkButton';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import InputField from '../../components/InputFeild';
import CustomButton from '../../components/CustomButton';
import CustomAlert from '../../components/CustomAlert';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  username: Yup.string()
    .email('Invalid email address')
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'), 
});

const Forget_Password = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success',
  });
  const baseUrl = useSelector(state => state.students.baseUrl);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        `${baseUrl}/parents/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.username,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setAlertConfig({
          visible: true,
          title: 'Email Sent Successfully!',
          message: 'We have sent you a link to reset your password.',
          type: 'success',
        });
      } else {
        setAlertConfig({
          visible: true,
          title: 'Error',
          message: 'Failed to send reset link. Please try again.',
          type: 'error',
        });
      }
    } 
    catch (error) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        type: 'error',
      });
    } 
    finally {
      actions.setSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setAlertConfig(prev => ({...prev, visible: false}));
    if (alertConfig.type === 'success') {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <LinkButton
        label={'Back'}
        style={{alignSelf: 'flex-start'}}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <View style={[styles.viewContainer, {width: width * 0.9}]}>
        <Heading boxStyle={styles.heading} title="Forget Password" />
        <SubHeading
          text="In case you forgot your password, enter your email to reset your password."
          boxStyle={styles.heading}
          style={{fontSize: 14, textAlign: 'start', color: '#6C757D'}}
        />
        <View style={{height: height * 0.03}} />

        {/* Formik Form */}
        <Formik
          initialValues={{username: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
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
                  label: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
                  input: {
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                  },
                }}
                keyboardType="email-address"
                secureTextEntry={false}
                multiline={false}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <View style={{height: height * 0.03}} />

              <CustomButton
                title="Send"
                onPress={handleSubmit}
                touchStyle={{width: width * 0.9, height: height * 0.06}}
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
  heading: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  viewContainer: {
    flex: 1,
    padding: 1,
    paddingTop: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
  },
});

export default Forget_Password;
