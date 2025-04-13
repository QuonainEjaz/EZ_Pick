const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  server: {
    port: 8081,
    useInspectorProxy: true, // This enables the experimental debugger
  },
  // Disable Flipper and ensure it doesn't interfere
  reactNativeVersion: require('react-native/package.json').version,
  resolver: {
    // Force use of the new debugger
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
