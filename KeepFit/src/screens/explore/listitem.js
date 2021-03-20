import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, TouchableHighlight, View } from 'react-native';


const ListItem = props => {
    return(
        <TouchableHighlight
        onPress={() => {
            props.setDisplayedDetails(props.exercise);
        }}>
            <View style={styles.listItemContainer}>
                <Text style={styles.exerciseText}>{props.exercise[1].name}</Text>
                <Text style={styles.descriptionText} numberOfLines={2}>{props.exercise[1].description}</Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    exerciseText: {
        fontSize: 30,
        marginTop: 10,
    },
    listItemContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
    }
});

export default ListItem;