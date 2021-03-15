import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, TouchableHighlight, View } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import Exercise from "../../models/exercise"

const DetailsScreen = props => {
    return (
        <SafeAreaView>
            <Button title="<< Back" onPress={() => props.detailsBackHandler()} />
            <Header>
                {props.exerciseName}
            </Header>
        </SafeAreaView>
    );
};

const SearchExercisesScreen = props => {
    const [filteredExerciseDictionary, setFilteredExerciseDictionary] = useState({});
    const [muscleGroupFilter1, setMuscleGroupFilter1] = useState("");
    const [muscleGroupFilter2, setMuscleGroupFilter2] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [displayedDetails, setDisplayedDetails] = useState(null);

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

    const detailsBackHandler = () => {
        setDisplayedDetails(null);
    };

    return (
        <SafeAreaView style={styles.searchContainer}>
                {displayedDetails ? (
                    <DetailsScreen 
                        exerciseName={filteredExerciseDictionary[displayedDetails].name}
                        detailsBackHandler={detailsBackHandler}
                    />
                ) : (
                <View style={styles.listView}>
                    <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                    <ScrollView>
                    {Object.entries(filteredExerciseDictionary).map(exercise =>
                        <TouchableHighlight
                        onPress={() => {
                            setDisplayedDetails(exercise[0]);
                        }}>
                            <Text style={styles.exerciseText}>{exercise[1].name}</Text>
                        </TouchableHighlight>
                    )}
                    </ScrollView>
                </View>
                )}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 25
    },
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    exerciseText: {
        fontSize: 30,
        marginTop: 10,
    },
    listView: {
        marginBottom: 200
    }
});

export default SearchExercisesScreen;
