import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, FlatList, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import User from "../../models/user"
import { useScrollToTop } from '@react-navigation/native';


const SearchUsersScreen = props => {
    const [filteredUsers, setFilteredUsers] = useState('index');
    const [displayedDetails, setDisplayedDetails] = useState(null);

    useEffect(() => {
        var usersDictionary = {};
        db.collection(User.collection_name).get().then(snapshot => {
            snapshot.forEach(doc => {
                usersDictionary[doc.id] = doc.data();
            });
            setFilteredUsers(usersDictionary);
            console.log(typeof usersDictionary);
        });
    }, []);

    return (
      <SafeAreaView style={styles.searchContainer}>
              {displayedDetails ? (
                  <DetailsScreen
                      userName={displayedDetails}
                      detailsBackHandler={detailsBackHandler}
                  />
              ) : (
                <View style={styles.listView}>
                    <Button title="Back" onPress={() => props.changeScreenHandler("index")} />
                    <ScrollView>
                    {Object.entries(filteredUsers).map(user =>
                        (
                        <>
                        <Button onPress={() => props.changeScreenHandler("index")}
                                title="test">
                                testr
                        </Button>
                        <Button title="follow" onPress={() => props.changeScreenHandler("index")}>test</Button>
                        </>
                      )
                    )}

                    </ScrollView>
                </View>
              )}
      </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    }
});

export default SearchUsersScreen;
