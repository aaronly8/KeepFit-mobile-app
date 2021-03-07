import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import Text, { Header, SubHeader } from '@app/components/text.js';

const ProfileScreen = props => {
    return (
        <SafeAreaView>
            <Container>
                <Header style={styles.mainHeader}>
                    Welcome to the Profile Screen!
                </Header>
                <FontAwesome5.Button
                    style={styles.googleButton}
                    name="google"
                    onPress={() => props.setLoggedIn(false)}
                >
                    <Text style={styles.googleText}>Log Out With Google</Text>
                </FontAwesome5.Button>
            </Container>
        </SafeAreaView>
    )
};

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
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ProfileScreen;
