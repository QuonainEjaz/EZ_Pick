import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFirstLoad} from '../../store/App/action';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);
  useEffect(() => {
    console.log('isFirstLoad:', isFirstLoad);
    if (isFirstLoad) {
      dispatch(toggleFirstLoad());
      console.log('Navigating to StudentUploadScreen'); 
      navigation.navigate('StudentUploadScreen'); // Navigate to StudentUploadScreen
    } else {
      console.log('Navigating to StudentListScreen'); 
      navigation.navigate('StudentListScreen'); // Navigate to StudentListScreen
    }
  }, [ dispatch, navigation]);
  //   const checkFirstVisit = async () => {
  //     try {
  //       const isFirstTime = await AsyncStorage.getItem('isFirstTime');
  //       if (isFirstTime === null) {
  //         await AsyncStorage.setItem('isFirstTime', 'false');
  //         setIsFirstLoad(true);
  //       } else {
  //         setIsFirstLoad(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking first time visit:', error);
  //     }
  //   };

  //   checkFirstVisit()

  // }, [navigation]);
};

export default HomeScreen;
