import React from 'react'
import { Button, SafeAreaView, StyleSheet } from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons";

import Container from '@app/components/container.js'
import Text, { Header, Subheader } from '@app/components/text.js'
import db from '@app/firebase/firebase.js';


const LandingScreen = props => {
    let first_name, last_name = "";
    const test = db.collection('test').get().then((snapshot) => {
        const first_doc = snapshot.docs[0];
        first_name = first_doc.data().first;
        last_name = first_doc.data().last;
        console.log(first_name);
        console.log(last_name);
    });

    return (
        <SafeAreaView>
            <Container>
                <Header style={styles.mainHeader} >
                    KeepFit
                </Header>
                <Subheader style={styles.subHeader}>
                    An exercise application
                </Subheader>
                <Subheader style={styles.subHeader}>
                    {first_name} {last_name}
                </Subheader>
                <FontAwesome5.Button
                    style={styles.googleButton}
                    name="google"
                    onPress={() => props.setLoggedIn(true)}
                >
                    <Text style={styles.googleText}>Log In With Google</Text>
                </FontAwesome5.Button>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    subHeader: {
        fontSize: 18,
        marginTop: 0,
        textAlign: "center"
    },
    googleButton: {
        height: 60,
        paddingLeft: 50,
        paddingRight: 50
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default LandingScreen;
