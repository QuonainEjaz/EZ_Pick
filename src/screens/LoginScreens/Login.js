import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SET_loginData, SET_TOKEN} from '../../store/App/action';
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
import SocialButton from '../../components/LoginSocialButtons';
import AppleIcon from '../../assets/Icons/svg/Apple';
import GoogleIcon from '../../assets/Icons/svg/Google';
import OutlookIcon from '../../assets/Icons/svg/Outlook';
import QRIcon from '../../assets/Icons/svg/QRCode';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FirebaseApp from '@react-native-firebase/app';
// import {PublicClientApplication} from 'react-native-msal';
// const msalConfig = {
//   auth: {
//     clientId: '3d5a0688-c3b9-4486-9f3f-c45cfaad5ba8', // Your Microsoft client ID
//     authority: 'https://login.microsoftonline.com/consumers',
//     redirectUri: 'msauth.whetstonez.ios.EZPick://auth',
//   },
//   cache: {
//     cacheLocation: 'localStorage', // optional, adjust as needed
//     storeAuthStateInCookie: false,
//   },
// };

// const msalInstance = new PublicClientApplication(msalConfig);

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
  const smartLoginEnabled = useSelector(
    state => state.students.smartLoginEnabled,
  );
  useEffect(() => {
    const checkSmartLogin = async () => {
      if (smartLoginEnabled) {
        const {success} = await ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Login using fingerprint or face recognition',
        });

        if (success) {
          navigation.navigate('TabNavigator');
        }
      }
    };

    checkSmartLogin();
  }, []);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'com.googleusercontent.apps.912485674622-5ghcfmq2k4n76ejemljkdfeb9682j58r',
      offlineAccess: true,
    });
  }, []);
  // const handleMicrosoftLogin = async () => {
  //   try {
  //     // First, check if an account is already signed in
  //     const accounts = await msalInstance.getAccounts();
  //     let authResponse;

  //     if (accounts.length > 0) {
  //       // Attempt silent token acquisition if account exists
  //       try {
  //         authResponse = await msalInstance.acquireTokenSilent({
  //           scopes: ['user.read'],
  //           account: accounts[0],
  //         });
  //       } catch (error) {
  //         // If silent acquisition fails, fall back to interactive login
  //         authResponse = await msalInstance.acquireToken({
  //           scopes: ['user.read'],
  //         });
  //       }
  //     } else {
  //       // No account signed in, perform interactive login
  //       authResponse = await msalInstance.acquireToken({
  //         scopes: ['user.read'],
  //       });
  //     }
  //     // Successful Microsoft login
  //     console.log('Microsoft auth token:', authResponse.accessToken);
  //     // You might want to send the access token to your backend for further processing
  //     navigation.navigate('TabNavigator');
  //   } catch (error) {
  //     console.error('Microsoft Sign-In Error:', error);
  //     Alert.alert(
  //       'Microsoft Sign-In Error',
  //       error.message || 'An error occurred during Microsoft sign in',
  //     );
  //   }
  // };
  const handleLogin = async values => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://backendtest.ezpick.org/parents/loginByEmail',
        {
          email: values.username,
          password: values.password,
        },
      );
      if (response.status === 200) {
        console.log('Login Success');
        dispatch(SET_TOKEN(response.data.token));
        console.log(response.data.token);
        dispatch(SET_loginData(response.data.data));
        // console.log(response.data.data);
        navigation.navigate('TabNavigator');
      } else {
        Alert.alert('Error', 'Invalid credentials or something went wrong');
      }
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
      label: {fontSize: 15, fontWeight: 'bold', marginBottom: 5},
      input: {
        paddingVertical: 8,
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
        <Heading
          boxStyle={styles.heading}
          textstyle={styles.headingText}
          title="Welcome to EZpick"
        />
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
                touchStyle={{width: width * 0.9, height: height * 0.065}}
                disabled={isLoading}
              />
              <SubHeading
                text="Or Login with"
                style={styles.orText}
                boxStyle={styles.orBox}
              />
              {/* Social Buttons Below Login */}
              <View style={styles.socialButtonsContainer}>
                <SocialButton
                  icon={<AppleIcon />}
                  title="Continue with Apple"
                  onPress={() => console.log('Apple Pressed')}
                />
                <SocialButton
                  icon={<GoogleIcon />}
                  title="Continue with Google"
                  onPress={async () => {
                    try {
                      await GoogleSignin.hasPlayServices();
                      const userInfo = await GoogleSignin.signIn();
                      console.log('Google user info:', userInfo);
                      navigation.navigate('TabNavigator');
                    } catch (error) {
                      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        console.log('User cancelled Google sign-in');
                      } else if (error.code === statusCodes.IN_PROGRESS) {
                        console.log('Google sign-in in progress');
                      } else if (
                        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                      ) {
                        Alert.alert(
                          'Error',
                          'Google Play Services not available',
                        );
                      } else {
                        console.error('Google Sign-In Error:', error);
                      }
                    }
                  }}
                />
                <SocialButton
                  icon={<OutlookIcon />}
                  title="Continue with Outlook"
                  // onPress={handleMicrosoftLogin}
                />
                <SocialButton
                  icon={<QRIcon />}
                  title="Scan QR code"
                  onPress={() => console.log('QR Pressed')}
                  containerStyle={{marginTop: 30, backgroundColor: '#F8F8F9'}}
                />
              </View>
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
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  viewContainer: {
    flex: 1,
    padding: 1,
    paddingTop: 20,
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  headingText: {
    fontWeight: '900',
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
    marginBottom: 20,
  },
  orText: {
    color: '#6C757D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '900',
  },
  orBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  socialButtonsContainer: {
    justifyContent: 'space-between',
  },
});
export default Login;
