import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Svg, {Path, Circle} from 'react-native-svg';
const ViewIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}>
    <Path
      stroke="#6C757D"
      strokeWidth={1.5}
      d="M3.2 13.211a1.634 1.634 0 0 1 0-1.569A10.019 10.019 0 0 1 12 6.427c3.797 0 7.1 2.108 8.8 5.215.267.49.267 1.08 0 1.57a10.019 10.019 0 0 1-8.8 5.215c-3.797 0-7.1-2.108-8.8-5.216Z"
    />
    <Circle cx={12} cy={12.427} r={3} stroke="#6C757D" strokeWidth={1.5} />
  </Svg>
);
const Edit = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      fill="#6C757D"
      fillRule="evenodd"
      d="m6.562 12.67.596-2.784c.087-.387.282-.741.564-1.021l5.447-5.398a3.03 3.03 0 0 1 2.09-.907 2.23 2.23 0 0 1 1.593.637 2.638 2.638 0 0 1-.27 3.683l-5.447 5.448c-.28.28-.634.476-1.02.563l-2.785.596h-.156a.62.62 0 0 1-.612-.816ZM8.587 9.74a.817.817 0 0 0-.228.408l-.4 1.903 1.902-.408a.816.816 0 0 0 .409-.229l5.447-5.447a1.437 1.437 0 0 0 .27-1.96 1.005 1.005 0 0 0-.728-.278 1.789 1.789 0 0 0-1.225.555L8.587 9.74Z"
      clipRule="evenodd"
    />
    <Path
      fill="#6C757D"
      d="M16.46 9.126a.62.62 0 0 0-.613.613v4.647a2.45 2.45 0 0 1-2.45 2.49H5.615a2.5 2.5 0 0 1-2.45-2.49v-7.75a2.49 2.49 0 0 1 2.49-2.45h4.647a.612.612 0 1 0 0-1.226H5.615a3.716 3.716 0 0 0-3.716 3.675v7.75a3.716 3.716 0 0 0 3.716 3.717h7.75a3.716 3.716 0 0 0 3.707-3.716V9.739a.62.62 0 0 0-.612-.613Z"
    />
  </Svg>
);
const MinusIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill="#D83A3C"
      fillRule="evenodd"
      d="M8.496 0h1.008A8.496 8.496 0 0 1 18 8.496v1.008A8.496 8.496 0 0 1 9.504 18H8.496A8.496 8.496 0 0 1 0 9.504V8.496A8.496 8.496 0 0 1 8.496 0ZM5.4 9.675h7.2a.675.675 0 1 0 0-1.35H5.4a.675.675 0 0 0 0 1.35Z"
      clipRule="evenodd"
    />
  </Svg>
);
const AuthPickupDetails = ({style, pickupData = {}}) => {
  const [isLoading, setIsLoading] = useState(true);
  const defaultPickupData = {
    name: 'Khalid al-Jameel',
    relation: 'Uncle',
    idNumber: '545135',
    cellNo: '123-456-7890',
    vehicleNo: 'SA-5715B',
    profileImage:
      'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655477/Profile_Image_2_xqxfag.png',
    assignedKids: [
      {
        name: 'Jabir bin Hayan',
        image:
          'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655379/Profile_Image_1_qpmrhe.png',
      },
      {
        name: 'Ali bin Abi Talib',
        image:
          'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655477/Profile_Image_2_xqxfag.png',
      },
    ],
    ...pickupData,
  };
  const handleCopy = () => {
    Clipboard.setStrings([defaultPickupData.idNumber]);
  };
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: defaultPickupData.profileImage}}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <SubHeading
            text={defaultPickupData.name}
            style={styles.profileName}
          />
          <SubHeading
            text={defaultPickupData.relation}
            style={styles.profileRelation}
          />
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <SubHeading
            text="Authorized Pickup Details"
            style={styles.detailsTitle}
          />
          <TouchableOpacity style={styles.editButton}>
            <Edit />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContent}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="Relation" style={styles.label} />
              <SubHeading
                text={defaultPickupData.relation}
                style={styles.value}
              />
            </View>
            <View style={styles.detailsColumn}>
              <SubHeading text="Name" style={styles.label} />
              <SubHeading text={defaultPickupData.name} style={styles.value} />
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="ID Number" style={styles.label} />
              <SubHeading
                text={defaultPickupData.idNumber}
                style={styles.value}
              />
            </View>
            <View style={styles.detailsColumn}>
              <SubHeading text="Cell No" style={styles.label} />
              <SubHeading
                text={defaultPickupData.cellNo}
                style={styles.value}
              />
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <SubHeading text="Vehicle #" style={styles.label} />
              <SubHeading
                text={defaultPickupData.vehicleNo}
                style={styles.value}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Assigned Kids Section */}
      <SubHeading text={'Assigned Kids'} style={styles.assignedKidsTitle} />
      <View style={styles.assignedKidsContainer}>
        {defaultPickupData.assignedKids.map((kid, index) => (
          <View key={index} style={styles.kidCard}>
            <TouchableOpacity style={styles.removeKidButton}>
              <MinusIcon />
            </TouchableOpacity>
            <Image source={{uri: kid.image}} style={styles.kidImage} />
            <SubHeading text={kid.name} style={styles.kidName} />
          </View>
        ))}
      </View>

      <View style={styles.qrContainer}>
        <View style={styles.qrContent}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740981881/b93cae454b6717460aabf5f106fafcd9_j2pn4u.png',
            }}
            style={styles.qrCode}
          />
          <SubHeading text="Scan QR Code" style={styles.qrText} />
          <CustomButton
            title="Copy"
            touchStyle={styles.copyButton}
            textStyle={styles.copyButtonText}
            onPress={handleCopy}
          />
        </View>
        <View style={styles.shareContainer}>
          {/* Shimmer Effect */}
          {isLoading && (
            <ShimmerPlaceholder
              style={styles.shimmerBox}
              shimmerColors={['#f6f7f8', '#edeef1', '#f6f7f8']}
            />
          )}
          <View style={styles.shareOptions}>
            <CustomButton
              title="Share"
              touchStyle={styles.shareButton}
              textStyle={styles.shareText}
            />
            <CustomButton
              title="Save"
              touchStyle={styles.saveButton}
              textStyle={styles.saveButtonText}
            />
            <TouchableOpacity style={styles.viewButton}>
              <ViewIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthPickupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#676767',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  profileInfo: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  profileRelation: {
    fontFamily: 'Outfit',
    marginVertical: 5,
    fontWeight: '400',
    color: '#6c757d',
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#676767',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  detailsTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '900',
    color: '#212529',
  },
  editButton: {
    padding: 4,
    backgroundColor: '#f8f8f9',
    borderRadius: 2.8,
  },
  editIcon: {
    width: 19.6,
    height: 19.6,
  },
  detailsContent: {
    marginTop: 5,
  },
  detailsRow: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailsColumn: {
    flex: 1,
  },
  label: {
    fontFamily: 'Outfit',
    marginVertical: 2,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
  },
  assignedKidsContainer: {
    marginTop: 2,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  assignedKidsTitle: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginTop: 15,
  },
  kidsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f9',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  kidCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 98,
  },
  removeKidButton: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  kidImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  kidName: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    qrContainer: {
      flexDirection: 'row',
    },
  },
  qrContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  kidName: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  qrContent: {
    width: '37%',
    alignItems: 'center',
    backgroundColor: '#f8f8f9',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  qrText: {
    fontFamily: 'Outfit',
    fontSize: 12,
    fontWeight: '600',
    color: '#212529',
    marginVertical: 6,
  },
  copyButton: {
    backgroundColor: '#212529',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
  },
  copyButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  shareContainer: {
    width: '60%',
    backgroundColor: '#f8f8f9',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    alignItems: 'center',
  },
  shareOptions: {
    flexDirection: 'row',
    gap: 7,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#feefd2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8ac16',
    paddingVertical: 4,
    paddingHorizontal: 18,
  },
  shareIcon: {
    width: 20,
    height: 20,
  },
  shareText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#f8ac16',
    lineHeight: 28,
  },
  shimmerBox: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: '#707070',
    borderWidth: 1,
  },

  saveButton: {
    backgroundColor: '#f8ac16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 18,
  },
  saveButtonText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 28,
  },
  viewButton: {
    backgroundColor: '#e3e3e3',
    borderRadius: 6,
    padding: 4,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    width: 24,
    height: 24,
  },
});
