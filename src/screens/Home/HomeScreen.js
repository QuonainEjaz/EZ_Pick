import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad} from '../../store/App/action';
import {setStudents} from '../../store/App/action';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);
  const token = useSelector(state => state.students.token);
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        'https://backendtest.ezpick.org/students',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('API Response:', response.data.students);

      if (response.data.success) {
        dispatch(setStudents(response.data.students));
      } else {
        console.error('Failed to fetch students:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('isFirstLoad:', isFirstLoad);

      if (isFirstLoad) {
        dispatch(toggleFirstLoad());
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
    });

    return unsubscribe;
  }, [navigation, isFirstLoad, dispatch]);
};

export default HomeScreen;
