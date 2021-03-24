import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Button, TouchableHighlight, Image, View, Linking, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import Text from '@app/components/text.js';

const UserDetailsScreen = props => {
    const user_profile = props.user;

    return (
        <SafeAreaView style={styles.detailsContainer}>
            <View style={styles.userHeadings}>
                <Text style={styles.userName}>
                    {user_profile.username}
                </Text>
                {
                    <View style={styles.googleButtonContainer}>
                        <Button title="<< Back" onPress={() => props.detailsBackHandler()} />
                    </View>
                }
            </View>
            <View style={styles.horizontalContainer}>
                <Image
                    style={styles.profilePic}
                    source={{ uri: user_profile.profile_picture }}
                />
                <View style={styles.followHeadings}>
                    <View style={styles.followBox}>
                        <Text style={styles.numFollow}>
                            15
                            </Text>
                        <Text style={styles.follow}>
                            Followers
                            </Text>
                    </View>
                    <View style={styles.followBox}>
                        <Text style={styles.numFollow}>
                            5
                            </Text>
                        <Text style={styles.follow}>
                            Following
                            </Text>
                    </View>
                </View>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.fullName}>
                    {user_profile.full_name}
                </Text>
                <Text style={styles.bio}>
                    Insert bio here
                    </Text>
            </View>
            <View>
                <Text style={styles.bigHeading}>
                    User Data
                    </Text>
            </View>
            <View style={styles.tagName}>
                <Text style={styles.subheading}>
                    Birthday:
                    </Text>
                <Text style={styles.entryHeading}>
                    {user_profile.birthday}
                </Text>
            </View>
            <View style={styles.tagName}>
                <Text style={styles.subheading}>
                    Height:
                    </Text>
                <Text style={styles.entryHeading}>
                    {user_profile.height} inches
                    </Text>
            </View>
            <View style={styles.tagName}>
                <Text style={styles.subheading}>
                    Weight:
                    </Text>
                <Text style={styles.entryHeading}>
                    {user_profile.weight} lbs.
                    </Text>
            </View>
            <View style={styles.tagName}>
                <Text style={styles.subheading}>
                    Gender:
                    </Text>
                <Text style={styles.entryHeading}>
                    {user_profile.gender}
                </Text>
            </View>
            <View style={styles.tagName}>
                <Text style={styles.subheading}>
                    Fitness Level:
                    </Text>
                <Text style={styles.entryHeading}>
                    {user_profile.fitness_level}
                </Text>
            </View>
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
        paddingLeft: 10,
        paddingRight: 1,
        justifyContent: "flex-end"
    },
    googleButtonContainer: {
        marginTop: 0,
        justifyContent: "flex-end"
    },
    googleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    nameContainer: {
        marginLeft: "0%"
    },
    fullName: {
        marginTop: "5%",
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: "1%"
    },
    userHeadings: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    userName: {
        fontSize: 20,
        marginTop: "0%",
        fontWeight: "bold"
    },
    bio: {
        fontSize: 15,
        marginTop: "0%"
    },
    twoHeadings: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 15
    },
    followHeadings: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    followBox: {
        justifyContent: "center"
    },
    numFollow: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: "0%",
        textAlign: "center"
    },
    follow: {
        fontSize: 15,
        marginTop: "0%",
        textAlign: "center"
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: "10%",
        marginLeft: "0%",
        justifyContent: 'flex-start'
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15
    },
    unpaddedHorizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    unpaddedTagsHorizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: "5%",
        paddingTop: "0%"
    },
    editHeadings: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    spaceBox: {
        flex: 0.01
    },
    btnPress: {
        color: 'black',
        fontSize: 18
    },
    btnBluePress: {
        color: 'blue',
        fontSize: 18,
    },
    image: {
        width: 25,
        height: 25,
        fontWeight: 'bold'
    },
    editText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center"
    },
    editBorder: {
        borderColor: "grey",
        borderWidth: 1,
        flex: 1
    },
    tagName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        fontSize: 30,
        marginTop: "5%"
    },
    subheading: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "blue"
    },
    workoutHistName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "5%",
        paddingLeft: "5%"
    },
    workoutHistSub: {
        fontSize: 18,
        marginTop: "0%",
        paddingLeft: "5%"
    },
    workoutHistLastSub: {
        fontSize: 18,
        marginTop: "0%",
        marginBottom: "0%",
        paddingLeft: "5%"
    },
    workoutHistVidLink: {
        fontSize: 18,
        marginTop: "0%",
        marginBottom: "0%",
        paddingLeft: "5%",
        color: 'blue',
        textDecorationLine: "underline"
    },
    workoutPic: {
        width: 110,
        height: 110,
        marginTop: "5%"
    },
    addFlex: {
        flexGrow: 1
    },
    savedContentContainer: {
        height: "55%"
    },
    detailsContainer: {
        marginTop: 40
    },
    bigHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: "underline",
        marginTop: 30
    }
});

export default UserDetailsScreen;
