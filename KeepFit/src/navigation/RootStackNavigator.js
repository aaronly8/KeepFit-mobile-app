import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import { googleiosClientId, googleandroidClientId } from '../keys.js';

import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Google from 'expo-google-app-auth';

import LoginScreen from '@app/screens/login'
import MainScreen from '@app/screens/main';

import User from "../models/user"

import Color from '@app/theme/color'
import { log } from 'react-native-reanimated'
import firebase from "firebase";

const Stack = createStackNavigator()

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.light.backgroundColor,
    },
}

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: Color.dark.backgroundColor,
    },
}

function RootStackNavigator() {
    const colorScheme = useColorScheme()

    const [isLoggedIn, setLoggedIn] = useState(false);

    let initialScreen = "Login"
    if (isLoggedIn) {
        initialScreen = "Main"
    }

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    const onSignIn = googleUser => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
            function (firebaseUser) {
                unsubscribe();
                // Check if we are already signed-in Firebase with the correct user.
                if (!isUserEqual(googleUser, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    var credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.idToken,
                        googleUser.accessToken
                    );
                    console.log("built credential");
                    // Sign in with credential from the Google user.
                    firebase
                        .auth().signInWithCredential(credential)
                        .then(function (result) {
                            console.log('user signed in ');
                            if (result.additionalUserInfo.isNewUser) {
                                User.create_initial_user(
                                    result.user.uid,
                                    result.additionalUserInfo.profile.given_name + " " + result.additionalUserInfo.profile.family_name,
                                    result.user.email,
                                    result.additionalUserInfo.profile.picture,
                                    Date.now()
                                )
                                    .then(function (snapshot) {
                                        console.log("hello");
                                        // console.log('Snapshot', snapshot);
                                    });
                            } else {
                                console.log("not new user");
                            }
                        })
                        .catch(function (error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // The email of the user's account used.
                            var email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            var credential = error.credential;
                            // ...
                        });
                } else {
                    console.log('User already signed-in Firebase.');
                }
            }.bind(this)
        );
    };

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: googleandroidClientId,
                iosClientId: googleiosClientId,
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                console.log("calling onsignin function");
                onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    return (
        <NavigationContainer
            theme={colorScheme === 'light' ? lightTheme : darkTheme}
        >
            <Stack.Navigator headerMode="none" initialRouteName={initialScreen}>
                {!isLoggedIn ? (
                    <Stack.Screen name='Login'>
                        {(props) => <LoginScreen
                            loginUser={signInWithGoogleAsync}
                            loggedIn={isLoggedIn}
                        />}
                    </Stack.Screen>
                ) : (
                        <Stack.Screen name='Main'>
                            {(props) => <MainScreen
                                setLoggedIn={setLoggedIn}
                                loggedIn={isLoggedIn}
                            />}
                        </Stack.Screen>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator
