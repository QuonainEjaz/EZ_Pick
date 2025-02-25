import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import CustomToggleButton from '../../components/CustomToggleButton';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import InputField from '../../components/InputFeild';
import CustomLink from '../../components/CustomLink';
import CustomButton from '../../components/CustomButton';
const Login = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const handleLanguageChange = language => {
    console.log('Selected Language:', language);
  };
  return (
    <View style={styles.container}>
      <CustomToggleButton
        onToggle={handleLanguageChange}
        customStyle={{width: width * 0.4, alignSelf: 'flex-end'}}
      />
      <View style={[styles.viewContainer, {width: width * 0.9}]}>
        <Heading boxStyle={styles.heading} title="Welcome to EZpick" />
        <SubHeading
          text="Lorem ipsum dolor sit amet consectetur. Elit malesuada massa sit sagittis."
          boxStyle={styles.heading}
          style={{
            fontSize: 14,
            textAlign: 'start',
            color: '#6C757D',
            marginBottom: '5%',
          }}
        />
        <InputField
          label="Username"
          placeholder="Enter your username"
          placeholderColor="#6C757D"
          value=""
          onChangeText={() => {}}
          onBlur={() => {}}
          style={{
            label: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
            input: {
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#E3E3E3',
            },
          }}
          keyboardType="email-address"
          secureTextEntry={false}
          multiline={false}
        />
        <InputField
          label="Password"
          placeholder=""
          placeholderColor="#6C757D"
          value=""
          onChangeText={() => {}}
          onBlur={() => {}}
          style={{
            label: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
            input: {
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#E3E3E3',
            },
          }}
          keyboardType="password"
          secureTextEntry={true}
          multiline={false}
        />
        <CustomLink
          label="Forget Password?"
          onPress={() => {
            navigation.navigate('Forget_Password');
          }}
          style={{alignSelf: 'flex-end', marginTop: -15, marginBottom: 40}}
        />
        <CustomButton
          title="Login"
          onPress={() => {
            navigation.navigate('TabNavigator');
          }}
          touchStyle={{width: width * 0.9, height: height * 0.06}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#FFFFFF',
  },
  toggleButton: {},
  viewContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    padding: 1,
    paddingTop: 30,
  },
  heading: {
    // backgroundColor: '#EDEDED',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Login;
