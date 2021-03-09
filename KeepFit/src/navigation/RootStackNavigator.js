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

import Color from '@app/theme/color'
import { log } from 'react-native-reanimated'

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

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: googleandroidClientId,
                iosClientId: googleiosClientId,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

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
