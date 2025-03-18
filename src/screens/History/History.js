import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {
  format,
  subDays,
  subMonths,
  subYears,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading';
import CustomButton from '../../components/CustomButton';
import UserInfoCard from '../../components/HistoryScreenComponents/UserInfoCard';
import ArrowDown from '../../assets/Icons/svg/ArrowDown';

const baseUrl = 'https://backendtest.ezpick.org';

const HistoryFilters = {
  today: {
    name: 'Today',
    dateFrom: () => format(new Date(), 'yyyy-MM-dd'),
    dateTo: () => format(new Date(), 'yyyy-MM-dd'),
  },
  yesterday: {
    name: 'Yesterday',
    dateFrom: () => format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    dateTo: () => format(subDays(new Date(), 1), 'yyyy-MM-dd'),
  },
  last_week: {
    name: 'Last Week',
    dateFrom: () => format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    dateTo: () => format(new Date(), 'yyyy-MM-dd'),
  },
  last_month: {
    name: 'Last Month',
    dateFrom: () => format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
    dateTo: () => format(new Date(), 'yyyy-MM-dd'),
  },
  last_year: {
    name: 'Last Year',
    dateFrom: () =>
      format(startOfYear(subYears(new Date(), 1)), 'yyyy-MM-dd'),
    dateTo: () => format(endOfYear(subYears(new Date(), 1)), 'yyyy-MM-dd'),
  },
  all_time: {
    name: 'All Time',
    dateFrom: () => '2023-02-23', // Earliest possible date
    dateTo: () => format(new Date(), 'yyyy-MM-dd'),
  },
};

const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const parent = useSelector(state => state.students.parent);
  const [historys, setHistorys] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all_time');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // For dropdown positioning and width
  const [filterButtonWidth, setFilterButtonWidth] = useState(0);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  const loginUserId = parent?.id;
  const loginUserRole = parent?.role || 'parent';

  const getHistory = async () => {
    try {
      let url = `${baseUrl}/requests/guards/1004993?dateFrom=${HistoryFilters[
        selectedFilter
      ].dateFrom()}&dateTo=${HistoryFilters[selectedFilter].dateTo()}`;

      // if (loginUserRole !== 'guards') {
      //   const studentId = parent?.students?.[0]?.id;
      //   url = `${baseUrl}/requests/student/${studentId}?dateFrom=${HistoryFilters[selectedFilter].dateFrom()}&dateTo=${HistoryFilters[selectedFilter].dateTo()}`;
      // }

      const response = await axios.get(url);
      if (response.data.success) {
        console.log('History:', response.data.requests);
        setHistorys(response.data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getHistory();
  }, [selectedFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    getHistory();
  };

  // Capture filter button width (and height if needed)
  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setFilterButtonWidth(width);
  };

  // When an option is selected from the dropdown
  const onSelectFilter = key => {
    setSelectedFilter(key);
    setFilterDropdownVisible(false);
  };

  // Order of options to display in the dropdown
  const filterOrder = [
    'today',
    'yesterday',
    'last_week',
    'last_month',
    'last_year',
    'all_time',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading title="History" textstyle={styles.heading} />
        {/* Wrap the filter button in a relative container */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.filterTouch}
            onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
            onLayout={onLayout}>
            <CustomButton
              title={HistoryFilters[selectedFilter].name}
              touchStyle={styles.filterButton}
              textStyle={styles.filterText}
              disabled={true}
            />
            <ArrowDown />
          </TouchableOpacity>
          {filterDropdownVisible && (
            <View style={[styles.dropdown, { width: filterButtonWidth }]}>
              {filterOrder.map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.dropdownItem}
                  onPress={() => onSelectFilter(key)}>
                  <Text style={styles.dropdownText}>
                    {HistoryFilters[key].name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#F8AC16" style={styles.loader} />
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={historys}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          const createdAt = new Date(item.createdAt);
          return (
            <UserInfoCard
              name={item.student?.name}
              role={loginUserRole === 'guards' ? 'Parent' : 'Guardian'}
              dateTime={[
                format(createdAt, 'dd MMM yyyy'),
                ', ',
                format(createdAt, 'hh:mm a'),
              ]}
              status={'Picked'}
              imageSource={
                item.student?.profileUrl ||
                'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1742117856/personPlaceholder_vjtdyo.png'
              }
              onPress={() =>
                navigation.navigate('PickupDetails', {
                  request: item,
                  imageSource:
                    item.student?.profileUrl ||
                    'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1742117856/personPlaceholder_vjtdyo.png',
                  pickupTime: [
                    format(createdAt, 'dd MMM yyyy'),
                    ', ',
                    format(createdAt, 'hh:mm a'),
                  ],
                  status: 'Picked',
                  name: item.student?.name,
                  id: item.student.id,
                  grade: item.student.gradeId,
                  requestBy: item.pickUpGuardian,
                  date: format(createdAt, 'dd MMM yyyy'),
                  requestTime: format(new Date(item.requestTime), 'hh:mm a'),
                  responseTime: format(new Date(item.approveTime), 'hh:mm a'),
                  confirmTime: format(new Date(item.confirmTime), 'hh:mm a'),
                })
              }
            />
          );
        }}
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
  dropdownContainer: {
    position: 'relative',
  },
  filterTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterButton: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  filterText: {
    fontSize: 12,
    color: '#6C757D',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 12,
    color: '#333',
  },
  listContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
});

export default HistoryScreen;
