import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import SearchExercisesScreen from '../explore/exercises';

const ExploreScreen = props => {
    const [displayedScreen, setDisplayedScreen] = useState('index');

    const changeScreenHandler = (new_screen) => {
        setDisplayedScreen(new_screen);
    };

    let visibleContent;
    if (displayedScreen == "exercises") {
        visibleContent = <SearchExercisesScreen changeScreenHandler={changeScreenHandler} />
    }

    return (
        <SafeAreaView>
                {!visibleContent ? (
                    <Container>
                        <Header style={styles.mainHeader}>
                            Welcome to the Explore Screen!
                        </Header>
                        <Button onPress={() => changeScreenHandler("exercises")} title="Search Exercises" />
                    </Container>
                ) : (
                    visibleContent)}
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

export default ExploreScreen;
