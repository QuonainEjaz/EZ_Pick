import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TopBar = () => {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>09:41</Text>
        <View style={styles.statusIcons}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/cellular.png' }} 
            style={styles.cellularIcon}
          />
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/wifi.png' }} 
            style={styles.wifiIcon}
          />
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/battery.png' }} 
            style={styles.batteryIcon}
          />
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <Image 
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z7cuqP3atcswnoun/icon-arr.png' }}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pickup Details</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  time: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.32,
    color: '#3C3B43',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cellularIcon: {
    width: 19,
    height: 12,
  },
  wifiIcon: {
    width: 17,
    height: 13,
  },
  batteryIcon: {
    width: 28,
    height: 13,
  },
  navBar: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    fontFamily: 'Outfit',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.14,
    color: '#212529',
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
});

export default TopBar;

