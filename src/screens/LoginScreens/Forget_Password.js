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

const validationSchema = Yup.object({
  username: Yup.string()
    .email('Invalid email address')
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'), 
});

const Forget_Password = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        'https://backendtest.ezpick.org/clients/forgotPassword',
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
        setModalVisible(true); 
      } else {
        actions.setFieldError('username', 'Failed to send reset link');
      }
    } catch (error) {
      actions.setFieldError(
        'username',
        'Something went wrong, try again later',
      );
    } finally {
      actions.setSubmitting(false);
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

      {/* Modal for Success Message */}
      <CustomAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        label={'Email Sent Successfully!'}
        message={'We have sent you a link to reset your password.'}
        buttonText={'Ok, Got it'}
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
    marginBottom: 15,
  },
});

export default Forget_Password;
