import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad, setStudents, SET_PARENT} from '../../store/App/action';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);
  // const id = useSelector(state => state.students.loginData.id);
  const baseUrl = useSelector(state => state.students.baseUrl);
  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/parents/1000416`,
      );
      if (response.status === 200) {
        dispatch(SET_PARENT(response.data.parent));
        dispatch(setStudents(response.data.parent.students));
      } else {
        console.error('Fetch Error:', response);
      }
    } catch (error) {
      console.error('Fetch Students Error:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isFirstLoad) {
      fetchStudents();
      dispatch(toggleFirstLoad());
    }
  }, [isFirstLoad, fetchStudents, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      console.log('isFirstLoad:', isFirstLoad);
      if (isFirstLoad) {
        console.log('Navigating to StudentUploadScreen');
        navigation.navigate('StudentUploadScreen');
      } else {
        console.log('Navigating to StudentListScreen');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'StudentListScreen'}],
          }),
        );
      }
    };

    const unsubscribe = navigation.addListener('focus', handleFocus);
    return unsubscribe;
  }, [navigation, isFirstLoad]);

  return null;
};

export default HomeScreen;
