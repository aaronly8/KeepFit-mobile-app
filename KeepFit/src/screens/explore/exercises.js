import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import Exercise from "../../models/exercise"

const SearchExercisesScreen = props => {
    const [filteredExerciseDictionary, setFilteredExerciseDictionary] = useState({});
    const [muscleGroupFilter1, setMuscleGroupFilter1] = useState("");
    const [muscleGroupFilter2, setMuscleGroupFilter2] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");



    useEffect(() => {
        var exerciseDictionary = {};
        db.collection(Exercise.collection_name).get().then(snapshot => {
            snapshot.forEach(doc => {
                exerciseDictionary[doc.id] = doc.data();
            });
            setFilteredExerciseDictionary(exerciseDictionary);
            console.log("just ran");
        });
    }, []);
    

    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                {Object.entries(filteredExerciseDictionary).map(exercise =>
                    <Text>{exercise[1].name}</Text>
                )}
            </Container>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    }
});

export default SearchExercisesScreen;
