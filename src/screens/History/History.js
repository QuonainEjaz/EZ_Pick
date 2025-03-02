import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Modal, Text, TouchableHighlight, Dimensions } from 'react-native';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import UserInfoCard from '../../components/HistoryScreenComponents/UserInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '../../assets/Icons/svg/ArrowDown';

const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const [selectedFilter, setSelectedFilter] = useState('Last Week');
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [modalVisible, setModalVisible] = useState(false);
  const filterButtonRef = useRef(null);  // To reference the filter button for width calculation

  // Function to parse the date string into a Date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split(' ');
    const monthIndex = new Date(`${month} 1, 2021`).getMonth(); // Get month index
    return new Date(year, monthIndex, day); // Return Date object
  };

  // Function to get the start and end dates for last week
  const getLastWeekRange = () => {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() - 7; // Start of last week
    const endOfWeek = startOfWeek + 6; // End of last week
    const startDate = new Date(today.setDate(startOfWeek));
    const endDate = new Date(today.setDate(endOfWeek));

    return { startDate, endDate };
  };

  // Function to filter students by selected filter
  const filterStudents = () => {
    let filtered = students;

    if (selectedFilter === 'Last Week') {
      const { startDate, endDate } = getLastWeekRange();
      filtered = students.filter(student => {
        const studentDate = parseDate(student.date);
        return studentDate >= startDate && studentDate <= endDate;
      });
    } else if (selectedFilter === 'Last Month') {
      const today = new Date();
      const startDate = new Date(today.setMonth(today.getMonth() - 1)); // 1 month ago
      filtered = students.filter(student => {
        const studentDate = parseDate(student.date);
        return studentDate >= startDate;
      });
    } else if (selectedFilter === 'All Time') {
      filtered = students; // No filtering
    }

    setFilteredStudents(filtered);
  };

  // Run the filter function when the selectedFilter changes
  useEffect(() => {
    filterStudents();
  }, [selectedFilter, students]);

  // Get the width of the filter button dynamically
  const [filterButtonWidth, setFilterButtonWidth] = useState(0);
  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setFilterButtonWidth(width); // Set width of filter button
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Heading title="History" textstyle={styles.heading} />
        <TouchableOpacity
          style={[styles.filterTouch, { flexDirection: 'row', alignItems: 'center' }]}
          onPress={() => setModalVisible(true)}  // Open modal when filter button is pressed
          onLayout={onLayout}  // Capture the filter button's layout
        >
          <CustomButton
            title={selectedFilter}
            touchStyle={styles.filterButton}
            textStyle={styles.filterText}
            disabled={true}
          />
          <ArrowDown />
        </TouchableOpacity>
      </View>

      {/* Modal for selecting filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}  // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { width: filterButtonWidth * 1.2 }]}>
            <Text style={styles.modalTitle}>Select Filter</Text>
            <TouchableHighlight
              style={styles.modalOption}
              onPress={() => {
                setSelectedFilter('Last Week');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Last Week</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalOption}
              onPress={() => {
                setSelectedFilter('Last Month');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Last Month</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalOption}
              onPress={() => {
                setSelectedFilter('All Time');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>All Time</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserInfoCard
            name={item.name}
            dateTime={[item.date, ', ', item.pickupTime]}
            status={item.status}
            imageSource={item.image}
            onPress={() =>
              navigation.navigate('PickupDetails', { student: item })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
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
    color: '#212529',
  },
  filterButton: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  filterTouch: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 12,
    color: '#6C757D',
  },
  listContainer: {
    flex: 1,
    gap: 10,
    backgroundColor: '#F8F9FA',
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 130,
    right: 10,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '100%',  
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOption: {
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 12,
    color: '#333',
  },
});

export default HistoryScreen;
