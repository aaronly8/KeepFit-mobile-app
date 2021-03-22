import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Button, TouchableHighlight, Image, View, Linking, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, updateSavedExercises, updateLikedVideos } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import UserDataScreen from './userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import CardioPicture from "../../assets/cardio.jpeg";
import StrengthPicture from "../../assets/strength.jpeg";
import EditProfileScreen from './EditProfileScreen';
import SavedExercise from "../../models/saved_exercise";
import { useEffect } from 'react';
import db from "../../firebase/firebase";
import LikedVideo from "../../models/liked_video";
import Video from "../../models/video";


const ProfileScreen = props => {
    const [visibleScreen, setVisibleScreen] = useState(null);
    const [displayWorkoutHistory, setDisplayWorkoutHistory] = useState(true);

    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const current_user_id = useSelector(state => state.auth.currentUserId);
    const user_profile = useSelector(state => state.auth.currentUser);
    const filteredWorkoutHistory = useSelector(state => state.auth.savedExercises);
    const likedVideoData = useSelector(state => state.auth.likedVideos);
    const likedVideoDataArray = useSelector(state => state.auth.videoDatas);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log("logged out");
    }

    const getSavedExercises = async () => {
        const snapshot = await db.collection(SavedExercise.collection_name).where("user_id", "==", current_user_id).get()
        let workoutHist = []
        snapshot.forEach(doc => {
            workoutHist.push(doc.data())
        })
        dispatch(updateSavedExercises(workoutHist));
    }

    if (!filteredWorkoutHistory && isLoggedIn) {
        getSavedExercises();
    }

    const getLikedVideos = async () => {
        const snapshot = await db.collection(LikedVideo.collection_name).where("user_id", "==", current_user_id).get()
        let likedVideoDictionary = {}
        let likedVideoIds = [];
        let likedVideoData = [];
        snapshot.forEach(doc => {
            likedVideoDictionary[doc.data().video_id] = doc.data();
            likedVideoIds.push(doc.data().video_id);
        });
        const video_snapshot = await db.collection(Video.collection_name).get()
        video_snapshot.forEach(function (doc) {
            if (likedVideoIds.includes(doc.id)) {
                likedVideoData.push(doc.data());
            }
        })
        dispatch(updateLikedVideos(likedVideoDictionary, likedVideoData));
    }

    if (!likedVideoData && isLoggedIn) {
        getLikedVideos();
    }

    const myWorkoutHist = <FlatList style={styles.addFlex} data={filteredWorkoutHistory}
        renderItem={({ item }) => <TouchableHighlight><Workout CompletedWorkout={item} /></TouchableHighlight>}
        keyExtractor={item => item.id} />


    const Workout = (props) => {
        const { CompletedWorkout } = props
        return (
            <View style={styles.unpaddedHorizontalContainer}>
                {CompletedWorkout.category === "CARDIO" ?
                    <Image
                        source={CardioPicture} style={styles.image}
                        style={styles.workoutPic}
                    />
                    :
                    <Image
                        source={StrengthPicture} style={styles.image}
                        style={styles.workoutPic}
                    />
                }
                <View style={styles.addFlex}>
                    <Text style={styles.workoutHistName}>{CompletedWorkout.category}</Text>
                    <Text style={styles.workoutHistSub}>{CompletedWorkout.completed_on}</Text>
                    <Text style={styles.workoutHistLastSub}>{CompletedWorkout.caloriesBurned} cals. burned</Text>
                    <View style={styles.unpaddedTagsHorizontalContainer}>
                        <Text style={styles.tagName}>{CompletedWorkout.muscle_group}</Text>
                        <Text style={styles.tagName}>{CompletedWorkout.secondary_muscle_group}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const VideoItem = (props) => {
        const { LikedVideo } = props
        return (
            <View style={styles.unpaddedHorizontalContainer}>
                {LikedVideo.category === "CARDIO" ?
                    <Image
                        source={CardioPicture} style={styles.image}
                        style={styles.workoutPic}
                    />
                    :
                    <Image
                        source={StrengthPicture} style={styles.image}
                        style={styles.workoutPic}
                    />
                }
                <View style={styles.addFlex}>
                    <Text style={styles.workoutHistName}>{LikedVideo.title}</Text>
                    <Text style={styles.workoutHistSub}>{LikedVideo.category}</Text>
                    <Text style={styles.workoutHistVidLink}
                        onPress={() => Linking.openURL(LikedVideo.video_link)}>
                        Watch on Youtube
                    </Text>
                    <View style={styles.unpaddedTagsHorizontalContainer}>
                        <Text style={styles.tagName}>{LikedVideo.muscle_group}</Text>
                        <Text style={styles.tagName}>{LikedVideo.secondary_muscle_group}</Text>
                    </View>
                </View>
            </View>
        )
    }

    let myLikedVideos;
    if (likedVideoDataArray && isLoggedIn) {
        myLikedVideos = <FlatList style={styles.addFlex} data={likedVideoDataArray}
            renderItem={({ item }) => <TouchableHighlight><VideoItem LikedVideo={item} /></TouchableHighlight>}
            keyExtractor={item => item.id} />
    }

    let mainContent;
    if (isLoggedIn) {
        if (visibleScreen == "edit") {
            mainContent = <EditProfileScreen cancelEdit={setVisibleScreen.bind(this, null)} />
        } else if (visibleScreen == "details") {
            mainContent = <UserDataScreen
                cancelDetails={setVisibleScreen.bind(this, null)}
                logoutHandler={logoutHandler}
            />;
        } else {
            let workout_history_style;
            let saved_exercise_style;
            if (displayWorkoutHistory) {
                workout_history_style = styles.btnBluePress;
                saved_exercise_style = styles.btnPress;
            } else {
                saved_exercise_style = styles.btnBluePress;
                workout_history_style = styles.btnPress;
            }
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
                    <TouchableOpacity onPress={() => {
                        setDisplayWorkoutHistory(true);
                    }}>
                        <Text style={workout_history_style}>Workout History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setDisplayWorkoutHistory(false);
                    }}>
                        <Text style={saved_exercise_style}>Liked Videos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.savedContentContainer}>
                    {(displayWorkoutHistory) ? myWorkoutHist : myLikedVideos}
                </View>
                {
                    <View style={styles.googleButtonContainer}>
                        <FontAwesome5.Button
                            style={styles.googleButton}
                            name="google"
                            onPress={() => logoutHandler()}
                        >
                            <Text style={styles.googleText}>Log Out With Google</Text>
                        </FontAwesome5.Button>
                    </View>
                }
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
    unpaddedHorizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    unpaddedTagsHorizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: "5%",
        paddingTop: "0%"
    },
    subheading: {
        fontWeight: 'bold',
    },
    btnPress: {
        color: 'black',
        fontSize: 18
    },
    btnBluePress: {
        color: 'blue',
        fontSize: 18,
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
    workoutHistLastSub: {
        fontSize: 18,
        marginTop: "0%",
        marginBottom: "0%",
        paddingLeft: "5%"
    },
    workoutHistVidLink: {
        fontSize: 18,
        marginTop: "0%",
        marginBottom: "0%",
        paddingLeft: "5%",
        color: 'blue',
        textDecorationLine: "underline"
    },
    workoutPic: {
        width: 110,
        height: 110,
        marginTop: "5%"
    },
    tagName: {
        fontSize: 15,
        marginTop: "8%",
        color: "skyblue",
        fontWeight: "bold",
        paddingRight: "8%"
    },
    addFlex: {
        flexGrow: 1
    },
    savedContentContainer: {
        height: 275
    }
});

export default ProfileScreen;
