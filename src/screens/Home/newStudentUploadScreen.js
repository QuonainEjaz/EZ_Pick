import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AppManager from '../../AppManager'; // Adjust the path as necessary

const UploadStudentProfile = ({ navigation }) => {
    // State to store students who do not have a profile picture
    const [students, setStudents] = useState([]);
    
    // State to track the selected student for profile upload
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    // Animated values to control button visibility and interactivity
    const btnDoneOpacity = useState(new Animated.Value(0.3))[0];
    const btnLaterOpacity = useState(new Animated.Value(1))[0];

    useEffect(() => {
        // Fetch students who haven't uploaded a profile picture
        const fetchStudents = () => {
            setStudents(AppManager.shared.students.filter(student => !student.profileUrl));
        };

        // Animate button opacity when the component mounts
        const animateButtons = () => {
            Animated.parallel([
                Animated.timing(btnDoneOpacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
                Animated.timing(btnLaterOpacity, { toValue: 1, duration: 500, useNativeDriver: true })
            ]).start();
        };

        fetchStudents();
        animateButtons();
    }, []);

    // Function to handle profile photo selection from the gallery
    const handleUploadPhoto = async (id) => {
        setSelectedStudentId(id);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });

        if (!result.cancelled) {
            uploadPhotoOnServer(id, result.uri);
        }
    };

    // Function to update the student's profile picture and save it in the app state
    const uploadPhotoOnServer = async (id, uri) => {
        // Update the local state with the new profile picture
        const updatedStudents = students.map(student =>
            student.id === id ? { ...student, profileUrl: uri } : student
        );
        setStudents(updatedStudents);

        // Persist the changes in the global AppManager
        AppManager.shared.students = AppManager.shared.students.map(student =>
            student.id === id ? { ...student, profileUrl: uri } : student
        );

        // Show success alert
        Alert.alert('Success', 'Profile photo uploaded successfully!');
        
        // Update button states based on remaining students
        updateButtonState();
    };

    // Function to update button states based on whether all students have uploaded photos
    const updateButtonState = () => {
        const remaining = students.some(student => !student.profileUrl);
        Animated.parallel([
            Animated.timing(btnDoneOpacity, { toValue: remaining ? 0.3 : 1, duration: 300, useNativeDriver: true }),
            Animated.timing(btnLaterOpacity, { toValue: remaining ? 1 : 0.3, duration: 300, useNativeDriver: true })
        ]).start();
    };

    // Function to check if there are students without profile pictures
    const checkRemainingStudents = () => {
        return students.some(student => !student.profileUrl);
    };

    // Function to navigate back to the previous screen
    const handleNavigation = () => {
        navigation.goBack();
    };

    // Function to prompt the user before leaving the screen if there are remaining uploads
    const closeScreen = () => {
        if (checkRemainingStudents()) {
            Alert.alert('Upload Kid’s Picture', 'Are you sure you don’t want to upload a picture?', [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: handleNavigation }
            ]);
        } else {
            handleNavigation();
        }
    };

    // Component to render each student item with an upload button
    const UploadPhotoCell = ({ student, onUploadPhoto }) => (
        <View style={styles.cellContainer}>
            <TouchableOpacity onPress={() => onUploadPhoto(student.id)}>
                <Image 
                    source={student.profileUrl ? { uri: student.profileUrl } : require('./assets/camera.png')} 
                    style={styles.profileImage} 
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.grade}>Grade: {student.grade?.name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Student Profile</Text>
            
            {/* List of students who need profile pictures */}
            <FlatList
                data={students}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => <UploadPhotoCell student={item} onUploadPhoto={handleUploadPhoto} />}
            />

            {/* Buttons to complete or defer the upload */}
            <View style={styles.buttonContainer}>
                <Animated.View style={{ opacity: btnDoneOpacity }}>
                    <TouchableOpacity style={styles.button} onPress={closeScreen} disabled={btnDoneOpacity._value === 0.3}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ opacity: btnLaterOpacity }}>
                    <TouchableOpacity style={styles.button} onPress={closeScreen}>
                        <Text style={styles.buttonText}>Upload Later</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cellContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    grade: {
        fontSize: 14,
        color: 'gray',
    },
});

export default UploadStudentProfile;
