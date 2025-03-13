/**
 * Home screen component
 *
 * This component displays a list of students and their information.
 * It also handles the socket connection and location updates.
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]); // State to store the list of students
    const [isLoading, setIsLoading] = useState(true); // State to store the loading state
    const socket = useRef(null); // Reference to the socket object

    useEffect(() => {
        /**
         * Connect to the socket and fetch the user information
         */
        connectSocket();
        /**
         * Request location permission and add an event listener to handle location updates
         */
        requestLocationPermission();
        eventEmitter.addListener("locationUpdate", handleLocationUpdate);

        return () => {
            /**
             * Remove the event listener when the component is unmounted
             */
            eventEmitter.removeAllListeners("locationUpdate");
            if (socket.current) {
                /**
                 * Disconnect from the socket when the component is unmounted
                 */
                socket.current.disconnect();
            }
        };
    }, []);

    /**
     * Connect to the socket
     */
    const connectSocket = () => {
        socket.current = io("https://api.ezpick.co/");
        socket.current.on("connect", () => {
            console.log("Connected to socket");
            /**
             * Fetch the user information when the socket is connected
             */
            fetchUserInfo();
        });

        socket.current.on("approvedRequests", (student) => {
            /**
             * Show an alert when a request is approved
             */
            showRequestApprovedPopup(student);
        });
    };

    /**
     * Fetch the user information
     */
    const fetchUserInfo = async () => {
        try {
            const response = await fetch("https://api.ezpick.co/");
            const data = await response.json();
            setStudents(data.students);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user info:", error);
            setIsLoading(false);
        }
    };

    /**
     * Handle location updates
     */
    const handleLocationUpdate = (data) => {
        if (data.error) {
            /**
             * Show an alert when the location permission is denied
             */
            showLocationEnableAlert();
        }
    };

    /**
     * Request location permission
     */
    const requestLocationPermission = () => {
        Geolocation.requestAuthorization("whenInUse").then((status) => {
            if (status !== "granted") {
                /**
                 * Show an alert when the location permission is denied
                 */
                showLocationEnableAlert();
            }
        });
    };

    /**
     * Show an alert when the location permission is denied
     */
    const showLocationEnableAlert = () => {
        Alert.alert(
            "Location Permission",
            "Please enable location services.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
    };

    /**
     * Show an alert when a request is approved
     */
    const showRequestApprovedPopup = (student) => {
        Alert.alert(
            student.name,
            "Request accepted, your child is coming.",
            [{ text: "OK", onPress: () => removeApprovedRequest(student) }]
        );
    };

    /**
     * Remove the approved request from the list
     */
    const removeApprovedRequest = (student) => {
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
    };

    /**
     * Render a student item
     */
    const renderItem = ({ item }) => (
        <View style={styles.studentCard}>
            <Image source={{ uri: item.profileUrl }} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Grade: {item.grade?.name}</Text>
                <Text style={styles.details}>School: {item.grade?.school?.name}</Text>
                <TouchableOpacity
                    style={styles.directionButton}
                    onPress={() => HomeWorker.getSchoolInfo(item.schoolId)}
                >
                    <Text>Directions</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    logo: {
        width: 150,
        height: 50,
        alignSelf: "center",
        marginBottom: 20,
    },
    studentCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    details: {
        fontSize: 14,
        color: "#555",
    },
    directionButton: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        alignSelf: "flex-start",
    },
});

export default HomeScreen;
