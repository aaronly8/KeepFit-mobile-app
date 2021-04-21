import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Image, Button, TouchableOpacity, Text } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import SearchExercisesScreen from '../explore/exercises';
import SearchWorkoutsScreen from '../explore/workouts';
import SearchLivestreamsScreen from '../explore/livestreams';
import SearchUsersScreen from '../explore/users';
import db from "../../firebase/firebase";
import LoadingPic from '../../assets/loadingPic.png';


const ExploreScreen = props => {
    const [displayedScreen, setDisplayedScreen] = useState('index');

    const changeScreenHandler = (new_screen) => {
        setDisplayedScreen(new_screen);
    };

    let visibleContent;
    if (displayedScreen == "exercises") {
        visibleContent = <SearchExercisesScreen changeScreenHandler={changeScreenHandler} testID="searchExerciseScreen"/>
    } else if (displayedScreen == "workouts") {
        visibleContent = <SearchWorkoutsScreen changeScreenHandler={changeScreenHandler} testID="searchWorkoutScreen"/>
    } else if (displayedScreen == "livestreams") {
        visibleContent = <SearchLivestreamsScreen changeScreenHandler={changeScreenHandler} testID="searchLivestreamScreen"/>
    } else if (displayedScreen == "users") {
        visibleContent = <SearchUsersScreen changeScreenHandler={changeScreenHandler} />
    }

    return (
        <SafeAreaView>
                {!visibleContent ? (
                    <Container>
                        <Text style={styles.mainHeader}>
                            Explore
                        </Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={styles.subHeader}>
                            Search for:
                        </Text>
                        <ScrollView horizontal= {true} decelerationRate={0} snapToInterval={400} snapToAlignment={"center"} marginTop='2%'>
                            <View style={styles.editBorder}>
                                <TouchableOpacity
                                    onPress={() => changeScreenHandler("exercises")}
                                    testID = 'exercisesButton'
                                >
                                    <Text style={styles.editText}>
                                        Exercises
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.editBorder}>
                                <TouchableOpacity
                                    onPress={() => changeScreenHandler("workouts")}
                                    testID = 'workoutsButton'
                                >
                                    <Text style={styles.editText}>
                                        Workouts
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.editBorder3}>
                                <TouchableOpacity
                                    onPress={() => changeScreenHandler("livestreams")}
                                    testID = 'livestreamsButton'
                                >
                                    <Text style={styles.editText}>
                                        Livestreams
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.editBorder}>
                                <TouchableOpacity
                                    onPress={() => changeScreenHandler("users")}
                                    testID = 'usersButton'
                                >
                                    <Text style={styles.editText}>
                                        Users
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>


                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image1}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image1}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image1}
                            />
                        </View>
                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.explorePics}>
                            <Image 
                                    source={LoadingPic}
                                    style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                            <View style={styles.spaceBorder} />
                            <Image 
                                source={LoadingPic}
                                style={styles.image}
                            />
                        </View>
                    </Container>
                ) : (
                    visibleContent)}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 40,
        marginTop: "10%",
        color: "black",
        fontWeight: "bold"
    },
    subHeader: {
        fontSize: 20,
        marginTop: "5%",
        color: "black"
    },
    editBorder: {
        borderColor: 'grey',
        justifyContent: 'space-around',
        borderWidth: 1,
        flex: 1,
        height: 30,
        width: 120
    },
    editBorder3: {
        borderColor: 'grey',
        justifyContent: 'space-around',
        borderWidth: 1,
        flex: 1,
        height: 30,
        width: 150
    },
    editText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    explorePics: {
        flexDirection: 'row'
    },
    spaceBorder: {
        flex: 0.9
    },
    image1: {
        marginTop: "5%",
        width: 100,
        height: 100,
    },
    image: {
        marginTop: "1%",
        width: 100,
        height: 100,
    }
});

export default ExploreScreen;
