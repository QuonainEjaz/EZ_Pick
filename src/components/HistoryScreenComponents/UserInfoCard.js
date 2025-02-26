import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Heading from '../Heading';
import SubHeading from '../SubHeading';

const UserInfoCard = ({name, dateTime, status, imageSource, onPress}) => {
  const {width} = useWindowDimensions();
  const imageSize = width * 0.12;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{uri: imageSource}}
        style={[styles.image, {width: imageSize, height: imageSize}]}
      />
      <View style={styles.textContainer}>
        <Heading
          title={name}
          textstyle={styles.heading}
          boxStyle={{alignItems: 'flex-start'}}
        />
        <SubHeading text={dateTime} style={styles.subHeading} />
      </View>
      <Heading
        title={status}
        textstyle={[
          styles.statusHeading,
          {alignItems: 'center', justifyContent: 'center', fontSize: 14},
        ]}
        boxStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FEF5D6',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 8,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#67676714',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
    gap: 15,
  },
  image: {
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#212529',
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'left',
    color: '#6C757D',
  },
  statusHeading: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F8AC16',
  },
});

export default UserInfoCard;
