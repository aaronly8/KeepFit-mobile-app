import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Input from '../../components/input';
import { Header } from '@app/components/text.js';
import { MuscleGroupPicker, WorkoutCategoryPicker } from '../../components/pickers';
import { useSelector } from 'react-redux';
import db from "../../firebase/firebase";

const CreateVideosScreen = props => {
    const current_user_id = useSelector(state => state.auth.currentUserId);
    const user_profile = useSelector(state => state.auth.currentUser);

    const [enteredTitle, setTitle] = useState('');
    const [enteredDescription, setDescription] = useState('');
    const [enteredWorkoutCategory, setWorkoutCategory] = useState(null);
    const [enteredMuscleGroup, setMuscleGroup] = useState(null);
    const [enteredSecondaryMuscleGroup, setSecondaryMuscleGroup] = useState(null);

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
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                <Header style={styles.mainHeader}>
                    Upload a Video
                </Header>
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
                <TouchableOpacity onPress={() => { console.log("uploaded"); }}>
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
    }
});

export default CreateVideosScreen;
