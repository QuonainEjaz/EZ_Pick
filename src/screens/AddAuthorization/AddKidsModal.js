import React, {useState} from 'react';
import {
  Modal,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
const width = Dimensions.get('window').width;

const AddKidsModal = ({visible, kids, onAssign, onClose}) => {
  const [selectedKids, setSelectedKids] = useState([]);

  const toggleSelection = kidId => {
    setSelectedKids(prevSelected =>
      prevSelected.includes(kidId)
        ? prevSelected.filter(id => id !== kidId)
        : [...prevSelected, kidId],
    );
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Heading title="Assign" textstyle={styles.modalTitle} boxStyle={styles.modalTitleBox}/>
          <FlatList
            data={kids}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.kidItem}>
                <CustomCheckbox
                  value={selectedKids.includes(item.id)}
                  onValueChange={() => toggleSelection(item.id)}
                  style={styles.checkbox}
                />
                <Image source={{uri: item.image}} style={styles.kidImage} />
                <View>
                  <Heading title={item.name} textstyle={styles.kidName} />
                  <SubHeading text={item.idNumber} style={styles.kidId} />
                </View>
              </View>
            )}
          />
          <CustomButton
            title="Assign"
            onPress={() => onAssign(selectedKids)}
            touchStyle={styles.assignButton}
            onClose={onClose}
            width={width * 0.9}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalTitleBox: {
    alignItems: 'flex-start',
  },
  kidItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  kidImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  kidName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kidId: {
    fontSize: 14,
    color: '#6C757D',
  },
  assignButton: {
    marginTop: 20,
    backgroundColor: '#F8AC16',
    height: 50,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#6C757D',
  },
});

export default AddKidsModal;
