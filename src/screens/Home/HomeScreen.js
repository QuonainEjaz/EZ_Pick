import React, {useEffect, useCallback, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad, setStudents, SET_PARENT} from '../../store/App/action';
import axios from 'axios';
import {Alert} from 'react-native';

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
    
    if (isFirstLoad) {
      console.log('Navigating to StudentUploadScreen');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StudentUploadScreen' }],
        })
      );
    } else {
      console.log('Navigating to StudentListScreen');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StudentListScreen' }],
        })
      );
    }
  }, [isFirstLoad, students, navigation]);

  const fetchStudents = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;

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
      } else {
        console.error('Fetch Error:', response);
        Alert.alert('Error', 'Failed to fetch student data');
      }
    } catch (error) {
      console.error('Fetch Students Error:', error);
      console.error('Error details:', error.response || error.message);
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
      
      // Even if there's an error, navigate to avoid being stuck
      if (!hasNavigated.current) {
        handleNavigation();
      }
    } finally {
      isFetching.current = false;
    }
  }, [dispatch, id, baseUrl, loginData, handleNavigation]);

  // Fetch data on component mount
  useEffect(() => {
    console.log('Fetch data useEffect triggered with id:', id);
    if (id) {
      fetchStudents();
    } else {
      console.log('No user ID available for fetching data');
    }
  }, [id, fetchStudents]);

  // Handle navigation after data is fetched
  useEffect(() => {
    console.log('Navigation useEffect triggered. dataFetched:', dataFetched, 'hasNavigated:', hasNavigated.current);
    
    if (!dataFetched || hasNavigated.current) return;
    
    // Using setTimeout to ensure all state updates complete
    const timer = setTimeout(() => {
      handleNavigation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [dataFetched, handleNavigation]);

  return null;
};

export default HomeScreen;
