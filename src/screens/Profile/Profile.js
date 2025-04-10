import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import {setSmartLogin, setStudents} from '../../store/App/action';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomToggleSwitch from '../../components/CustomToggleSwitch';
import LogoutConfirmation from './LogoutConfirmation';
import ArrowRight from '../../assets/Icons/svg/ArrowRight';
import {ProfileScreenIcons} from '../../assets/Icons/svg/ProfileScreenIcons';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const smartLoginEnabled = useSelector(
    state => state.students.smartLoginEnabled,
  );
  const students = useSelector(state => state.students.students);
  const [toggleSwitchValue, setToggleSwitchValue] = useState(smartLoginEnabled);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loginData = useSelector(state => state.students.loginData);
  const userRole = loginData?.role;
  
  // Check if role is "guard" or "guards" (case insensitive)
  const isGuard = useMemo(() => {
    if (!userRole) return false;
    const role = userRole.toLowerCase().trim();
    return role === 'guard' || role === 'guards';
  }, [userRole]);
  
  console.log('User role:', userRole, 'isGuard:', isGuard);

  const pages = useMemo(
    () => {
      const defaultPages = [
        {
          title: 'Update Password',
          icon: 'UpdatePasswordIcon',
          screen: 'UpdatePassword',
        },
        {title: 'Enable Smart Login', icon: 'EnableSmartLoginIcon'},
        {title: 'Language', icon: 'LanguageIcon', screen: 'LanguageSelection'},
        {title: 'Logout', icon: 'LogoutIcon'},
      ];

      // Only add Authorized Pickup for parent users specifically
      const isParent = userRole?.toLowerCase() === 'parent';
      if (isParent) {
        defaultPages.unshift({
          title: 'Authorized Pickup',
          icon: 'AuthorizedPickupIcon',
          screen: 'Add',
        });
      }

      return defaultPages;
    },
    [userRole],
  );

  const handleEnableSmartLogin = useCallback(async () => {
    try {
      const {available} = await ReactNativeBiometrics.isSensorAvailable();
      if (!available) {
        setToggleSwitchValue(false);
        dispatch(setSmartLogin(false));
        return Alert.alert('Biometric authentication not available');
      }
      const {success} = await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Login using fingerprint or face recognition',
      });

      if (success) {
        dispatch(setSmartLogin(true));
        Alert.alert('Smart Login Enabled Successfully');
      } else {
        setToggleSwitchValue(false);
        dispatch(setSmartLogin(false));
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }, [dispatch, setToggleSwitchValue]);

  const onToggleSwitch = useCallback(value => {
    setToggleSwitchValue(value);
    dispatch(setSmartLogin(value));
    if (value) handleEnableSmartLogin();
  }, [dispatch, handleEnableSmartLogin]);

  const handleLogout = () => {
    setIsModalVisible(false);
    dispatch(setSmartLogin(false));
    dispatch(setStudents([]));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const combinedData = useMemo(() => {
    // For guards, don't include headers or student items at all
    if (isGuard) {
      return pages.map(page => ({ type: 'PAGE', data: page }));
    }

    // For parents and other roles with no students
    if (students?.length === 0) {
      return [
        { type: 'HEADER', title: 'Children', isEmpty: true }, 
        { type: 'EMPTY' }, 
        { type: 'HEADER', title: 'Other Pages' },
        ...pages.map(page => ({ type: 'PAGE', data: page })),
      ];
    }
  
    // For parents and other roles with students
    return [
      { type: 'HEADER', title: 'Children' },
      ...(students || []).map(student => ({ type: 'STUDENT', data: student })),
      { type: 'HEADER', title: 'Other Pages' },
      ...pages.map(page => ({ type: 'PAGE', data: page })),
    ];
  }, [students, pages, isGuard]);

  const renderItem = ({ item }) => {
    // For guards, we only have PAGE items in the data array
    if (item.type === 'HEADER') {
      // Skip rendering headers for guards (as a safety check)
      if (isGuard) return null;
      
      return (
        <View>
          <Heading
            title={item.title}
            textstyle={styles.sectionTitle}
            boxStyle={styles.sectionTitleBox}
          />
        </View>
      );
    }
  
    if (item.type === 'EMPTY') {
      // Skip rendering empty state for guards
      if (isGuard) return null;
      
      return <SubHeading text="No children found" style={styles.emptyText} />;
    }
    
    // Skip rendering students for guards
    if (item.type === 'STUDENT' && isGuard) return null;
  
    const isPage = item.type === 'PAGE';
    const isLogout = isPage && item.data.title === 'Logout';
    const IconComponent = isPage ? ProfileScreenIcons[item.data.icon] : null;
  
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          if (isLogout) return setIsModalVisible(true);
          if (isPage && item.data.screen)
            return navigation.navigate(item.data.screen);
          if (isPage && item.data.title === 'Enable Smart Login')
            return handleEnableSmartLogin();
          navigation.navigate('ProfileDetail', { student: item.data });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
          }}>
          {IconComponent && <IconComponent />}
          {!isPage && item.data.profileUrl && (
            <Image source={{ uri: item.data.profileUrl }} style={styles.profileImage} />
          )}
          <SubHeading
            text={isPage ? item.data.title : item.data.name}
            style={styles.profileName}
          />
        </View>
        {item.data?.title === 'Enable Smart Login' ? (
          <CustomToggleSwitch value={toggleSwitchValue} onToggle={onToggleSwitch} />
        ) : (
          <ArrowRight />
        )}
      </TouchableOpacity>
    );
  };

  // Create a container style that has additional top padding only for guards
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      isGuard && { paddingTop: 10 } // Apply additional top padding only for guards
    ];
  }, [isGuard]);

  // Create a content container style with additional padding only for guards
  const contentStyle = useMemo(() => {
    return [
      styles.contentContainer,
      isGuard && { paddingTop: 15 } // Apply additional top padding only for guards
    ];
  }, [isGuard]);

  return (
    <View style={containerStyle}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <SubHeading text="No children found" style={styles.emptyText} />
        }
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <LogoutConfirmation
            onLogout={handleLogout}
            onCancel={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20
  },
  contentContainer: {
    // No default top padding - will be added conditionally
  },
  sectionTitleBox: {alignItems: 'flex-start'},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginVertical: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F8F8F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  profileImage: {width: 37, height: 37, borderRadius: 4},
  profileName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6c757d',
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  emptyText: {color: '#6c757d', textAlign: 'center', marginVertical: 20},
});

export default Profile;

