import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import CreateVideosScreen from './video';
import CreateLivestreamsScreen from './livestream';

const CreateScreen = props => {
    const [displayedScreen, setDisplayedScreen] = useState('index');

    const changeScreenHandler = (new_screen) => {
        setDisplayedScreen(new_screen);
    };

    let visibleContent;
    if (displayedScreen == "videos") {
        visibleContent = <CreateVideosScreen changeScreenHandler={changeScreenHandler} />
    } else if (displayedScreen == "livestreams") {
        visibleContent = <CreateLivestreamsScreen changeScreenHandler={changeScreenHandler} />
    }

    return (
        <SafeAreaView>
                {!visibleContent ? (
                    <Container>
                        <Header style={styles.mainHeader}>
                            Welcome to the Create Screen!
                        </Header>
                        <Button onPress={() => changeScreenHandler("videos")} title="Upload a Video" />
                        <Button onPress={() => changeScreenHandler("livestreams")} title="Start a Livestream" />
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

export default CreateScreen;
