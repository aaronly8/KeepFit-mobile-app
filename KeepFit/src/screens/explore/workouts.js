import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, Linking, View } from 'react-native';
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import Video from '../../models/video';
import ListItem from './listitem';
import { MuscleGroupPicker, WorkoutCategoryPicker } from '../../components/pickers';

const Tag = props => {
    return (
        <View style={styles.tag}>
            <Text style={styles.tagText}>{props.value}</Text>
        </View>
    );
};

const DetailsScreen = props => {
    return (
        <SafeAreaView>
            <Button title="<< Back" onPress={() => props.detailsBackHandler()} />
            <Header style={styles.workoutName}>
                {props.workout.title}
            </Header>
            <Text style={styles.videoLink}
             onPress={() => Linking.openURL(props.workout.video_link)}>
            Watch Workout on Youtube
            </Text>
            <Text>
                {props.workout.description}
            </Text>
            <View style={styles.tagsContainer}>
                <Tag value={props.workout.category}></Tag>
                <Tag value={props.workout.muscle_group}></Tag>
                {props.workout.secondary_muscle_group ? <Tag value={props.workout.secondary_muscle_group}></Tag> : null}
            </View>
        </SafeAreaView>
    );
};

const SearchWorkoutsScreen = props => {
    const [workoutDictionary, setWorkoutDictionary] = useState({});
    const [filteredWorkoutDictionary, setFilteredWorkoutDictionary] = useState({});
    const [muscleGroupFilter1, setMuscleGroupFilter1] = useState("");
    const [muscleGroupFilter2, setMuscleGroupFilter2] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [displayedDetails, setDisplayedDetails] = useState(null);

    useEffect(() => {
        var fetchedWorkoutDictionary = {};
        db.collection(Video.collection_name).get().then(snapshot => {
            snapshot.forEach(doc => {
                fetchedWorkoutDictionary[doc.id] = doc.data();
            });
            setFilteredWorkoutDictionary(fetchedWorkoutDictionary);
            setWorkoutDictionary(fetchedWorkoutDictionary);
        });
    }, []);

    //Apply filters
    useEffect(() => {
        var newFilteredWorkoutDictionary = {};

        for(var workout in workoutDictionary) {
            var workoutDetails = workoutDictionary[workout];
            var filterFlag1 = false, filterFlag2 = false, filterFlag3 = false;

            if(muscleGroupFilter1 && muscleGroupFilter1 !== null) {
                if(workoutDetails.muscle_group === muscleGroupFilter1 || workoutDetails.secondary_muscle_group === muscleGroupFilter1) {
                    filterFlag1 = true;
                } 
            } else {
                filterFlag1 = true;
            }

            if(muscleGroupFilter2 && muscleGroupFilter2 !== null) {
                if(workoutDetails.muscle_group === muscleGroupFilter2 || workoutDetails.secondary_muscle_group === muscleGroupFilter2) {
                    filterFlag2 = true;
                } 
            } else {
                filterFlag2 = true;
            }

            if(categoryFilter && categoryFilter !== null) {
                if(workoutDetails.category === categoryFilter) {filterFlag3 = true;}
                else {filterFlag3 = false;}
            } else {
                filterFlag3 = true;
            }

            if(filterFlag1 && filterFlag2 && filterFlag3) {
                newFilteredWorkoutDictionary[workout] = workoutDetails;
            }
        }
        setFilteredWorkoutDictionary(newFilteredWorkoutDictionary);
    }, [muscleGroupFilter1, muscleGroupFilter2, categoryFilter]);

    const detailsBackHandler = () => {
        setDisplayedDetails(null);
    };

    return (
        <SafeAreaView style={styles.searchContainer}>
                {displayedDetails ? (
                    <DetailsScreen 
                        workoutID = {displayedDetails[0]}
                        workout={filteredWorkoutDictionary[displayedDetails[0]]}
                        detailsBackHandler={detailsBackHandler}
                    />
                ) : (
                <View style={styles.listView}>
                    <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                    <View style={styles.filterContainer}>
                        <MuscleGroupPicker onValueChange={value => {
                            setMuscleGroupFilter1(value);
                        }}></MuscleGroupPicker>
                        <MuscleGroupPicker onValueChange={value => {
                            setMuscleGroupFilter2(value);
                        }}></MuscleGroupPicker>
                        <WorkoutCategoryPicker onValueChange={value => {
                            setCategoryFilter(value);
                        }}></WorkoutCategoryPicker>
                    </View>
                    <View style={styles.scrollView}>
                        <ScrollView style={{flexGrow: 1}}>
                        {Object.entries(filteredWorkoutDictionary).map(workout =>
                            <ListItem setDisplayedDetails={setDisplayedDetails} object={workout}>

                            </ListItem>
                        )}
                        </ScrollView>
                    </View>
                </View>
                )}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 25,
        flexGrow:1,
    },
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    workoutText: {
        fontSize: 30,
        marginTop: 10,
    },
    listView: {
        marginBottom: 200,
    },
    filterContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        paddingBottom: 10,
    },
    scrollView: {
        height: "72.5%"
    },

    // STYLES FOR DETAILS SCREEN START
    workoutName: {
        textAlign: 'center',
        paddingBottom: 20,
    },
    videoLink: {
        textAlign: 'center',
        color: 'blue',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingBottom: 20
    },

    tagsContainer: {
        flexDirection: 'row',
        paddingTop: 20,
    },


    //STYLES FOR TAG START
    tag: {
        width: 110,
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        shadowOffset:{  width: 0,  height: 2},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        marginRight: 10,
      },

      tagText: {
        textAlign: 'center',
      },
});


export default SearchWorkoutsScreen;
