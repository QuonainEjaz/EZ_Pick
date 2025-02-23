import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const StudentPickupCard = ({ style }) => {
  const handleShare = () => {
    // Handle share functionality
  };

  const handleSave = () => {
    // Handle save functionality
  };

  const handleClose = () => {
    // Handle close functionality
  };

  return (
    <View style={[styles.container, style]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-arr-4.png' }}
              style={styles.backIcon}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Student Pickup Card</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardContainer}>
        <Image 
          source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/canvas.png' }}
          style={styles.qrCanvas}
          resizeMode="contain"
        />
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Image 
              source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/share-ic-2.png' }}
              style={styles.shareIcon}
            />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Bar */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={handleClose}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

StudentPickupCard.defaultProps = {
  style: {},
};

export default StudentPickupCard;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 956,
    backgroundColor: '#212121',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  topBar: {
    width: '100%',
    paddingTop: 50,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
    height: 47,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    width: 7,
    height: 12,
  },
  backText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.14,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 45,
  },
  cardContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    gap: 30,
  },
  qrCanvas: {
    width: '100%',
    height: 273,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEEFD2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F8AC16',
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  shareText: {
    color: '#F8AC16',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8AC16',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 22,
    height: 36,
  },
  saveText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  closeButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 7,
    padding: 10,
    marginTop: 'auto',
    marginBottom: 49,
  },
  closeText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
});


