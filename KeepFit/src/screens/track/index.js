import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Container from '@app/components/container.js'
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Header } from '@app/components/text.js';

const TrackScreen = props => {
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

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
    buttonText: {
        fontSize: 30,
        marginTop: 10,
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
