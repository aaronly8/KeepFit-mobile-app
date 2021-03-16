/* import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import Text, { Header, SubHeader } from '@app/components/text.js';
import ExerciseCard from "./ExerciseCard"
import exerciseData from "./exerciseData"

function ExSaved(props) {
    const exerciseComponents = exerciseData.map(exercise => <ExerciseCard key={exercise.id} title={exercise.title}
        subtitle={exercise.subtitle} tag1={exercise.tag1} tag1={exercise.tag2} tag1={exercise.tag3} />)

    return (
        <Text>
            (exerciseComponents)
        </Text>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    googleButton: {
        height: 60,
        paddingLeft: 50,
        paddingRight: 50
    },
    exerciseCard: {

    }
});

export default ExSaved;
*/