import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import UserInfoCard from '../../components/HistoryScreenComponents/UserInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/App/action'; 
import PickupDetails from './PickupDetails';

const HistoryScreen = ({ navigation}) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);  // Select students from state
  const [selectedFilter, setSelectedFilter] = useState('Last Week');

  // Simulate fetching data on component mount
  // useEffect(() => {
  //   const data = [
  //     { id: '1', name: 'Umar bin Alkufi', dateTime: '02 Jan 2024, 12:38PM', status: 'Picked' },
  //     { id: '2', name: 'Umar bin Alkufi', dateTime: '03 Jan 2024, 01:20PM', status: 'Picked' },
  //     { id: '3', name: 'Umar bin Alkufi', dateTime: '04 Jan 2024, 02:05PM', status: 'Picked' },
  //     { id: '4', name: 'Umar bin Alkufi', dateTime: '05 Jan 2024, 12:55PM', status: 'Picked' },
  //     { id: '5', name: 'Umar bin Alkufi', dateTime: '06 Jan 2024, 02:03PM', status: 'Picked' },
  //     { id: '6', name: 'Umar bin Alkufi', dateTime: '09 Jan 2024, 02:03PM', status: 'Picked' },
  //     { id: '7', name: 'Umar bin Alkufi', dateTime: '10 Jan 2024, 01:36PM', status: 'Picked' },
  //   ];
    
  //   dispatch(setStudents(data));  // Dispatch the action to set students data
  // }, [dispatch]);

  const handleAddStudent = () => {
    const newStudent = {
      id: '8',
      name: 'New Student',
      dateTime: '15 Feb 2024, 03:20PM',
      status: 'Pending',
    };
    // Update the students' list by adding the new student
    dispatch(setStudents([...students, newStudent]));  // Update the students state in Redux
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Heading title="History" textstyle={styles.heading} />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{selectedFilter}</Text>
        </TouchableOpacity>
      </View>

      {/* List of History Items */}
      <FlatList
        data={students}  // Use the students from Redux store
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserInfoCard
            name={item.name}
            dateTime={item.dateTime}
            status={item.status}
            imageSource={require('../../assets/pics/EmailPic.png')} 
            onPress={() => navigation.navigate('PickupDetails', { student: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <CustomButton
        title="Add New Student"
        onPress={handleAddStudent}
        touchStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#F8AC16',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
