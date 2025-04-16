/**
 * This script tests the Google Sign-In module initialization
 * Run with: node test-google-signin.js
 */

const { GoogleSignin } = require('@react-native-google-signin/google-signin');

console.log('🔍 Testing Google Sign-In module initialization...');

try {
  // Configure Google Sign-In
  GoogleSignin.configure({
    webClientId: '536508971922-6lbjv2cahct85163u834dpp6rucv4cii.apps.googleusercontent.com',
    offlineAccess: true,
    scopes: ['profile', 'email'],
    packageName: 'com.ezpick',
  });
  
  console.log('✅ GoogleSignin.configure() called successfully');
  
  // Check if GoogleSignin methods are available
  console.log('\n🔍 Checking GoogleSignin methods:');
  console.log('GoogleSignin.hasPlayServices:', typeof GoogleSignin.hasPlayServices === 'function' ? '✅ Available' : '❌ Not available');
  console.log('GoogleSignin.isSignedIn:', typeof GoogleSignin.isSignedIn === 'function' ? '✅ Available' : '❌ Not available');
  console.log('GoogleSignin.signIn:', typeof GoogleSignin.signIn === 'function' ? '✅ Available' : '❌ Not available');
  console.log('GoogleSignin.signOut:', typeof GoogleSignin.signOut === 'function' ? '✅ Available' : '❌ Not available');
  console.log('GoogleSignin.getTokens:', typeof GoogleSignin.getTokens === 'function' ? '✅ Available' : '❌ Not available');
  
  console.log('\n✨ Google Sign-In module test completed!');
  console.log('If all methods are available, the module is properly initialized.');
  console.log('If any method is not available, there might still be an issue with the module.');
} catch (error) {
  console.error('❌ Error testing Google Sign-In module:', error);
} 