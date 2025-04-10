import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Platform,
  Linking,
  LogBox,
  TouchableOpacity,
} from 'react-native';
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
import {Camera, useCameraDevice, useCameraPermission, useCameraFormat} from 'react-native-vision-camera';
import {CommonActions} from '@react-navigation/native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
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

// Ignore specific warnings that might be related to permissions
LogBox.ignoreLogs([
  'Permission request result:',
  'Permission status:',
]);

const Login = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
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
  }, [navigation, smartLoginEnabled]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        'com.googleusercontent.apps.912485674622-5ghcfmq2k4n76ejemljkdfeb9682j58r',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    let retryTimer;
    if (showScanner) {
      const initializeCamera = () => {
        if (retryCount < MAX_RETRIES) {
          setIsCameraReady(true);
        } else {
          setCameraError('Failed to initialize camera after multiple attempts');
        }
      };

      retryTimer = setTimeout(initializeCamera, 1000);
    } else {
      setIsCameraReady(false);
      setRetryCount(0);
      setCameraError(null);
    }

    return () => {
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [showScanner, retryCount]);

  const handleCameraError = (error) => {
    console.log('Camera initialization attempt:', retryCount + 1);
    
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        setIsCameraReady(true);
      }, RETRY_DELAY);
    } else {
      setCameraError('Unable to access camera. Please try again later.');
    }
  };

  const handleLogin = async values => {
    setIsLoading(true);

    try {
      // Check if input is email or username
      const isEmail = values.username.includes('@');
      const endpoint = isEmail 
        ? 'https://api.ezpick.co/parents/loginByEmail'
        : 'https://api.ezpick.co/parents/loginByUsername';
      
      const response = await axios.post(
        endpoint,
        {
          email: isEmail ? values.username : undefined,
          username: isEmail ? undefined : values.username,
          password: values.password,
        },
      );
      
      if (response.status === 200) {
        console.log('Login Success');
        // Dispatch both actions before navigation
        dispatch(SET_TOKEN(response.data.token));
        dispatch(SET_loginData(response.data.data));
        
        // Wait for state updates to complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Navigate to TabNavigator to allow data fetching in HomeScreen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ 
              name: 'TabNavigator',
              state: {
                routes: [{ name: 'Home' }],
                index: 0
              }
            }],
          })
        );
      } else {
        Alert.alert('Error', 'Invalid credentials or something went wrong');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Network issue, please try again.';
      console.error('Login Error:', error);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanQR = async () => {
    try {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Permission',
            'Please grant camera permission to scan QR codes',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        }
      }
      setShowScanner(true);
    } catch (err) {
      console.error('Error requesting camera permission:', err);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const renderQRScanner = () => {
    if (!showScanner) return null;
    
    if (!device) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.errorContainer]}>
          <Text style={styles.cameraErrorText}>Camera device not available</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (cameraError && retryCount >= MAX_RETRIES) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.errorContainer]}>
          <Text style={styles.cameraErrorText}>{cameraError}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setCameraError(null);
              setRetryCount(0);
              setShowScanner(false);
            }}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!isCameraReady) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.errorContainer]}>
          <Text style={styles.cameraErrorText}>Initializing camera...</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={StyleSheet.absoluteFill}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          enableZoomGesture
          onError={handleCameraError}
          codeScanner={{
            codeTypes: ['qr'],
            onCodeScanned: (codes) => {
              if (!codes || !Array.isArray(codes)) return;
              
              const validCodes = codes.filter(code => code && code.value);
              if (validCodes.length > 0) {
                const qrData = validCodes[0].value;
                console.log('QR Code detected:', qrData);
                
                const [username, password] = qrData.split(':');
                if (username && password) {
                  setShowScanner(false);
                  handleLogin({ username, password });
                } else {
                  Alert.alert('Invalid QR Code', 'The QR code format is invalid. Expected format: username:password');
                }
              }
            },
          }}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowScanner(false)}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
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
      {showScanner ? (
        renderQRScanner()
      ) : (
        <>
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
                    />
                    <SocialButton
                      icon={<QRIcon />}
                      title="Scan QR code"
                      onPress={handleScanQR}
                      containerStyle={{marginTop: 30, backgroundColor: '#F8F8F9'}}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </>
      )}
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
  closeButton: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraErrorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Login;
