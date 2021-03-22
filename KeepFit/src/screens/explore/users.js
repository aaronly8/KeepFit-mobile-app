import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, FlatList, Text, View, ScrollView } from 'react-native';
import  UserItem  from '../explore/useritem.js'
import Container from '@app/components/container.js'
import SearchInput from '@app/components/input.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import User from "../../models/user"
import { useScrollToTop } from '@react-navigation/native';

const DetailsScreen = props => {
    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                <Header style={styles.mainHeader}>
                    Welcome to the Users Screen!
                </Header>
            </Container>
            <Button title="<< Back" onPress={() => props.detailsBackHandler()} />
            <Header style={styles.mainHeader}>
                {props.user}
            </Header>
        </SafeAreaView>
    );
};

const SearchUsersScreen = props => {
    const [users, setUsers] = useState('index');
    const [filteredUsers, setFilteredUsers] = useState('index');
    const [searchPhrase, setSearchPhrase] = useState("");
    const [displayedDetails, setDisplayedDetails] = useState(null);

    const handleChange = e => {
      setSearchPhrase(e);
      let oldList = users.map(user => {
        return { userID: user[0]}
      })
      if (searchPhrase !== ""){
        let newList = [];
        newList = oldList.filter(user => user.name.includes(searchPhrase.toLowerCase()))
        setFilteredUsers(newList);
      }
      else{
        setFilteredUsers(users);
      }

    }

    // should be good.
    useEffect(() => {
        var usersDictionary = {};
        db.collection(User.collection_name).get().then(snapshot => {
            snapshot.forEach(doc => {
                usersDictionary[doc.id] = doc.data();
            });
            setUsers(usersDictionary);
            setFilteredUsers(usersDictionary);
        });
    }, []);

    //Apply search filters
    useEffect(() => {
        var newFilteredUsers = {};

        for(var user in filteredUsers) {
            var userDetails = filteredUsers[user];
            newFilteredUsers[user] = userDetails;
        }
        setFilteredUsers(newFilteredUsers);
    }, []);
    const detailsBackHandler = () => {
        setDisplayedDetails(null);
    };
    return (
      <SafeAreaView style={styles.searchContainer}>
              {displayedDetails ? (
                  <DetailsScreen
                      userID={displayedDetails[0]}
                      user={filteredUsers[displayedDetails[0]]}
                      detailsBackHandler={detailsBackHandler}
                  />
              ) : (
                <View style={styles.listView}>
                    <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                    <View style={styles.searchContainer}>
                      <SearchInput value={searchPhrase} onChange={e => handleChange(e.target.value)} />
                   </View>
                    <View style={styles.scrollView}>
                        <ScrollView>
                        {Object.entries(filteredUsers).map(user =>

                          <UserItem setDisplayedDetails={setDisplayedDetails} object={user}>
                            </UserItem>

                          )}
                        </ScrollView>
                      </View>
                </View>
              )}
      </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 25,
        flexGrow:1,
    },
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    },
    listView: {
        marginBottom: 200,
    },
    scrollView: {
        height: "72.5%"
    }
});

export default SearchUsersScreen;
export {DetailsScreen};
