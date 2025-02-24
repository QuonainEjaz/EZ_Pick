import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'; 
import { setStudents } from '../../store/App/action';
import StudentCard from '../../components/HomeScreenComponents/StudentCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  useEffect(() => {
    const staticStudents = [
      {
        id: '1',
        name: 'Jabir bin Hayan Albarsi',
        grade: 'Grade 7th',
        pickupTime: '12:30 PM',
        image:
          'https://dashboard.codeparrot.ai/api/image/Z7W8qDO_YEiK217K/student-4.png',
        outOfRange: true,
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
          'https://dashboard.codeparrot.ai/api/image/Z7W8qDO_YEiK217K/student-5.png',
        outOfRange: true,
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
          'https://dashboard.codeparrot.ai/api/image/Z7W8qDO_YEiK217K/student-6.png',
        outOfRange: true,
        timer: {
          hours: '00',
          minutes: '00',
          seconds: '30',
        },
      },
    ];
    dispatch(setStudents(staticStudents));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={students}
          renderItem={({item}) => (
            <StudentCard
              key={item.id}
              student={item}
              style={styles.studentCard}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f9',
  },
  topBar: {
    width: '100%',
    height: 120,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 14,
  },
  studentCard: {
    width: '100%',
    height: 'auto',
  },
  bottomNavigation: {
    width: '100%',
    height: 100,
  },
});

export default HomeScreen;
