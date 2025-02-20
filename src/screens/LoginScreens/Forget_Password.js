import React,{useState} from 'react';
import {View, Text, StyleSheet,Dimensions} from 'react-native';
import LinkButton from '../../components/LinkButton';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import InputField from '../../components/InputFeild';
import CustomButton from '../../components/CustomButton';
import CustomAlert from '../../components/CustomAlert';

const Forget_Password = ({navigation}) => {
      const {width, height} = Dimensions.get('window');
      const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <LinkButton label={'Back'} style={{alignSelf:'flex-start'}} onPress={()=>{navigation.navigate('Login')}}/>
      <View style={[styles.viewContainer, {width: width * 0.9}]}>
        <Heading boxStyle={styles.heading} title="Forget Password" />
        <SubHeading
          text="Incase if you forgot your password, Enter your email to reset your password."
          boxStyle={styles.heading}
          style={{fontSize: 14, textAlign: 'start', color: '#6C757D'}}
        />
        <View style={{height: height*0.03}}/>
        <InputField
          label="Username"
          placeholder="Enter your username"
          placeholderColor="#6C757D"
          value=""
          onChangeText={() => {}}
          onBlur={() => {}}
          style={{label: {fontSize: 14, fontWeight: 'bold',marginBottom:10}}}
          keyboardType="email-address"
          secureTextEntry={false}
          multiline={false}
        />
        <View style={{height: height*0.4}}/>
        <CustomButton title="Send" onPress={() => {setModalVisible(true)}} />
      </View>
      <CustomAlert 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        label={'Email Send Successfully!'}
        message={'We have send you a link to reset your password.' }
        buttonText={'Ok, Got it'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignItems: 'flex-start',
    marginTop:10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  toggleButton: {},
  viewContainer: {
    flex: 1,
    padding: 1,
    paddingTop: 30,
  },

  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Forget_Password;
