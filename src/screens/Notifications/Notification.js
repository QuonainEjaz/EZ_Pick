import React from 'react';
import {View, Text, StyleSheet, Image, SectionList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';

const NotificationItem = ({icon, title, description}) => (
  <View style={styles.notificationItem}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Heading
        title={title}
        boxStyle={styles.titleBox}
        textstyle={styles.title}
      />
      <SubHeading text={description} style={styles.description} />
    </View>
  </View>
);

const NotificationList = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.students.notifications);

  const sectionData = Object.entries(notifications).map(([date, items]) => ({
    title: date,
    data: items,
  }));

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sectionData}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({item}) => <NotificationItem {...item} />}
        renderSectionHeader={({section: {title}}) => (
          <SubHeading text={title} style={styles.dateText} />
        )}
      />
    </View>
  );
};
export default NotificationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6F767E',
    marginBottom: 5,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f8f8f9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fef6e6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleBox: {
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
  },
});
