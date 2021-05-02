import React from 'react'
import { SafeAreaView, View, FlatList, Button, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';

const UserItem = (props) => {
    return (
        <View style={styles.userItemContainer}>
            <Image
                style={styles.profilePic}
                source={{ uri: props.UserProfile.profile_picture }}
            />
            <Text style={styles.userItemName}>
                {props.UserProfile.full_name}
            </Text>
        </View>
    )
}

const UserList = (props) => {
    return (
        <SafeAreaView style={styles.UserListContainer}>
            <Button title="<< Back" onPress={() => props.cancelDetails()} />
            <Text style={styles.bigHeading}>{props.headerText}</Text>
            <FlatList
                style={styles.addFlex}
                data={props.userData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => console.log("pressed")}>
                        <UserItem UserProfile={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default UserList;
