import React, {useEffect, useCallback, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad, setStudents, SET_PARENT} from '../../store/App/action';
import axios from 'axios';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);
  const loginData = useSelector(state => state.students.loginData);
  const id = loginData?.id;
  const baseUrl = useSelector(state => state.students.baseUrl);
  const students = useSelector(state => state.students.students);
  const hasNavigated = useRef(false);
  const isFetching = useRef(false);
  const [dataFetched, setDataFetched] = useState(false);

  // console.log('HomeScreen rendered with loginData:', loginData);
  console.log('isFirstLoad:', isFirstLoad);
  // console.log('students:', students);

  // Handle the navigation logic
  const handleNavigation = useCallback(() => {
    hasNavigated.current = true;
    
    console.log('Handling navigation with isFirstLoad:', isFirstLoad);
    console.log('Student count:', students?.length);
    
    if (loginData?.role === 'guards') {
      // For guards, immediately navigate to GuardScreen
      console.log('Navigating to GuardScreen');
      // Use replace instead of navigate for smoother transition
      navigation.replace('GuardScreen');
      return;
    }
      
    // Check if any students need profile pictures
    const studentsWithoutProfilePic = students?.filter(student => student?.profileUrl === null) || [];
    console.log('Students without profile pic:', studentsWithoutProfilePic.length);
    
    if (isFirstLoad && studentsWithoutProfilePic.length > 0) {
      // Only go to StudentUploadScreen if there are students without profile pictures
      console.log('Navigating to StudentUploadScreen');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StudentUploadScreen' }],
        })
      );
    } else {
      // If no students need profile pictures or not first load, skip to TabNavigator or StudentListScreen
      if (isFirstLoad) {
        // First load but no profile pics needed, go directly to TabNavigator
        console.log('No profile pictures needed, navigating to TabNavigator');
        dispatch(toggleFirstLoad(false)); // Set isFirstLoad to false since we're skipping StudentUploadScreen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          })
        );
      } else {
        // Normal navigation to StudentListScreen
        console.log('Navigating to StudentListScreen');
        // Use replace instead of reset for smoother transition within the stack
        navigation.replace('StudentListScreen');
      }
    }
  }, [isFirstLoad, students, navigation, loginData, dispatch]);

  const fetchStudents = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    // For guards, don't bother fetching student data
    if (loginData?.role === 'guards') {
      handleNavigation();
      isFetching.current = false;
      return;
    }

    try {
      console.log('Fetching students data from:', `${baseUrl}/parents/${id}`);
      const response = await axios.get(
        `${baseUrl}/parents/${id}`,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData?.token}`,
          }
        }
      );
      console.log('API Response:', response.status, response.data);
      
      if (response.status === 200) {
        dispatch(SET_PARENT(response.data.parent));
        dispatch(setStudents(response.data.parent.students));
        setDataFetched(true);
        console.log('Data fetched and stored successfully');
        
        // Navigate immediately without delay
        handleNavigation();
      } else {
        console.error('Fetch Error:', response);
        // Still navigate to avoid being stuck
        handleNavigation();
      }
    } catch (error) {
      console.error('Fetch Students Error:', error);
      console.error('Error details:', error.response || error.message);
      
      // Even if there's an error, navigate to avoid being stuck
      handleNavigation();
    } finally {
      isFetching.current = false;
    }
  }, [dispatch, id, baseUrl, loginData, handleNavigation]);

  // Fetch data on component mount
  useEffect(() => {
    console.log('Fetch data useEffect triggered with id:', id);
    
    // For guards role, navigate immediately
    if (loginData?.role === 'guards' && !hasNavigated.current) {
      handleNavigation();
      return;
    }
    
    if (id && !hasNavigated.current) {
      fetchStudents();
    } else if (!hasNavigated.current) {
      console.log('No user ID available for fetching data');
      handleNavigation();
    }
  }, [id, fetchStudents, loginData, handleNavigation]);

  // Return a loading indicator instead of null
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F8AC16" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export default HomeScreen;
