import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, View, Button } from 'react-native';
import Input from '../../components/input';
import { Header } from '@app/components/text.js';
import { MuscleGroupPicker, WorkoutCategoryPicker } from '../../components/pickers';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Video from '../../models/video'
import db, { firebase } from "../../firebase/firebase";

const CreateVideosScreen = props => {
    const current_user_id = useSelector(state => state.auth.currentUserId);
    const user_profile = useSelector(state => state.auth.currentUser);

    const [enteredTitle, setTitle] = useState('');
    const [enteredDescription, setDescription] = useState('');
    const [enteredWorkoutCategory, setWorkoutCategory] = useState(null);
    const [enteredMuscleGroup, setMuscleGroup] = useState(null);
    const [enteredSecondaryMuscleGroup, setSecondaryMuscleGroup] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const titleInputHandler = inputText => {
        setTitle(inputText);
    };

    const descriptionInputHandler = inputText => {
        setDescription(inputText);
    };

    const workoutCategoryHandler = inputText => {
        setWorkoutCategory(inputText);
    };

    const muscleGroupHandler = inputText => {
        setMuscleGroup(inputText);
    };

    const secondayMuscleGroupHandler = inputText => {
        setSecondaryMuscleGroup(inputText);
    };

    const uploadHandler = async () => {
        if (!selectedVideo) {
            Alert.alert('Error', 'You must select a video', [
                { text: 'Dismiss', style: 'cancel' }
            ]);
            return;
        }
        if (!enteredTitle || !enteredWorkoutCategory || !enteredMuscleGroup || !enteredDescription) {
            Alert.alert('Error', 'You must fill out all fields except secondary muscle group.', [
                { text: 'Dismiss', style: 'cancel' }
            ]);
            return;
        }
        const response = await fetch(selectedVideo);
        const blob = await response.blob();
        console.log(blob.size);

        var ref = firebase.storage().ref().child(enteredTitle);
        ref.put(blob).then((snapshot) => {
            console.log("uploaded!");
            ref.getDownloadURL().then((url) => {
                db.collection(Video.collection_name).doc().set({
                    video_link: url,
                    user_id: current_user_id,
                    title: enteredTitle,
                    description: enteredDescription,
                    category: enteredWorkoutCategory,
                    muscle_group: enteredMuscleGroup,
                    secondary_muscle_group: enteredSecondaryMuscleGroup || null,
                    created_on: new Date().toLocaleDateString()
                }).then(function () {
                    setSelectedVideo(null);
                    setTitle('');
                    setDescription('');
                    props.changeScreenHandler("index")
                    Alert.alert('Success!', 'Your video was uploaded!', [
                        { text: 'Dismiss', style: 'cancel' }
                    ]);
                });
            });
        });
    }

    const selectVideoHandler = () => {
        console.log("selecting video")

        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos
        }).then((result) => {
            if (!result.cancelled) {
                // User picked a video
                const { height, width, type, uri } = result;
                console.log('video picked', uri);
                setSelectedVideo(uri);
            }

        }).catch((error) => {
            throw error;
        });
    };

    let selectContent = <Button title="Select a Video" onPress={() => selectVideoHandler()} />
    if (selectedVideo) {
        selectContent = <Button title="Clear Selected Video" onPress={() => setSelectedVideo(null)} />;
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                <Header style={styles.mainHeader}>
                    Upload a Video
                </Header>
                <View style={styles.selectContentContainer}>
                    {selectContent}
                </View>
                <Text style={styles.inputHeader}>Title:</Text>
                <Input style={styles.input}
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={255}
                    keyboardType="default"
                    onChangeText={titleInputHandler}
                    value={enteredTitle}
                />
                <Text style={styles.inputHeader}>Short Description (255 max):</Text>
                <Input style={styles.input}
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={255}
                    keyboardType="default"
                    onChangeText={descriptionInputHandler}
                    value={enteredDescription}
                />
                <View>
                    <Text style={styles.inputHeader}>Workout Category:</Text>
                    <WorkoutCategoryPicker
                        selectedValue={enteredWorkoutCategory}
                        onValueChange={workoutCategoryHandler}
                        style={styles.picker}
                    />
                    <Text style={styles.inputHeader}>Muscle Group (Primary):</Text>
                    <MuscleGroupPicker
                        selectedValue={enteredMuscleGroup}
                        onValueChange={muscleGroupHandler}
                        style={styles.picker}
                    />
                    <Text style={styles.inputHeader}>Muscle Group (Secondary):</Text>
                    <MuscleGroupPicker
                        selectedValue={enteredSecondaryMuscleGroup}
                        onValueChange={secondayMuscleGroupHandler}
                        style={styles.picker}
                    />
                </View>
                <TouchableOpacity onPress={() => uploadHandler()}>
                    <Text style={styles.uploadButton}>Upload</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        textAlign: "center"
    },
    inputHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    container: {
        alignItems: 'center'
    },
    uploadButton: {
        fontSize: 30,
        marginTop: 35,
        color: 'blue'
    },
    input: {
        width: 50,
        textAlign: 'center',
        marginBottom: 15,
        width: 100
    },
    selectContentContainer: {
        marginBottom: 25
    }
});

export default CreateVideosScreen;
