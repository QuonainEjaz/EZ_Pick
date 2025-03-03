import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {toggleFirstLoad} from '../../store/App/action';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFirstLoad = useSelector(state => state.students.isFirstLoad);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('isFirstLoad:', isFirstLoad);
      if (isFirstLoad) {
        dispatch(toggleFirstLoad());
        console.log('Navigating to StudentUploadScreen');
        navigation.navigate('StudentUploadScreen'); // Navigate to StudentUploadScreen
      } else {
        console.log('Navigating to StudentListScreen');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'StudentListScreen'}],
          })
        ); // Reset navigation stack and navigate to StudentListScreen
      }
    });

    return unsubscribe;
  }, [navigation, isFirstLoad, dispatch]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
