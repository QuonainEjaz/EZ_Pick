import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const ShimmerSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column1}>
        <ShimmerPlaceholder style={styles.imagePlaceholder1} />
      </View>
      <View style={styles.column2}>
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.row}>
            <ShimmerPlaceholder style={styles.imagePlaceholder2} />
            <View style={styles.textColumn}>
              <ShimmerPlaceholder style={[styles.line, {width: '70%'}]} />
              <ShimmerPlaceholder style={[styles.line, {width: '95%'}]} />
            </View>
          </View>
        ))}

        <ShimmerPlaceholder style={styles.horizontalLine} />

        <View style={styles.bottomRow}>
          {[1, 2, 3].map(item => (
            <ShimmerPlaceholder key={item} style={styles.smallPlaceholder} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ShimmerSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  column1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  column2: {
    flex: 3,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
    padding: 10,
    gap: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  imagePlaceholder1: {
    aspectRatio: 1,
    width: '100%',
    height: '60%',
  },
  imagePlaceholder2: {
    width: '20%',
    aspectRatio: 1,
  },
  textColumn: {
    flex: 1,
    gap: 6,
  },
  line: {
    height: 2.5,
    width: '100%',
  },
  horizontalLine: {
    height: 1.5,
    width: '100%',
    marginTop: -3,
    marginBottom: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallPlaceholder: {
    width: '30%',
    height: 2.5,
  },
});
