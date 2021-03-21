import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Button, Pressable, Image, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import UserDataScreen from './userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfileScreen from './EditProfileScreen';
import SavedExercise from "../../models/saved_exercise";
import { useEffect } from 'react';
import db from "../../firebase/firebase";


const ProfileScreen = props => {
    const [visibleScreen, setVisibleScreen] = useState(null);
    const [displayWorkoutHistory, setDisplayWorkoutHistory] = useState(true);
    const [filteredWorkoutHistory, setFilteredWorkoutHistory] = useState([]);

    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const user_profile = useSelector(state => state.auth.currentUser);
    
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log("logged out");
    }
    console.log(visibleScreen);

    const getWorkoutHistory = async() => {
        const snapshot = await db.collection(SavedExercise.collection_name).get()
        let workoutHist = []
        snapshot.forEach(doc => {
            workoutHist.push(doc.data())
        })
        setFilteredWorkoutHistory(workoutHist)
        console.log(workoutHist)
    }
    useEffect(() => {
        getWorkoutHistory()
    }, []);

    const screenHeight = Dimensions.get('window').height

    const myWorkoutHist = <FlatList data = {filteredWorkoutHistory} 
    renderItem = {item=><Workout SavedExercises={item}></Workout>} 
    keyExtractor = {item=>item.id}/>


    const Workout = ({SavedExercises}) => {
        return (
            <View style ={styles.horizontalContainer}>
                <Image
                source={require("../../../assets/cardio.jpeg")} style={styles.image}
                style={styles.workoutPic}
                />
                <View>
                    <Text style = {styles.workoutHistName}>{SavedExercises.category}</Text>
                    <Text style = {styles.workoutHistSub}>{SavedExercises.completed_on}</Text>
                    <View style={styles.horizontalContainer}>
                        <Text style = {styles.tagName}>{SavedExercises.calories_burned}</Text>
                        <Text style = {styles.tagName}>{SavedExercises.muscle_group}</Text>
                        <Text style = {styles.tagName}>{SavedExercises.secondary_muscle_group}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const mySavedExercises = 
    (
    <View style={{height: screenHeight}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}> 
            <View style ={styles.horizontalContainer}>
                <Image
                source={require("../../../assets/strength.jpeg")} style={styles.image}
                style={styles.workoutPic}
                />
                <View>
                    <Text style = {styles.workoutHistName}>Chest Workout</Text>
                    <Text style = {styles.workoutHistSub}>50 minutes</Text>
                    <View style={styles.horizontalContainer}>
                        <Text style = {styles.tagName}>Tag1</Text>
                        <Text style = {styles.tagName}>Tag2</Text>
                        <Text style = {styles.tagName}>Tag3</Text>
                    </View>
                </View>
            </View>
            <View style ={styles.horizontalContainer}>
                <Image
                source={require("../../../assets/strength.jpeg")} style={styles.image}
                style={styles.workoutPic}
                />
                <View>
                    <Text style = {styles.workoutHistName}>Legs Workout</Text>
                    <Text style = {styles.workoutHistSub}>50 minutes</Text>
                    <View style={styles.horizontalContainer}>
                        <Text style = {styles.tagName}>Tag1</Text>
                        <Text style = {styles.tagName}>Tag2</Text>
                        <Text style = {styles.tagName}>Tag3</Text>
                    </View>
                </View>
            </View>
            <View style ={styles.horizontalContainer}>
                <Image
                source={require("../../../assets/cardio.jpeg")} style={styles.image}
                style={styles.workoutPic}
                />
                <View>
                    <Text style = {styles.workoutHistName}>Cardio Workout</Text>
                    <Text style = {styles.workoutHistSub}>50 minutes</Text>
                    <View style={styles.horizontalContainer}>
                        <Text style = {styles.tagName}>Tag1</Text>
                        <Text style = {styles.tagName}>Tag2</Text>
                        <Text style = {styles.tagName}>Tag3</Text>
                    </View>
                </View>
            </View>
            <View style ={styles.horizontalContainer}>
                <Image
                source={require("../../../assets/cardio.jpeg")} style={styles.image}
                style={styles.workoutPic}
                />
                <View>
                    <Text style = {styles.workoutHistName}>Core Workout</Text>
                    <Text style = {styles.workoutHistSub}>50 minutes</Text>
                    <View style={styles.horizontalContainer}>
                        <Text style = {styles.tagName}>Tag1</Text>
                        <Text style = {styles.tagName}>Tag2</Text>
                        <Text style = {styles.tagName}>Tag3</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
    )
    


    let mainContent;
    if (isLoggedIn) {
        if (visibleScreen == "edit") {
            console.log("is edit mode");
            mainContent = <EditProfileScreen cancelEdit={setVisibleScreen.bind(this, null)} />
        } else if (visibleScreen == "details") {
            mainContent = <UserDataScreen 
                cancelDetails={setVisibleScreen.bind(this, null)} 
                logoutHandler={logoutHandler} 
            />;
        } else {
            mainContent = <Container style={styles.mainContainer}>
                <View style={styles.editButtonContainer}>
                    <Button title="Edit Profile" onPress={() => setVisibleScreen("edit")} />
                </View>
                <View style={styles.horizontalContainer}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: user_profile.profile_picture }}
                    />
                    <View>
                        <Text style={styles.userName}>
                            {user_profile.username}
                        </Text>
                        <Text style={styles.fullName}>
                            {user_profile.full_name}
                        </Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setVisibleScreen("details")}>
                        <Text style={styles.detailsText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.twoHeadings}>
                    <View style={styles.followers}>
                        <Text style={styles.subheading}>
                            Followers
                    </Text>
                        <Text>
                            100
                    </Text>
                    </View>
                    <View style={styles.following}>
                        <Text style={styles.subheading}>
                            Following
                    </Text>
                        <Text>
                            55
                    </Text>
                    </View>
                </View>
                <View style={styles.twoHeadings}>
                    <TouchableOpacity onPress={() => 
                        {
                            setDisplayWorkoutHistory(true);
                            console.log("pressed")
                        }}>
                        <Text style={styles.btnPress}>Workout History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        {
                            setDisplayWorkoutHistory(false);
                            console.log("pressed");
                        }}>
                        <Text style={styles.btnPress}>Saved Exercises</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Pressable>
                        {(displayWorkoutHistory) ? myWorkoutHist : mySavedExercises}
                    </Pressable>
                </View>
                <View style={styles.googleButtonContainer}>
                    <FontAwesome5.Button
                        style={styles.googleButton}
                        name="google"
                        onPress={() => logoutHandler()}
                    >
                        <Text style={styles.googleText}>Log Out With Google</Text>
                    </FontAwesome5.Button>
                </View>
            </Container>
        }
    } else {
        console.log("is logging out")
        mainContent = <Text>Logging Out.</Text>
    }

    return (
        <SafeAreaView>
            {mainContent}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    mainContainer: {
        marginTop: 20,
        paddingHorizontal: 35
    },
    googleButton: {
        height: 60,
        paddingLeft: 50,
        paddingRight: 50
    },
    googleButtonContainer: {
        marginTop: 25
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    },
    fullName: {
        fontSize: 15
    },
    userName: {
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    },
    twoHeadings: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15
    },
    followers: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    following: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    subheading: {
        fontWeight: 'bold',
    },
    btnPress: {
        color: 'black',
        fontSize: 18
    },
    image: {
        width: 25,
        height: 25,
        fontWeight: 'bold'
    },
    editButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    detailsText: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
        paddingHorizontal: 15
    },
    workoutHistName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "5%",
        paddingLeft: "5%"
    },
    workoutHistSub: {
        fontSize: 18,
        marginTop: "0%",
        paddingLeft: "5%"
    },
    workoutPic: {
        width: 110,
        height: 110,
        marginTop: "5%"
    },
    tagName: {
        fontSize: 15,
        marginTop: "10%",
        paddingRight: "8%"
    },
    searchContainer: {
        flexGrow: 1
    },
});

export default ProfileScreen;
