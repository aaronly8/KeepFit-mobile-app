import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text } from 'react-native';
import Container from '@app/components/container.js'
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Header } from '@app/components/text.js';
import { MuscleGroupPicker, WorkoutCategoryPicker } from '../../components/pickers';

const TrackScreen = props => {
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [enteredWorkoutCategory, setWorkoutCategory] = useState('');
    const [enteredMuscleGroup, setMuscleGroup] = useState('');
    const [enteredSecondaryMuscleGroup, setSecondaryMuscleGroup] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [lastStartTime, setLastStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(0);

    const workoutCategoryHandler = inputText => {
        setWorkoutCategory(inputText);
    };

    const muscleGroupHandler = inputText => {
        setMuscleGroup(inputText);
    };

    const secondayMuscleGroupHandler = inputText => {
        setSecondaryMuscleGroup(inputText);
    };

    const caloriesHandler = () => {
        if(isStopwatchStart) {
            console.log("recalculating calories");
        }
    };

    const lastStartHandler = () => {
        if(!isStopwatchStart) {
            setLastStartTime(new Date());
        } else if (isStopwatchStart) {
            var current_time = new Date();
            var new_seconds = (current_time.getTime() - lastStartTime.getTime()) / 1000;
            setElapsedTime(elapsedTime + new_seconds);
        }
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
                        console.log(time);
                    }}
                />
                <TouchableHighlight
                    onPress={() => {
                        setIsStopwatchStart(!isStopwatchStart);
                        lastStartHandler();
                        caloriesHandler();
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
                    <Text style={styles.caloriesHeader}>Calories Burned: {Math.round(elapsedTime)}</Text>
                </View>
                <TouchableOpacity onPress={() => {console.log("Saved");}}>
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
