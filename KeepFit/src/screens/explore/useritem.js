import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, TouchableHighlight, View } from 'react-native';


const UserItem = props => {
    return(
        <TouchableHighlight
        onPress={() => {
            props.setDisplayedDetails(props.object[1]["full_name"]);
        }}>
            <View style={styles.userItemContainer}>
                <Text style={styles.objectText}>{props.object[1]["full_name"]}</Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    objectText: {
        fontSize: 30,
        marginTop: 10,
    },
    userItemContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
    }
});

export default UserItem;
