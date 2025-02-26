import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import UserInfoCard from '../../components/HistoryScreenComponents/UserInfoCard';
import SubHeading from '../../components/SubHeading';
import {useDispatch, useSelector} from 'react-redux';
import ArrowDown from '../../assets/Icons/svg/ArrowDown';

const HistoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const [selectedFilter, setSelectedFilter] = useState('Last Week');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Heading title="History" textstyle={styles.heading} />
        <TouchableOpacity style={[styles.filterTouch,{flexDirection:'row', alignItems:'center'}]} onPress={() => {}}>
          <CustomButton
            title={selectedFilter}
            touchStyle={styles.filterButton}
            textStyle={styles.filterText}
            disabled={true}
          />
          <ArrowDown />
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserInfoCard
            name={item.name}
            dateTime={[item.date, ', ', item.pickupTime]}
            status={item.status}
            imageSource={item.image}
            onPress={() =>
              navigation.navigate('PickupDetails', {student: item})
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
