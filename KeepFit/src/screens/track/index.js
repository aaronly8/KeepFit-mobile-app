import React, { useState } from 'react';
import {
    SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity,
    View, Text, Alert
} from 'react-native';
import Container from '@app/components/container.js'
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Header } from '@app/components/text.js';
import { MuscleGroupPicker, WorkoutCategoryPicker } from '../../components/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { updateSavedExercises } from "../../redux/actions/auth.js";
import db from '../../firebase/firebase';
import SavedExercise from '../../models/saved_exercise';

const TrackScreen = props => {
    const current_user_id = useSelector(state => state.auth.currentUserId);
    const user_profile = useSelector(state => state.auth.currentUser);

    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [enteredWorkoutCategory, setWorkoutCategory] = useState(null);
    const [enteredMuscleGroup, setMuscleGroup] = useState(null);
    const [enteredSecondaryMuscleGroup, setSecondaryMuscleGroup] = useState(null);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [lastStartTime, setLastStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(0);

    const dispatch = useDispatch();

    const workoutCategoryHandler = inputText => {
        setWorkoutCategory(inputText);
        caloriesHandler(inputText);
    };

    const muscleGroupHandler = inputText => {
        setMuscleGroup(inputText);
    };

    const secondayMuscleGroupHandler = inputText => {
        setSecondaryMuscleGroup(inputText);
    };

    const caloriesHandler = (category) => {
        var MET;
        if (!category) {
            setCaloriesBurned("N/A");
            return;
        } else if (category == "CARDIO") {
            MET = 7;
        } else if (category == "BODYWEIGHT") {
            MET = 6;
        } else if (category == "WEIGHTLIFTING") {
            MET = 3;
        } else if (category == "HIIT") {
            MET = 9;
        } else if (category == "HYBRID") {
            MET = 5;
        }
        var minutes = elapsedTime / 60;
        var calories = (minutes * (MET * 3.5 * user_profile.weight * 0.453592)) / 200;
        setCaloriesBurned(Math.floor(calories));
    };

    const lastStartHandler = () => {
        if (!isStopwatchStart) {
            setLastStartTime(new Date());
        } else if (isStopwatchStart) {
            var current_time = new Date();
            var new_seconds = (current_time.getTime() - lastStartTime.getTime()) / 1000;
            setElapsedTime(elapsedTime + new_seconds);
        }
    };

    const updateReduxSavedExercises = async() => {
        console.log("getting saved");
        const snapshot = await db.collection(SavedExercise.collection_name).where("user_id", "==", current_user_id).get()
        let workoutHist = []
        snapshot.forEach(doc => {
            workoutHist.push(doc.data())
        })
        dispatch(updateSavedExercises(workoutHist));
    }

    const saveHandler = () => {
        if (!enteredMuscleGroup || !enteredWorkoutCategory) {
            Alert.alert('Error', 'You must fill out all fields except secondary muscle group.', [
                { text: 'Dismiss', style: 'cancel' }
            ]);
            return;
        }
        if (Math.round(elapsedTime) == 0) {
            Alert.alert('Error', 'No time has elapsed.', [
                { text: 'Dismiss', style: 'cancel' }
            ]);
            return;
        }
        db.collection(SavedExercise.collection_name).doc().set({
            user_id: current_user_id,
            total_time: Math.round(elapsedTime),
            caloriesBurned: caloriesBurned,
            category: enteredWorkoutCategory,
            muscle_group: enteredMuscleGroup,
            secondary_muscle_group: enteredSecondaryMuscleGroup || null,
            completed_on: new Date().toLocaleDateString()
        }).then(function () {
            setIsStopwatchStart(false);
            setResetStopwatch(true);
            setElapsedTime(0);
            setCaloriesBurned(0);
            updateReduxSavedExercises();
            Alert.alert('Success', 'Workout Successfully Saved!', [
                { text: 'Dismiss', style: 'cancel' }
            ]);
        });
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Stopwatch
                    laps
                    msecs
                    start={isStopwatchStart}
                    //To start
                    reset={resetStopwatch}
                    //To reset
                    options={options}
                    //options for the styling
                    getTime={(time) => {
                        //console.log(time);
                    }}
                />
                <TouchableHighlight
                    onPress={() => {
                        setIsStopwatchStart(!isStopwatchStart);
                        lastStartHandler();
                        if (isStopwatchStart) {
                            caloriesHandler(enteredWorkoutCategory);
                        }
                        setResetStopwatch(false);
                    }}>
                    <Text style={styles.buttonText}>
                        {!isStopwatchStart ? 'START' : 'STOP'}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        setIsStopwatchStart(false);
                        setResetStopwatch(true);
                        setElapsedTime(0);
                    }}>
                    <Text style={styles.buttonText}>RESET</Text>
                </TouchableHighlight>
                <View
                    style={{
                        marginTop: 40,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        width: '100%'
                    }}
                />
                <Header style={styles.mainHeader}>
                    Save Your Workout
                </Header>
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
                    <Text style={styles.caloriesHeader}>Calories Burned: {caloriesBurned}</Text>
                </View>
                <TouchableOpacity onPress={() => saveHandler()}>
                    <Text style={styles.saveButton}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    mainHeader: {
        fontSize: 30,
        textAlign: "center"
    },
    inputHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 30,
        marginTop: 10,
    },
    caloriesHeader: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 30,
        color: 'blue'
    },
    saveButton: {
        fontSize: 30,
        marginTop: 35,
        color: 'blue'
    }
});

const options = {
    container: {
        backgroundColor: '#0000FF',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
};


export default TrackScreen;
