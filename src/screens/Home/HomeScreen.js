import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad} from '../../store/App/action';
import axios from 'axios'; // Import axios for API requests

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);
  const students = useSelector(state => state.students.students);

  const [loading, setLoading] = useState(false);

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
