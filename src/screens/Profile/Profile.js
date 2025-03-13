import React, {useState, useMemo, useCallback} from 'react';
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

  const pages = useMemo(
    () => [
      {title: 'Authorized Pickup', icon: 'AuthorizedPickupIcon', screen: 'Add'},
      {
        title: 'Update Password',
        icon: 'UpdatePasswordIcon',
        screen: 'UpdatePassword',
      },
      {title: 'Enable Smart Login', icon: 'EnableSmartLoginIcon'},
      {title: 'Language', icon: 'LanguageIcon', screen: 'LanguageSelection'},
      {title: 'Logout', icon: 'LogoutIcon'},
    ],
    [],
  );

  const handleEnableSmartLogin = async () => {
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
  };

  const onToggleSwitch = useCallback(value => {
    setToggleSwitchValue(value);
    dispatch(setSmartLogin(value));
    if (value) handleEnableSmartLogin();
  }, []);

  const handleLogout = () => {
    setIsModalVisible(false);
    dispatch(setSmartLogin(false));
    dispatch(setStudents([]));
    navigation.navigate('Login');
  };

  const combinedData = useMemo(() => {
    if (students.length === 0) {
      return [
        { type: 'HEADER', title: 'Children', isEmpty: true }, 
        { type: 'EMPTY' }, 
        { type: 'HEADER', title: 'Other Pages' },
        ...pages.map(page => ({ type: 'PAGE', data: page })),
      ];
    }
  
    return [
      { type: 'HEADER', title: 'Children' },
      ...students.map(student => ({ type: 'STUDENT', data: student })),
      { type: 'HEADER', title: 'Other Pages' },
      ...pages.map(page => ({ type: 'PAGE', data: page })),
    ];
  }, [students, pages]);

  const renderItem = ({ item }) => {
    if (item.type === 'HEADER') {
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
      return <SubHeading text="No children found" style={styles.emptyText} />;
    }
  
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
  

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <SubHeading text="No children found" style={styles.emptyText} />
        }
        contentContainerStyle={styles.contentContainer}
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
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 20},
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

