import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SET_loginData, setToken} from '../../store/App/action';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomToggleButton from '../../components/CustomToggleButton';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import InputField from '../../components/InputFeild';
import CustomLink from '../../components/CustomLink';
import CustomButton from '../../components/CustomButton';
import ReactNativeBiometrics from 'react-native-biometrics';

/*
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email address')
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});
*/

const Login = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const smartLoginEnabled = useSelector(state => state.students.smartLoginEnabled);
  useEffect(() => {
    const checkSmartLogin = async () => {
      if (smartLoginEnabled) {
        const { success } = await ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Login using fingerprint or face recognition',
        });

        if (success) {
          navigation.navigate('TabNavigator'); 
        }
      }
    };

    checkSmartLogin();
  }, []);
  const handleLogin = async values => {
    setIsLoading(true);

    try {
      // const response = await axios.post(
      //   'https://backendtest.ezpick.org/parents/loginByEmail',
      //   {
      //     email: values.username,
      //     password: values.password,
      //   },
      // );
      // if (response.status === 200) {
      //   console.log('Login Success');
      //   dispatch(setToken(response.data.token));
      //   dispatch(SET_loginData(response.data.data));
      //   // console.log(response.data.data);
      //   navigation.navigate('TabNavigator');
      // } else {
      //   Alert.alert('Error', 'Invalid credentials or something went wrong');
      // }
      // Directly navigate to TabNavigator for debugging purposes
      navigation.navigate('TabNavigator');
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.message ||
      //   error.message ||
      //   'Network issue, please try again.';
      // console.error('Login Error:', error);
      // Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const inputFieldStyle = useMemo(
    () => ({
      label: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
      input: {
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        color: 'black',
      },
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <CustomToggleButton
        onToggle={language => console.log('Selected Language:', language)}
        customStyle={{width: width * 0.4, alignSelf: 'flex-end'}}
      />
      <View style={[styles.viewContainer, {width: width * 0.9}]}>
        <Heading boxStyle={styles.heading} title="Welcome to EZpick" />
        <SubHeading
          text="Lorem ipsum dolor sit amet consectetur. Elit malesuada massa sit sagittis."
          boxStyle={styles.heading}
          style={styles.subHeading}
        />

        {/* Formik Form */}
        <Formik
          initialValues={{username: '', password: ''}}
          // validationSchema={validationSchema}
          onSubmit={handleLogin}>
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
                style={inputFieldStyle}
                keyboardType="email-address"
                secureTextEntry={false}
                multiline={false}
              />
              {/*
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              */}

              <InputField
                label="Password"
                placeholder=""
                placeholderColor="#6C757D"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={inputFieldStyle}
                keyboardType="password"
                secureTextEntry={true}
                multiline={false}
              />
              {/*
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              */}

              <CustomLink
                label="Forget Password?"
                onPress={() => {
                  navigation.navigate('Forget_Password');
                }}
                style={styles.linkStyle}
              />
              <CustomButton
                title={'Login'}
                onPress={handleSubmit}
                touchStyle={{width: width * 0.9, height: height * 0.06}}
                disabled={isLoading}
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
  viewContainer: {
    flex: 1,
    padding: 1,
    paddingTop: 30,
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'start',
    color: '#6C757D',
    marginBottom: '5%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 15,
  },
  linkStyle: {
    alignSelf: 'flex-end',
    marginTop: -15,
    marginBottom: 40,
  },
});
export default Login;
