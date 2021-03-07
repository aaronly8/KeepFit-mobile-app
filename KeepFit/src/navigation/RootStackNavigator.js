import React from 'react'
import { useColorScheme } from 'react-native'

import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from '@app/screens/landing'

import Color from '@app/theme/color'

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

    return (
        <NavigationContainer
            theme={colorScheme === 'light' ? lightTheme : darkTheme}
        >
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={LandingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator
