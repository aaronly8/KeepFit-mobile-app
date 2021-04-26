import React, { useEffect, useState } from 'react';

import {
    Alert,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Button,
    TouchableHighlight,
    Image,
    View,
    Linking,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars';
import Container from '@app/components/container.js';
import UserDataScreen from './userData';
import Text from '@app/components/text.js';

import VideoItem from './video-item';
import Workout from './workout';

import styles from './styles';

import EditProfileScreen from './EditProfileScreen';
import UserCalendarScreen from './Calendar';

import SavedExercise from '../../models/saved_exercise';
import LikedVideo from '../../models/liked_video';
import Video from '../../models/video';
import db from '../../firebase/firebase';
import WatchedVideo from '../../models/watched_video';
import Follows from '../../models/follows';
import CalendarPic from '../../assets/calendar.png';


import { useSelector, useDispatch } from 'react-redux';
import {
    logoutUser,
    updateSavedExercises,
    updateLikedVideos,
    updateWatchedVideos,
    updateUploadedVideos
} from '../../redux/actions/auth.js';

import * as Notifications from 'expo-notifications';

const ProfileScreen = (props) => {
    const [visibleScreen, setVisibleScreen] = useState(null);
    const [displayPane, setDisplayPane] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [numFollowers, setNumFollowers] = useState(0);
    const [numFollowing, setNumFollowing] = useState(0);

    const isLoggedIn = useSelector((state) => state.auth.loggedIn);
    const current_user_id = useSelector((state) => state.auth.currentUserId);
    const user_profile = useSelector((state) => state.auth.currentUser);
    const filteredWorkoutHistory = useSelector((state) => state.auth.savedExercises);
    const likedVideoDataArray = useSelector((state) => state.auth.videoDatas);
    const watchedVideoDataArray = useSelector((state) => state.auth.w_videoDatas);
    const userVideos = useSelector((state) => state.auth.uploadedVideos);

    const dispatch = useDispatch();

    useEffect(() => {
        getSavedExercises();
        getLikedVideos();
        getUserVideos();
        getWatchedVideos();
        getNumFollowers();
        getNumFollowing();
        suggestWorkout();
    }, []);

    const suggestWorkout = async () => {
        console.log("suggesting...");
        // Recommendations cycle through muscle groups.
        const nextMuscleGroup = {
            "Triceps" : "Chest",
            "Chest" : "Shoulders",
            "Shoulders" : "Biceps",
            "Biceps" : "Forearms",
            "Forearms" : "Legs",
            "Legs" : "Core",
            "Core" : "Back",
            "Back" : "Full Body",
            "Full Body" : "Triceps",
        }

        // Each muscle group has 2 associated exercises to be suggested. 
        const workouts = {
            "Triceps" : "dips & diamond push-ups.",
            "Chest" : "push-ups & bench press.",
            "Shoulders" : "lateral dumbell raise & shoulder press.",
            "Biceps" : "dumbell curls & chin-ups",
            "Forearms" : "wrist curls & bar hangs",
            "Legs" : "squats & deadlifts",
            "Core" : "ab rollers & leg lifts",
            "Back" : "back rows & pull-ups",
            "Full Body" : "deadlifts & pull-ups",
        }


        // Find the previously worked muscle group from workout history.
        console.log("filteredWorkoutHist");
        console.log(filteredWorkoutHistory);
        var prevMuscleGroup = null;
        if (filteredWorkoutHistory?.length > 0){
            prevMuscleGroup = filteredWorkoutHistory[0].data.muscle_group;
            console.log("prev musc group:")
            console.log(prevMuscleGroup)
        }

        // Compose the alert message.
        var message;
        if (prevMuscleGroup){
            var muscleGroup = nextMuscleGroup[prevMuscleGroup]; 
            message = "Since you last worked " + prevMuscleGroup.toLowerCase()
                        +  ", you should work " + muscleGroup.toLowerCase()
                        +  " next. Try these exercises: " + workouts[muscleGroup];
        }
        else{
            message = "Welcome back! We recommend you get back into the groove by working biceps. Try these exercises: "  + workouts["Biceps"]; 
            console.log("default suggestion.");
        }

        // Notify using an Alert.
        Alert.alert(
            "Suggested Workout",
            message,
            [
                {
                    text: "Noted!",
                    onPress: () => console.log("Closed suggested workout Alert message."),
                }

            ]
        );
    };
    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log('logged out');
    };

    const getSavedExercises = async () => {
        const snapshot = await db
            .collection(SavedExercise.collection_name)
            .where('user_id', '==', current_user_id)
            .get();
        let workoutHist = [];
        snapshot.forEach((doc) => {
            let this_data = doc.data();
            this_data['id'] = doc.id;
            workoutHist.push(this_data);
        });
        dispatch(updateSavedExercises(workoutHist));
    };

    const getLikedVideos = async () => {
        const snapshot = await db
            .collection(LikedVideo.collection_name)
            .where('user_id', '==', current_user_id)
            .get();
        let likedVideoDictionary = {};
        let likedVideoIds = [];
        let likedVideoData = [];
        snapshot.forEach((doc) => {
            likedVideoDictionary[doc.data().video_id] = doc.data();
            likedVideoIds.push(doc.data().video_id);
        });
        const video_snapshot = await db.collection(Video.collection_name).get();
        video_snapshot.forEach(function (doc) {
            if (likedVideoIds.includes(doc.id)) {
                let this_data = doc.data();
                this_data['id'] = doc.id;
                likedVideoData.push(this_data);
            }
        });
        dispatch(updateLikedVideos(likedVideoDictionary, likedVideoData));
    };

    const getWatchedVideos = async () => {
        const snapshot = await db.collection(WatchedVideo.collection_name).where("user_id", "==", current_user_id).get()
        let watchedVideoDictionary = {}
        let watchedVideoIds = [];
        let watchedVideoData = [];
        snapshot.forEach(doc => {
            watchedVideoDictionary[doc.data().video_id] = doc.data();
            watchedVideoIds.push(doc.data().video_id);
        });
        const video_snapshot = await db.collection(Video.collection_name).get()
        video_snapshot.forEach(function(doc) {
            if(watchedVideoIds.includes(doc.id)) {
                let this_data = doc.data();
                this_data["id"] = doc.id;
                watchedVideoData.push(this_data);
            }
        })
        dispatch(updateWatchedVideos(watchedVideoDictionary, watchedVideoData));
    }

    const getUserVideos = async () => {
        const snapshot = await db
            .collection(Video.collection_name)
            .where('user_id', '==', current_user_id)
            .get();
        const data = snapshot.docs.map((doc) => {
            let data = doc.data();
            data['id'] = doc.id;
            return data;
        });
        dispatch(updateUploadedVideos(data));
    };

    const getNumFollowers = async () => {
        const snapshot = await db
            .collection(Follows.collection_name)
            .where('followee_id', '==', current_user_id)
            .get()
        let myNumFollowers = 0;
        snapshot.forEach(function (doc) {
            myNumFollowers++;
        })
        setNumFollowers(myNumFollowers);
    }

    const getNumFollowing = async () => {
        const snapshot = await db
            .collection(Follows.collection_name)
            .where('follower_id', '==', current_user_id)
            .get()
        let myNumFollowing = 0;
        snapshot.forEach(function (doc) {
            myNumFollowing++;
        })
        setNumFollowing(myNumFollowing);
    }


    const unlikeVideoHandler = async (video_id) => {
        const snapshot = await db
            .collection(LikedVideo.collection_name)
            .where('video_id', '==', video_id)
            .where('user_id', '==', current_user_id)
            .get();
        snapshot.forEach(async (doc) => {
            await doc.ref.delete();
        });
        await getLikedVideos();
    };

    const deleteSavedExerciseHandler = (saved_exercise_id) => {
        db.collection(SavedExercise.collection_name)
            .doc(saved_exercise_id)
            .get()
            .then(function (doc) {
                doc.ref.delete().then(function () {
                    getSavedExercises();
                });
            });
    };

    const deleteVideoHandler = async (videoId) => {
        const doc = await db
            .collection(Video.collection_name)
            .doc(videoId)
            .get();
        await doc.ref.delete();
        await getUserVideos();
        const liked_videos_snapshot = await db.collection(LikedVideo.collection_name).where("video_id", "==", videoId).get();
        liked_videos_snapshot.forEach(function (doc) {
            doc.ref.delete();
        });
        const watched_videos_snapshot = await db.collection(WatchedVideo.collection_name).where("video_id", "==", videoId).get();
        watched_videos_snapshot.forEach(function (doc) {
            doc.ref.delete();
        });
        getLikedVideos();
        getWatchedVideos();
    };

    const deleteWatchedVideoHandler = async (videoId) => {
        const snapshot = await db
            .collection(WatchedVideo.collection_name)
            .where('video_id', '==', videoId)
            .get();
        snapshot.forEach(async (doc) => {
            await doc.ref.delete();
        });
        await getWatchedVideos();
    };

    const scheduleWorkout = async (date) => {
        date.setDate(day.getDate());
        date.setMonth(day.getMonth());
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "You've got mail! 📬",
                    body: 'Use Keep Fit to stay active!',
                    data: { data: 'goes here' },
                },
                trigger: date,
            });
            return 1;
        } catch (e) {
            return 0;
        }
    };

    const myWorkoutHist = (
        <>
            <FlatList
                style={styles.addFlex}
                data={filteredWorkoutHistory}
                renderItem={({ item }) => (
                    <TouchableHighlight>
                        <Workout deleteSavedExerciseHandler={deleteSavedExerciseHandler} CompletedWorkout={item} />
                    </TouchableHighlight>
                )}
                keyExtractor={(item) => item.id}
            />
        </>
    );

    let myLikedVideos;
    if (likedVideoDataArray && isLoggedIn) {
        myLikedVideos = (
            <FlatList
                style={styles.addFlex}
                data={likedVideoDataArray}
                renderItem={({ item }) => (
                    <TouchableHighlight>
                        <VideoItem
                            Video={item}
                            onDelete={(id) => unlikeVideoHandler(id)}
                        />
                    </TouchableHighlight>
                )}
                keyExtractor={(item) => item.id}
            />
        );
    }

    const myUploadedVideos = (
        <FlatList
            style={styles.addFlex}
            data={userVideos}
            renderItem={({ item }) => (
                <TouchableHighlight>
                    <VideoItem
                        Video={item}
                        onDelete={(id) => {
                            Alert.alert(
                                'Delete Video',
                                'This action cannot be undone',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'OK',
                                        onPress: async () => {
                                            await deleteVideoHandler(
                                                id
                                            );
                                        },
                                    },
                                ]
                            );
                        }}
                    />
                </TouchableHighlight>
            )}
            keyExtractor={(item) => item.id}
        />
    );

    const myWatchedVideos = (
        <FlatList
            style={styles.addFlex}
            data={watchedVideoDataArray}
            renderItem={({ item }) => (
                <TouchableHighlight>
                    <VideoItem
                        Video={item}
                        onDelete={(id) => {
                            Alert.alert(
                                'Delete Video',
                                'This action cannot be undone',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'OK',
                                        onPress: async () => {
                                            await deleteWatchedVideoHandler(
                                                id
                                            );
                                        },
                                    },
                                ]
                            );
                        }}
                    />
                </TouchableHighlight>
            )}
            keyExtractor={(item) => item.id}
        />
    );

    let paneContent = <></>;
    switch (displayPane) {
        case 0:
            paneContent = myWorkoutHist;
            break;
        case 1:
            paneContent = myLikedVideos;
            break;
        case 2:
            paneContent = myUploadedVideos;
            break;
        case 3:
            paneContent = myWatchedVideos;
            break;
    }

    if (!isLoggedIn) {
        return (
            <SafeAreaView>
                <Text>Logging Out.</Text>
            </SafeAreaView>
        );
    }

    switch (visibleScreen) {
        case 'edit':
            return(
            <SafeAreaView>
                <EditProfileScreen
                    cancelEdit={setVisibleScreen.bind(this, null)}
                />
            </SafeAreaView>);
        case 'details':
            return (
                <SafeAreaView>
                    <UserDataScreen
                        cancelDetails={setVisibleScreen.bind(this, null)}
                        logoutHandler={logoutHandler}
                    />
                </SafeAreaView>
            );
        case 'calendar':
            return (
                <SafeAreaView>
                    <UserCalendarScreen 
                        cancelCalendar={setVisibleScreen.bind(this, null)}
                        deleteSavedExerciseHandler={deleteSavedExerciseHandler}
                    />
                </SafeAreaView>
            )
        default:
            return (
                <SafeAreaView>
                    <Container style={styles.mainContainer}>
                        <View style={styles.userHeadings}>
                            <Text style={styles.userName}>
                                {user_profile.username}
                            </Text>
                            {
                                <View style={styles.googleButtonContainer}>
                                    <FontAwesome5.Button
                                        style={styles.googleButton}
                                        name="google"
                                        onPress={() => logoutHandler()}
                                    >
                                        <Text style={styles.googleText}>
                                            Log Out
                                        </Text>
                                    </FontAwesome5.Button>
                                </View>
                            }
                        </View>
                        <View style={styles.horizontalContainer}>
                            <Image
                                style={styles.profilePic}
                                source={{ uri: user_profile.profile_picture }}
                            />
                            <View style={styles.followHeadings}>
                                <View style={styles.followBox}>
                                    <Text style={styles.numFollow}>{numFollowers}</Text>
                                    <Text style={styles.follow}>Followers</Text>
                                </View>
                                <View style={styles.followBox}>
                                    <Text style={styles.numFollow}>{numFollowing}</Text>
                                    <Text style={styles.follow}>Following</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nameContainer}>
                            <View style={styles.editHeadings}>
                                <View style={styles.nameHeadings}>
                                    <Text style={styles.fullName}>
                                        {user_profile.full_name}
                                    </Text>
                                    <Text style={styles.bio}>Insert bio here</Text>
                                </View>
                                <View style={styles.calBorder}>
                                    <TouchableOpacity
                                        onPress={() => setVisibleScreen('calendar')}
                                    >
                                        <Image 
                                            source={CalendarPic}
                                            style={styles.calendar}
                                            
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.editHeadings}>
                            <View style={styles.editBorder}>
                                <TouchableOpacity
                                    onPress={() => setVisibleScreen('edit')}
                                >
                                    <Text style={styles.editText}>
                                        Edit Profile
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.spaceBox}></View>
                            <View style={styles.editBorder}>
                                <TouchableOpacity
                                    onPress={() => setVisibleScreen('details')}
                                >
                                    <Text style={styles.editText}>
                                        View Data
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView horizontal= {true} decelerationRate={0} snapToInterval={400} snapToAlignment={"center"} marginTop='2%'>
                            <TouchableOpacity
                                onPress={() => {
                                    setDisplayPane(0);
                                }}
                            >
                                <Text
                                    style={
                                        displayPane === 0
                                            ? styles.btnBluePress
                                            : styles.btnPress
                                    }
                                >
                                    Workout History
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setDisplayPane(3);
                                }}
                            >
                                <Text
                                    style={
                                        displayPane === 3
                                            ? styles.btnBluePress
                                            : styles.btnPress
                                    }
                                >
                                    Video History
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setDisplayPane(1);
                                }}
                            >
                                <Text
                                    style={
                                        displayPane === 1
                                            ? styles.btnBluePress
                                            : styles.btnPress
                                    }
                                >
                                    Liked Videos
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setDisplayPane(2);
                                }}
                            >
                                <Text
                                    style={
                                        displayPane === 2
                                            ? styles.btnBluePress
                                            : styles.btnPress
                                    }
                                >
                                    My Videos
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={styles.savedContentContainer}>
                            {paneContent}
                        </View>
                    </Container>
                </SafeAreaView>
            );
    }
};

export default ProfileScreen;
