import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Image, View, Button, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import { TouchableHighlight } from 'react-native-gesture-handler';

const UserData = props => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log("logged out");
    }
    
    return (
        <SafeAreaView>
            <Container>
                <View>
                    <Text style={styles.bigHeading}>
                        User Data
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Username:
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.subheading}>
                        Birthday:
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.tagName}>
                        Height:
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.tagName}>
                        Weight:
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.tagName}>
                        Gender:
                    </Text>
                </View>
                <View style={styles.tagName}>
                    <Text style={styles.tagName}>
                        Fitness Level:
                    </Text>
                </View>

                <View style={styles.googleButtonContainer}>
                    <FontAwesome5.Button
                        style={styles.googleButton}
                        name="google"
                        onPress={() => logoutHandler()}
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
        fontSize: 15,
        marginTop: "10%"
    },
    subheading: {
        fontWeight: 'bold',
    },
    bigHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default UserData;