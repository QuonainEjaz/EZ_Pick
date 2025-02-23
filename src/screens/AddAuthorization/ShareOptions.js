import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ShareOptions = ({ style }) => {
  const apps = [
    { name: 'AirDrop', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-6.png' },
    { name: 'Messages', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-7.png' },
    { name: 'Mail', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-8.png' },
    { name: 'Notes', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-9.png' },
    { name: 'Reminders', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-10.png' }
  ];

  const contacts = [
    { name: 'Sandy Wilder Cheng', avatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar.png', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon.png' },
    { name: 'Kevin Leong', avatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar-2.png', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-2.png' },
    { name: 'Sandy and Kevin', avatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar-1.png', secondAvatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar-2-2.png', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-3.png' },
    { name: 'Juliana Mejia', avatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar-3.png', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-4.png' },
    { name: 'Greg Apodaca', avatar: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/avatar-4.png', icon: 'https://dashboard.codeparrot.ai/api/image/Z7iqnlCHtJJZ6v_B/icon-5.png' }
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.grabberContainer}>
        <View style={styles.grabber} />
      </View>

      <View style={styles.contactsRow}>
        {contacts.map((contact, index) => (
          <TouchableOpacity key={index} style={styles.contactItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: contact.avatar }} style={styles.avatar} />
              {contact.secondAvatar && (
                <Image source={{ uri: contact.secondAvatar }} style={styles.secondAvatar} />
              )}
              <View style={styles.iconFrame}>
                <Image source={{ uri: contact.icon }} style={styles.contactIcon} />
              </View>
            </View>
            <Text style={styles.contactName} numberOfLines={2}>{contact.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.appIconRow}>
        {apps.map((app, index) => (
          <TouchableOpacity key={index} style={styles.appItem}>
            <Image source={{ uri: app.icon }} style={styles.appIcon} />
            <Text style={styles.appName}>{app.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

ShareOptions.defaultProps = {
  style: {}
};

export default ShareOptions;


export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f8f8f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    minHeight: 268,
  },
  grabberContainer: {
    alignItems: 'center',
    paddingTop: 6,
  },
  grabber: {
    width: 36,
    height: 5,
    backgroundColor: '#3c3c434d',
    borderRadius: 2.5,
  },
  contactsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 28,
    borderBottomWidth: 0.33,
    borderBottomColor: '#3c3c435c',
    justifyContent: 'space-between',
  },
  contactItem: {
    width: 60,
    height: 80,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    width: 62,
    height: 62,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  secondAvatar: {
    position: 'absolute',
    top: 17,
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  iconFrame: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    width: 20,
    height: 20,
  },
  contactName: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#000000',
    letterSpacing: -0.4,
    width: 76,
  },
  appIconRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 21,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  appItem: {
    width: 60,
    height: 80,
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
  },
  appName: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#000000',
    letterSpacing: -0.4,
    width: 76,
  },
});

