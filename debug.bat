@echo off
echo Starting React Native with experimental debugger...

:: Set environment variable to block Flipper
set REACT_NATIVE_DISABLE_DEBUGGER_AUTO_LAUNCH=true

:: Start the React Native packager with experimental debugger enabled
npx react-native start --experimental-debugger

echo Debugger session ended. 