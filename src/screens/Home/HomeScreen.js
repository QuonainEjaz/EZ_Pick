import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStudents } from '../../store/App/action';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true); 

  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (isFirstTime === null) {
          await AsyncStorage.setItem('isFirstTime', 'false');
          setIsFirstLoad(true); 
        } else {
          setIsFirstLoad(false); 
        }
      } catch (error) {
        console.error('Error checking first time visit:', error);
      }
    };

    checkFirstVisit()
    const staticStudents = [
      {
        id: '1',
        name: 'Jabir bin Hayan Albarsi',
        grade: 'Grade 7th',
        pickupTime: '12:30 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'pickup_successful', // Status: PICKUP SUCCESSFULLY!
        timer: {
          hours: '00',
          minutes: '02',
          seconds: '00',
        },
      },
      {
        id: '2',
        name: 'Umar bin Alkufi',
        grade: 'Grade 7th',
        pickupTime: '12:30 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'out_of_range', // Status: You are out of range
        timer: {
          hours: '00',
          minutes: '01',
          seconds: '00',
        },
      },
      {
        id: '3',
        name: 'Ali bin Abi Talib Albarsi',
        grade: 'Grade 7th',
        pickupTime: '12:30 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'request_accepted', // Status: REQUEST ACCEPTED
        timer: {
          hours: '00',
          minutes: '00',
          seconds: '30',
        },
      },
      {
        id: '4',
        name: 'Fatima bin Muhammad',
        grade: 'Grade 6th',
        pickupTime: '01:00 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'ready_to_pickup', // Status: READY TO PICKUP!
        timer: {
          hours: '00',
          minutes: '05',
          seconds: '00',
        },
      },
      {
        id: '5',
        name: 'Hassan bin Ali',
        grade: 'Grade 8th',
        pickupTime: '01:30 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'request_sent', // Status: REQUEST SENT SUCCESSFULLY
        timer: {
          hours: '00',
          minutes: '00',
          seconds: '00',
        },
      },
      {
        id: '6',
        name: 'Zaynab bin Ali',
        grade: 'Grade 9th',
        pickupTime: '02:00 PM',
        image:
          'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
        range: 'in_range', // Status: You are in School range

        timer: {
          hours: '00',
          minutes: '00',
          seconds: '45',
        },
      },
    ];


    dispatch(setStudents(staticStudents));

    if (isFirstLoad) {
      navigation.navigate('SplashScreen');
    } else {
      navigation.navigate('StudentListScreen');
    }
  }, [dispatch, isFirstLoad, navigation]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f9',
  },
});

export default HomeScreen;