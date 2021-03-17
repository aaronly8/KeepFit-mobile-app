import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Image, View } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import EditProfileScreen from './EditProfileScreen';

const ProfileScreen = props => {
    const [editMode, setEditMode] = useState(false);

    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const user_profile = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        console.log("logged out");
    }

    let mainContent;
    if (isLoggedIn) {
        if (editMode) {
            console.log("is edit mode");
            mainContent = <EditProfileScreen cancelEdit={setEditMode.bind(this, false)} />
        } else {
            console.log("is normal");
            mainContent = <Container style={styles.mainContainer}>
                <View style={styles.editButtonContainer}>
                    <Button title="Edit Profile" onPress={() => setEditMode(true)} />
                </View>
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
                    <Text style={styles.subheading}>
                        Exercise History
                </Text>
                    <Text style={styles.subheading}>
                        Saved Exercises
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
        }
    } else {
        console.log("is logging out")
        mainContent = <Text>Logging Out.</Text>
    }

    return (
        <SafeAreaView>
            {mainContent}
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
        fontWeight: 'bold'
    },
    editButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default ProfileScreen;
