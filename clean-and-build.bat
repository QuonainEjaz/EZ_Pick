@echo off
echo Cleaning Android build...
cd android
call gradlew clean
echo Building Android app...
call gradlew assembleDebug
echo Done!
cd .. 