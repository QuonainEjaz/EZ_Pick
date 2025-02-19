import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, reset} from '../actions/CounterActions';
import CustomButton from './CustomButton';
import Heading from './Heading';

const Counter = ({customStyles}) => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, customStyles]}>
      <Heading
        title="Counter App"
        textstyle={{marginBottom: 40, marginTop: 60, fontSize: 30}}
      />
      <Heading
        title={`Count:   ${count}`}
        boxStyle={{borderWidth: 1, borderStyle: 'dashed', padding: 10}}
      />
      <CustomButton
        title="Increment"
        onPress={() => dispatch(increment(2))}
        touchStyle={{marginTop: 50, backgroundColor: 'green', width: 150}}
        textStyle={{fontSize: 20}}
      />
      <CustomButton
        title="Decrement"
        onPress={() => dispatch(decrement())}
        touchStyle={{marginTop: 20, backgroundColor: 'purple', width: 150}}
        textStyle={{fontSize: 20}}
      />
      <CustomButton
        title="Reset"
        onPress={() => dispatch({type: 'RESET'})}
        touchStyle={{marginTop: 20, backgroundColor: 'red', width: 100}}
        textStyle={{fontSize: 20}}
      />
    </View>
  );
};

export default Counter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
