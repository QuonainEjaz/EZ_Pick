import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text, ActivityIndicator, RefreshControl, ToastAndroid, UIManager, findNodeHandle } from 'react-native';
import { Portal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Svg, { Circle, Rect } from 'react-native-svg';

import Heading from '../../components/Heading';
import SubHeading from '../../components/SubHeading';
import CustomButton from '../../components/CustomButton';
import AuthConfirmationModal from '../../components/AuthConfirmationModal';

const DEFAULT_IMAGE = { uri: 'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1742117856/personPlaceholder_vjtdyo.png' };
const POPOVER_OPTIONS = ['View Details', 'Edit', 'Delete'];

const OptionButton = React.memo(() => (
  <Svg width={26} height={26} fill="none">
    <Circle cx={13} cy={13} r={13} fill="#F8F8F9" />
    <Rect width={3.111} height={3.111} x={11.445} y={6} fill="#525252" rx={1.556} />
    <Rect width={3.111} height={3.111} x={11.445} y={11.444} fill="#525252" rx={1.556} />
    <Rect width={3.111} height={3.111} x={11.445} y={16.889} fill="#525252" rx={1.556} />
  </Svg>
));

const AuthorizedPickupList = ({ navigation }) => {
  const dispatch = useDispatch();
  const guardians = useSelector((s) => s.students.guardian) || [];
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchGuardians = useCallback(async () => {
    try {
      const { data } = await axios.get('https://api.ezpick.co/parents/assistant/1000416');
      const guardiansArray = Array.isArray(data.parent) ? data.parent : data.parent ? [data.parent] : [];
      dispatch({ type: 'SET_GUARDIAN', payload: guardiansArray });
    } catch (e) {
      console.error('Error fetching guardians:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => { fetchGuardians() }, [fetchGuardians]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGuardians();
  }, [fetchGuardians]);

  const handleOptionPress = useCallback((id, ref) => {
    UIManager.measure(findNodeHandle(ref), (_, __, w, h, px, py) => {
      setPopoverPos({ x: px - w * 3, y: py + h });
      setOpenMenuId(prev => prev === id ? null : id);
    });
  }, []);

  const closePopover = useCallback(() => setOpenMenuId(null), []);

  const deleteGuardian = useCallback(async (id) => {
    try {
      await axios.delete(`https://api.ezpick.co/parents/${id}`);
      ToastAndroid.showWithGravity('Guardian deleted successfully', ToastAndroid.LONG, ToastAndroid.CENTER);
      fetchGuardians();
    } catch (e) { console.error('Error deleting guardian:', e) }
  }, [fetchGuardians]);

  const handleAction = useCallback((action, item) => {
    closePopover();
    if (!item) return console.warn(`${action}: item undefined`);
    navigation.navigate(action === 'View Details' ? 'AuthPickupDetails' : 'EditAuthorizedPickup', { item });
  }, [navigation]);

  const PickupItem = useMemo(() => React.memo(({ item }) => {
    let buttonRef = null;
    return (
      <View style={styles.pickupItem}>
        <View style={styles.profileImageContainer}>
          <Image source={item?.profileUrl ? { uri: item.profileUrl } : DEFAULT_IMAGE} style={styles.profileImage} />
        </View>
        <View style={styles.textContainer}>
          <SubHeading text={item?.name || 'No Name'} style={styles.nameText} />
          <SubHeading text={item?.role || ''} style={styles.roleText} />
        </View>
        <TouchableOpacity ref={r => buttonRef = r} onPress={() => handleOptionPress(item.id, buttonRef)}>
          <View style={styles.optionsCircle}><OptionButton /></View>
        </TouchableOpacity>
      </View>
    );
  }), [handleOptionPress]);

  const modalStyles = useMemo(() => ({
    titleText: { fontWeight: 'bold', fontSize: 16 },
    descriptionText: { textAlign: 'center', fontSize: 14, color: '#6C757D' },
    primaryButton: { backgroundColor: '#F8AC16', borderRadius: 10, paddingVertical: 12 },
    primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
    secondaryButton: { borderWidth: 1, borderColor: '#F8AC16', backgroundColor: 'transparent', borderRadius: 10, paddingVertical: 12 },
    secondaryButtonText: { color: '#F8AC16', fontWeight: '600' }
  }), []);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="larger" color="#F8AC16" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Heading title="Authorized Pickup" boxStyle={styles.headerTitle} textstyle={styles.headerTitleText} />
      
      <FlatList
        data={guardians}
        renderItem={({ item }) => <PickupItem item={item} />}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#F8AC16" />}
        ListEmptyComponent={<Text style={styles.emptyText}>No Authorized Pickup Available</Text>}
      />

      <AuthConfirmationModal
        visible={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        title="Remove Pickup?"
        description="Are you sure you want to remove this authorized pick-up?"
        imageSource={guardians.find(g => g.id === selectedId)?.profileUrl ? { uri: item.profileUrl } : DEFAULT_IMAGE}
        primaryButtonText="Yes, Sure"
        primaryButtonAction={() => deleteGuardian(selectedId)}
        secondaryButtonText="No, I Don’t"
        secondaryButtonAction={() => setConfirmationVisible(false)}
        style={modalStyles}
      />

      <CustomButton
        onPress={() => navigation.navigate('AddAuthorization')}
        title="Add New"
        touchStyle={styles.addButton}
        textStyle={styles.addButtonText}
      />

      <Portal>
        {openMenuId && (
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={closePopover}>
            <View style={styles.overlayContainer} pointerEvents="box-none">
              <View style={[styles.popoverContainer, { top: popoverPos.y, left: popoverPos.x }]}>
                {POPOVER_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.popoverOption}
                    onPress={() => {
                      const item = guardians.find(g => g.id === openMenuId);
                      option === 'Delete' 
                        ? (setSelectedId(openMenuId), setConfirmationVisible(true))
                        : handleAction(option, item);
                    }}
                  >
                    <Text style={styles.popoverText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', borderRadius: 20, padding: 20, justifyContent: 'space-between' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#6C757D', marginTop: 20 },
  headerTitle: { alignItems: 'flex-start', marginBottom: 10 },
  headerTitleText: { fontSize: 18, fontWeight: '700', color: '#212529', textAlign: 'center' },
  scrollView: { flexGrow: 1 },
  pickupItem: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center', minHeight: 74, marginBottom: 10 },
  textContainer: { flex: 1, marginLeft: 14, gap: 5 },
  nameText: { fontSize: 18, fontWeight: '700', color: '#212529' },
  roleText: { fontSize: 14, fontWeight: '400', color: '#6C757D' },
  profileImageContainer: { width: 50, height: 50, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' },
  profileImage: { width: 50, height: 50 },
  optionsCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#F8F8F9', justifyContent: 'center', alignItems: 'center' },
  addButton: { backgroundColor: '#F8AC16', borderRadius: 6, padding: 16, marginTop: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  overlayContainer: { flex: 1 },
  popoverContainer: { position: 'absolute', width: 110, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 4, elevation: 10, zIndex: 9999 },
  popoverOption: { paddingVertical: 8, paddingHorizontal: 20 },
  popoverText: { fontSize: 16, color: '#333' },
});

export default AuthorizedPickupList;