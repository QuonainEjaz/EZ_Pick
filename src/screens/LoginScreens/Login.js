import React, {useState, useMemo, useEffect, useRef, useCallback} from 'react';
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
  NativeModules,
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
import CustomAlert from '../../components/CustomAlert';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .test('is-email-or-username', 'Enter a valid email or username without spaces', function (value) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
      const hasNoSpaces = /^\S*$/.test(value || '');
      return (isEmail || hasNoSpaces) && !!value;
    })
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

const Login = () => {
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
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    onPress: () => {},
  });
  
  const navigation = useNavigation();
  
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
    const configureGoogleSignIn = async () => {
      try {
        // First, try to sign out to ensure clean state
        try {
          await GoogleSignin.signOut();
        } catch (signOutError) {
          console.log('No previous sign-in to clear');
        }

        // Configure Google Sign-In with minimal configuration
        const config = {
          webClientId: '536508971922-oepjtpjcc51rg87kvgl5v58s5n0tp32j.apps.googleusercontent.com', // Web client ID
          androidClientId: '536508971922-j5a3ga18f5n2bhgngbkvf1uv4meata7r.apps.googleusercontent.com', // Android client ID matching your debug SHA-1
          offlineAccess: false,
          scopes: ['profile', 'email']
        };

        await GoogleSignin.configure(config);
        
        // Log configuration for debugging
        console.log('Google Sign-In Configuration:', {
          ...config,
          packageName: 'com.ezpick',
          sha1: '5e8f16062ea3cd2c4a0d547876baa6f38cabf625' // Your debug keystore SHA-1
        });

        // Check Play Services
        const isPlayServicesAvailable = await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        console.log('Play Services available:', isPlayServicesAvailable);
        
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log('Already signed in:', isSignedIn);
        
        if (isSignedIn) {
          await GoogleSignin.signOut();
        }
      } catch (error) {
        console.error('Google Sign-In configuration error:', error);
        Alert.alert(
          'Configuration Error',
          'Failed to configure Google Sign-In. Please try again later.'
        );
      }
    };

    configureGoogleSignIn();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // First check Play Services
      const playServicesAvailable = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      
      if (!playServicesAvailable) {
        throw new Error('Google Play Services not available');
      }
      
      // Ensure we're signed out before attempting to sign in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
        // Add a small delay after signing out
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('Attempting Google Sign-In...');
      
      // Try to get current user first
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log('Current user before sign-in:', currentUser);
      } catch (err) {
        console.log('No current user');
      }
      
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In successful:', userInfo);
      
      if (!userInfo?.user?.id) {
        throw new Error('Failed to get user information');
      }

      // Get tokens
      const tokens = await GoogleSignin.getTokens();
      console.log('Got tokens:', tokens);

      if (!tokens?.accessToken) {
        throw new Error('Failed to get access token');
      }

      // Create user data object
      const userData = {
        id: userInfo.user.id,
        email: userInfo.user.email,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
        accessToken: tokens.accessToken
      };

      // Store in AsyncStorage
      await AsyncStorage.multiSet([
        ['api_token', tokens.accessToken],
        ['user_id', userInfo.user.id],
        ['user', JSON.stringify(userData)],
        ['isLoggedIn', 'true']
      ]);

      // Setup axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;

      // Dispatch to Redux
      dispatch(SET_TOKEN(tokens.accessToken));
      dispatch(SET_loginData(userData));

      // Wait for state updates
      await new Promise(resolve => setTimeout(resolve, 300));

      // Verify data is stored
      const [[, storedToken], [, storedUserId]] = await AsyncStorage.multiGet(['api_token', 'user_id']);

      if (storedToken && storedUserId) {
        // Navigate to TabNavigator
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
        showAlert('Error', 'Failed to store user data');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign In Cancelled', 'You cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign In In Progress', 'Another sign-in process is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services is not available or outdated');
      } else if (error.code === statusCodes.DEVELOPER_ERROR) {
        Alert.alert(
          'Configuration Error',
          'There is a problem with the Google Sign-In configuration. Please make sure you have set up Google Sign-In correctly in the Google Cloud Console.'
        );
      } else {
        Alert.alert(
          'Sign In Error',
          'There was an error signing in with Google. Please try again later.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to log SHA-1 fingerprint for debugging
  const logSHA1Fingerprint = async () => {
    if (Platform.OS === 'android' && __DEV__) {
      try {
        // This is a common pattern to get the SHA-1 from the Android keystore
        // Note: This is for debugging only and may not work in all environments
        const {getSHA1Fingerprint} = NativeModules;
        if (getSHA1Fingerprint) {
          const sha1 = await getSHA1Fingerprint();
          console.log('SHA-1 Fingerprint for Firebase:', sha1);
          console.log('Add this SHA-1 to your Firebase project in the Android app settings');
        } else {
          console.log('SHA-1 fingerprint helper not available');
          console.log('To get your SHA-1, run this command in your project directory:');
          console.log('cd android && ./gradlew signingReport');
        }
      } catch (error) {
        console.error('Error getting SHA-1:', error);
      }
    }
  };

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
      
      if (response.status === 200 && response.data && response.data.token) {
        console.log('Login Success');
        
        // Save token to AsyncStorage first
        await AsyncStorage.setItem('api_token', response.data.token);
        await AsyncStorage.setItem('user_id', response.data.data.id.toString());
        
        // Setup axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Dispatch both actions before navigation
        dispatch(SET_TOKEN(response.data.token));
        dispatch(SET_loginData(response.data.data));
        
        // Wait for state updates to complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verify token is stored before navigating
        const storedToken = await AsyncStorage.getItem('api_token');
        if (storedToken) {
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
          showAlert('Error', 'Failed to store authentication token');
        }
      } else {
        showAlert('Error', 'Invalid credentials or something went wrong');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Network issue, please try again.';
      console.error('Login Error:', error);
      showAlert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const showAlert = (title, message, type = 'error', onPress = () => setAlertConfig(prev => ({...prev, visible: false}))) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type,
      onPress,
    });
  };

  const handleScanQR = async () => {
    try {
      const granted = await requestPermission();
      if (!granted) {
        showAlert('Error', 'Failed to request camera permission');
        return;
      }
      setShowScanner(true);
    } catch (error) {
      console.error('Camera permission error:', error);
      showAlert('Error', 'Failed to request camera permission');
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
                  showAlert('Invalid QR Code', 'The QR code format is invalid. Expected format: username:password');
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
    <>
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
                 validationSchema={validationSchema}
                 validateOnBlur={true}
                 validateOnChange={true}
                 innerRef={formikRef}>
                 {({
                   values,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                   errors,
                   touched,
                   isSubmitting,
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
                      style={inputFieldStyle}
                      keyboardType="password"
                      secureTextEntry={true}
                      multiline={false}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    {errors.general && (
                      <View style={styles.generalErrorContainer}>
                        <Text style={styles.generalErrorText}>{errors.general}</Text>
                      </View>
                    )}
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
                        onPress={signInWithGoogle}
                        disabled={isLoading}
                      />
                      <SocialButton
                        icon={<OutlookIcon />}
                        title="Continue with Outlook"
                        onPress={() => showAlert('Outlook Login', 'This feature is currently unavailable.')}
                        disabled={isLoading}
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
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onPress={alertConfig.onPress}
      />
    </>
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
  generalErrorContainer: {
    backgroundColor: '#f8d7da',
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  generalErrorText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
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