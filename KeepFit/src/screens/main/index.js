import React from 'react'
import { Button, SafeAreaView, StyleSheet } from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons";

import Container from '@app/components/container.js'
import Text, { Header, Subheader } from '@app/components/text.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@app/screens/home'
import ExploreScreen from '@app/screens/explore';
import CreateScreen from '@app/screens/create';
import TrackScreen from '@app/screens/track';
import ProfileScreen from '@app/screens/profile';


const Tab = createBottomTabNavigator();


const MainScreen = props => {
    const setLoggedIn = props.setLoggedIn

    // TODO: fix this props passing up, it behaves a bit weirdly with react navigation

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Create" component={CreateScreen} />
            <Tab.Screen name="Track" component={TrackScreen} />
            <Tab.Screen name='Profile'>
                {(props) => <ProfileScreen
                    setLoggedIn={setLoggedIn}
                />}
            </Tab.Screen>
        </Tab.Navigator>
    );
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

export default MainScreen;
