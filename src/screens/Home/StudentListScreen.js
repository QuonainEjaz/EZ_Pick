import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import StudentCard from './StudentCard';

const StudentListScreen = () => {
  const students = useSelector(state => state.students.students, shallowEqual);
  const token = useSelector(state => state.students.token, shallowEqual);
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={students}
          renderItem={({item}) => (
            <StudentCard
              key={item.id}
              data={{item, token}}
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
});

export default StudentListScreen;
