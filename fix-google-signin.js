/**
 * This script helps fix Google Sign-In issues in React Native
 * Run with: node fix-google-signin.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting Google Sign-In fix script...');

// Step 1: Clean the project
console.log('\n🧹 Cleaning the project...');
try {
  execSync('cd android && ./gradlew clean', { stdio: 'inherit' });
  console.log('✅ Android build cleaned successfully');
} catch (error) {
  console.error('❌ Error cleaning Android build:', error.message);
}

// Step 2: Check if google-services.json exists
const googleServicesPath = path.join(__dirname, 'android', 'app', 'google-services.json');
if (!fs.existsSync(googleServicesPath)) {
  console.log('\n⚠️ google-services.json not found in android/app/');
  console.log('Please make sure you have downloaded the google-services.json file from Firebase Console');
  console.log('and placed it in the android/app/ directory');
} else {
  console.log('\n✅ google-services.json found');
}

// Step 3: Check SHA-1 fingerprint
console.log('\n🔍 Checking SHA-1 fingerprint...');
try {
  const sha1Output = execSync('cd android && ./gradlew signingReport', { encoding: 'utf8' });
  console.log('SHA-1 fingerprint information:');
  console.log(sha1Output);
  console.log('✅ SHA-1 fingerprint check completed');
} catch (error) {
  console.error('❌ Error checking SHA-1 fingerprint:', error.message);
}

// Step 4: Reinstall node modules
console.log('\n📦 Reinstalling node modules...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Node modules reinstalled successfully');
} catch (error) {
  console.error('❌ Error reinstalling node modules:', error.message);
}

// Step 5: Rebuild the app
console.log('\n🏗️ Rebuilding the app...');
try {
  execSync('npx react-native run-android', { stdio: 'inherit' });
  console.log('✅ App rebuilt successfully');
} catch (error) {
  console.error('❌ Error rebuilding the app:', error.message);
}

console.log('\n✨ Google Sign-In fix script completed!');
console.log('If you still encounter issues, please check:');
console.log('1. Your google-services.json file is correctly configured');
console.log('2. Your SHA-1 fingerprint is added to your Firebase project');
console.log('3. Your webClientId in GoogleSignin.configure() matches your Firebase project'); 