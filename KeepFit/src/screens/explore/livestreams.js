import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";

const SearchLivestreamsScreen = props => {
    
    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                <Header style={styles.mainHeader}>
                    Welcome to the Livestream Screen!
                </Header>
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

export default SearchLivestreamsScreen;
