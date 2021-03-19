import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Image, View, Button, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import { TouchableHighlight } from 'react-native-gesture-handler';

const UserDataScreen = props => {
    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.cancelDetails()} />
                <View>
                    <Text style={styles.bigHeading}>
                        User Data
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Username:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.username}
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Birthday:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.birthday}
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Height:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.height} inches
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Weight:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.weight} lbs.
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Gender:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.gender}
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Fitness Level:
                    </Text>
                    <Text style={styles.entryHeading}>
                        {currentUser.fitness_level}
                    </Text>
                </View>

                <View style={styles.googleButtonContainer}>
                    <FontAwesome5.Button
                        style={styles.googleButton}
                        name="google"
                        onPress={() => props.logoutHandler()}
                    >
                        <Text style={styles.googleText}>Log Out With Google</Text>
                    </FontAwesome5.Button>
                </View>
            </Container>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    tagName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        fontSize: 30,
        marginTop: "5%"
    },
    subheading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    entryheading: {
        fontSize: 20
    },
    bigHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    },
    googleButton: {
        height: 60,
        paddingLeft: 50,
        paddingRight: 50
    },
    googleButtonContainer: {
        marginTop: 25
    }
});

export default UserDataScreen;
