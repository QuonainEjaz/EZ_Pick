import React, {useState, useMemo, useEffect, useRef} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email address')
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});


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
  const [googleEmail, setGoogleEmail] = useState(null);
  const formikRef = React.useRef(null);
  
  // Update username field when googleEmail changes
  useEffect(() => {
    if (googleEmail && formikRef.current) {
      formikRef.current.setFieldValue('username', googleEmail);
    }
  }, [googleEmail]);

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
    // Initialize Google Sign-In with proper configuration
    GoogleSignin.configure({
      webClientId: '601738057136-78c84si77t9vi2dbudmmqt69ifkcrtsm.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
      forceCodeForRefreshToken: true, // Add this for better token refresh
    });
    
    // Add debug logging for development
    if (__DEV__) {
      console.log('Google Sign-In configured with webClientId:', 
        '601738057136-78c84si77t9vi2dbudmmqt69ifkcrtsm.apps.googleusercontent.com');
      
      // Check if Play Services are available to help with debugging
      GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        .then(() => console.log('Google Play Services available'))
        .catch(error => console.error('Google Play Services error:', error));
    }
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

  /**
   * Handles the Google Sign-In process with token verification
   */
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // 1. Check if Play Services are available
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('Google Play Services available');
      
      // 2. Sign out any existing Google user first
      try {
        await GoogleSignin.signOut();
        console.log('Previous Google Sign-In session cleared');
      } catch (error) {
        // It's OK if there was no previous session
        console.log('No previous Google session to clear');
      }
      
      // Log current Google Sign-In configuration
      console.log('Google Sign-In config:', {
        webClientId: '601738057136-78c84si77t9vi2dbudmmqt69ifkcrtsm.apps.googleusercontent.com',
        offlineAccess: true,
        scopes: ['profile', 'email']
      });
      
      // 3. Trigger Google Sign-In
      console.log('Starting Google Sign-In...');
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In successful, user info:', userInfo);
      
      // 4. Get the authentication token
      const tokens = await GoogleSignin.getTokens();
      console.log('Google tokens retrieved:', tokens);
      
      if (!tokens.idToken) {
        throw new Error('Failed to get ID token from Google Sign-In');
      }
      console.log('Google ID token acquired');
      
      // 5. Verify token with backend
      const authResponse = await verifyGoogleToken(tokens.idToken, userInfo.user.email);
      
      // 6. Store auth data and navigate to home
      await saveAuthData(authResponse.token, authResponse.data);
      
      console.log('Authentication successful, navigating to home');
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
    } catch (error) {
      handleGoogleSignInError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sends the Google ID token to the backend for verification
   */
  const verifyGoogleToken = async (idToken, email) => {
    try {
      console.log('Verifying token with backend...');
      
      // Try the loginByGoogle endpoint
      try {
        const response = await axios.post('https://api.ezpick.co/parents/loginByGoogle', {
          token: idToken,
          email: email
        });
        
        if (response.status === 200 && response.data) {
          console.log('Token verified successfully with loginByGoogle');
          return response.data;
        }
      } catch (googleLoginError) {
        console.log('loginByGoogle endpoint failed, trying verifyToken');
        // If the first endpoint fails, try the verifyToken endpoint
        const response = await axios.post('https://api.ezpick.co/parents/verifyToken', {
          token: idToken,
          provider: 'google'
        });
        
        if (response.status === 200 && response.data) {
          console.log('Token verified successfully with verifyToken');
          return response.data;
        }
      }
      
      throw new Error('Failed to verify token with backend');
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  };

  /**
   * Stores authentication data both in AsyncStorage and Redux
   */
  const saveAuthData = async (token, userData) => {
    try {
      // 1. Save to AsyncStorage for persistence
      await AsyncStorage.setItem('api_token', token);
      await AsyncStorage.setItem('user_id', userData.id.toString());
      await AsyncStorage.setItem('social_login', 'google');
      
      // 2. Setup axios default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // 3. Save to Redux for app state
      dispatch(SET_TOKEN(token));
      dispatch(SET_loginData(userData));
      
      console.log('Auth data saved successfully');
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  };

  /**
   * Handles Google Sign-In errors with appropriate user feedback
   */
  const handleGoogleSignInError = (error) => {
    let message = 'Failed to login with Google';
    
    console.error('Google Sign-In Error Details:', {
      code: error.code,
      message: error.message,
      fullError: error
    });
    
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled Google Sign-In');
      return; // Don't show error alert for user cancellation
    } else if (error.code === statusCodes.IN_PROGRESS) {
      message = 'Google Sign-In is already in progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      message = 'Google Play Services are not available on this device';
    } else if (error.code === statusCodes.DEVELOPER_ERROR) {
      // More specific message for DEVELOPER_ERROR
      message = 'Google Sign-In configuration error. Please check:\n1. SHA-1 fingerprint in Firebase Console\n2. WebClientID is correct\n3. Package name matches Firebase console';
      
      // Additional debug info for developer
      if (__DEV__) {
        console.log('Debug info for DEVELOPER_ERROR:');
        console.log('- Package name should be: com.ezpick');
        console.log('- SHA-1 should be added to Firebase: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25');
        console.log('- Check if OAuth client ID is created in Google Cloud Console');
      }
    } else if (error.message && error.message.includes('token')) {
      message = 'Authentication failed. Please try again or use email login.';
    } else if (error.response) {
      // Backend API error
      message = error.response.data?.message || 'Server error during authentication';
      
      // If backend returns that the email is not registered, offer manual login
      if (error.response.status === 404 && error.response.data?.email) {
        setGoogleEmail(error.response.data.email);
        message = 'Account not found. Please enter your password to login.';
      }
    }
    
    console.error('Google Sign-In Error:', message, error);
    Alert.alert('Authentication Error', message);
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
              initialValues={{username: googleEmail || '', password: ''}}
              enableReinitialize={true}
              onSubmit={handleLogin}
              innerRef={formikRef}>
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
                    editable={!googleEmail} // Disable when email is set from Google
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
                      onPress={handleGoogleSignIn}
                      disabled={isLoading}
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
