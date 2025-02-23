import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import UserInfoCard from '../../components/HistoryScreenComponents/UserInfoCard';
import SubHeading from '../../components/SubHeading';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/App/action';
import PickupDetails from './PickupDetails';

const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);  // Select students from state
  const [selectedFilter, setSelectedFilter] = useState('Last Week');

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
        
        {/* Custom button for filter, replacing TouchableOpacity */}
        <CustomButton
          title={selectedFilter}
          onPress={() => {}}
          touchStyle={styles.filterButton}
          textStyle={styles.filterText}
        />
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
      
      {/* Custom Button for Add New Student */}
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
