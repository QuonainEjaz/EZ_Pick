import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import UserInfoHeader from './UserInfoHeader';
import DetailsContainer from './DetailsContainer';

const PickupDetails = () => {
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.contentContainer}>
        <UserInfoHeader />
        <DetailsContainer />
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

