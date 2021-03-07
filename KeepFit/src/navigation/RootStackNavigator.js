import React, { useState } from 'react'
import { useColorScheme } from 'react-native'

import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from '@app/screens/landing'
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

    let initialScreen = "Landing"
    if (isLoggedIn) {
        initialScreen = "Main"
    }

    return (
        <NavigationContainer
            theme={colorScheme === 'light' ? lightTheme : darkTheme}
        >
            <Stack.Navigator headerMode="none" initialRouteName={initialScreen}>
                {!isLoggedIn ? (
                    <Stack.Screen name='Landing'>
                    {(props) => <LandingScreen
                        setLoggedIn={setLoggedIn}
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
