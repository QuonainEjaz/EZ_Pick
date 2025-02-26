import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserInfoHeader from './UserInfoHeader';
import DetailsContainer from './DetailsContainer';

const PickupDetails = ({route}) => {
  const { student } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <UserInfoHeader student={student}/>
        <DetailsContainer student={student}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
});

export default PickupDetails;

