# Google Sign-In Troubleshooting Guide

This guide provides instructions on how to fix common issues with Google Sign-In in the EZpick React Native application.

## Common Issues

### 1. "GoogleSignin.isSignedIn is not a function (it is undefined)"

This error occurs when the Google Sign-In module is not properly initialized or there's a version compatibility issue.

**Solution:**
1. Make sure you're using a compatible version of `@react-native-google-signin/google-signin` with your React Native version
2. Ensure the module is properly configured with the correct parameters
3. Add a small delay before initializing the module to ensure it's fully loaded

### 2. "A non-recoverable sign in failure occurred"

This error typically occurs when there's an issue with the Google Play Services configuration or the Firebase project setup.

**Solution:**
1. Verify that your `google-services.json` file is correctly placed in the `android/app/` directory
2. Ensure your SHA-1 fingerprint is added to your Firebase project
3. Check that your `webClientId` in `GoogleSignin.configure()` matches your Firebase project

## Step-by-Step Fix

1. **Update the Google Sign-In package:**
   ```bash
   npm install @react-native-google-signin/google-signin@10.0.1
   ```

2. **Update the Android build.gradle file:**
   Add the following dependencies to `android/app/build.gradle`:
   ```gradle
   implementation 'com.google.android.gms:play-services-auth:20.7.0'
   implementation 'com.google.android.gms:play-services-base:18.3.0'
   ```

3. **Verify your google-services.json file:**
   Make sure the file is correctly placed in the `android/app/` directory and contains the correct configuration.

4. **Add your SHA-1 fingerprint to Firebase:**
   Run the following command to get your SHA-1 fingerprint:
   ```bash
   cd android && ./gradlew signingReport
   ```
   Then add the SHA-1 fingerprint to your Firebase project in the Android app settings.

5. **Update the Google Sign-In configuration:**
   Make sure your `GoogleSignin.configure()` call includes all necessary parameters:
   ```javascript
   GoogleSignin.configure({
     webClientId: 'YOUR_WEB_CLIENT_ID',
     offlineAccess: true,
     scopes: ['profile', 'email'],
     packageName: 'com.ezpick',
   });
   ```

6. **Clean and rebuild the project:**
   ```bash
   cd android && ./gradlew clean
   cd .. && npx react-native run-android
   ```

## Debugging Tips

1. **Check available methods:**
   Add the following code to log available methods:
   ```javascript
   console.log('GoogleSignin methods available:', {
     hasPlayServices: typeof GoogleSignin.hasPlayServices === 'function',
     isSignedIn: typeof GoogleSignin.isSignedIn === 'function',
     signIn: typeof GoogleSignin.signIn === 'function',
     signOut: typeof GoogleSignin.signOut === 'function',
     getTokens: typeof GoogleSignin.getTokens === 'function',
   });
   ```

2. **Add better error handling:**
   Wrap each Google Sign-In operation in a try-catch block to get more detailed error information.

3. **Use the fix script:**
   Run the `fix-google-signin.js` script to automatically perform common fixes:
   ```bash
   node fix-google-signin.js
   ```

## Additional Resources

- [Google Sign-In React Native Documentation](https://github.com/react-native-google-signin/google-signin)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Play Services](https://developers.google.com/android/guides/setup) 