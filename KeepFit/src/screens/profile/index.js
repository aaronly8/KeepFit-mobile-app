/*import React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import Text, { Header, SubHeader } from '@app/components/text.js';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import { current } from '@reduxjs/toolkit';

const ProfileScreen = (props) => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const user_profile = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log("logged out");
    }

    return (
        <SafeAreaView>
            {isLoggedIn ? (
                <Container>
                    <Header style={styles.mainHeader}>
                        Welcome to the Profile Screen!
                    </Header>
                    <Text style={styles.centeredText}>
                        You are logged in as {user_profile.username}!
                    </Text>
                    <Image
                        style={styles.profilePic}
                        source={{uri: user_profile.profile_picture}}
                    />
                    <FontAwesome5.Button
                        style={styles.googleButton}
                        name="google"
                        onPress={() => logoutHandler()}
                    >
                        <Text style={styles.googleText}>Log Out With Google</Text>
                    </FontAwesome5.Button>
                </Container>
            ) : (
                    <Text>Logging Out.</Text>
                )}
        </SafeAreaView>
    );
};

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
    centeredText: {
        textAlign: 'center'
    },
    profilePic: {
        alignSelf: 'center',
        marginBottom: 15,
        width: 60,
        height: 60,
        borderRadius: 5
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ProfileScreen;
*/
import React from 'react';
import { Flex, SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import Text, { Header, SubHeader } from '@app/components/text.js';

const ProfileScreen = props => {
    return (
        <SafeAreaView>
            <Container>
                <Image
                    style={styles.profilePic}
                    source={{uri: user_profile.profile_picture}}
                />
                <Text style={styles.fullName}>
                    Fullname
                </Text>
                <Text style={styles.userName}>
                    Username
                </Text>

                <Text style ={styles.twoHeadings}>
                    <Text style={styles.followers}>
                        Followers
                    </Text>
                    <Text style={styles.following}>
                        Following
                    </Text>
                </Text>
                <Text style ={styles.twoHeadings}>
                    <Text style={styles.exHist}>
                        Exercise History
                    </Text>
                    <Text style={styles.exSaved}>
                        Saved Exercises
                    </Text>
                </Text>

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
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    },
    fullName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: "30%",
        paddingLeft: "55%"
    },
    userName: {
        fontSize: 15,
        marginTop: "0%",
        paddingLeft: "55%"
    },
    twoHeadings: {
        paddingTop: "20%",
        flex: 0.1,
        flexDirection: "column"
    },
    followers: {
        fontSize: 15,
        paddingLeft: "22%"
    },
    following: {
        fontSize: 15,
        paddingLeft: "5%"
    },
    exHist: {
        fontSize: 15,
        paddingLeft: "0%",
        fontWeight: 'bold'

    },
    exSaved: {
        fontSize: 15,
        paddingLeft: "15%"
    },
    
});

export default ProfileScreen;
