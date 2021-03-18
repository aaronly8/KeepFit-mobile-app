import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Image, View, Button, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import UserData from './userData'

const ProfileScreen = props => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const user_profile = useSelector(state => state.auth.currentUser);

    const viewUserData = () => {
        this.props.navigation.navigate("./userData");
    };
    
    return (
        <SafeAreaView>
            {isLoggedIn ? (
                <Container style={styles.mainContainer}>
                    <View style={styles.horizontalContainer}>
                        <Image
                            style={styles.profilePic}
                            source={{ uri: user_profile.profile_picture }}
                        />
                        <View>
                            <Text style={styles.userName}>
                                {user_profile.username}
                            </Text>
                            <Text style={styles.fullName}>
                                {user_profile.full_name}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={console.log("pressed")}>
                            <Image source={require("../../../assets/gear.png")} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.twoHeadings}>
                        <View style={styles.followers}>
                            <Text style={styles.subheading}>
                                Followers
                            </Text>
                            <Text>
                                100
                            </Text>
                        </View>
                        <View style={styles.following}>
                            <Text style={styles.subheading}>
                                Following
                            </Text>
                            <Text>
                                55
                            </Text>
                        </View>
                    </View>
                    <View style={styles.twoHeadings}>
                        <TouchableOpacity onPress={() => console.log("pressed")}>
                            <Text style={styles.btnPress}>Workout History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log("pressed")}>
                            <Text style={styles.btnPress}>Saved Exercises</Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            ) : (
                    <Text>Logging Out.</Text>
                )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    mainContainer: {
        marginTop: 20,
        paddingHorizontal: 35
    },
    googleButton: {
        height: 60,
        paddingLeft: 50,
        paddingRight: 50
    },
    googleButtonContainer: {
        marginTop: 25
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold'
    },
    fullName: {
        fontSize: 15
    },
    userName: {
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    },
    twoHeadings: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15
    },
    followers: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    following: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    subheading: {
        fontWeight: 'bold',
    },
    btnPress: {
        color: 'black',
        fontSize: 18
    },
    image: {
        width: 25,
        height: 25
    }
});

export default ProfileScreen;
