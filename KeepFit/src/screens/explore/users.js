import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, FlatList, Text, View, ScrollView, TouchableHighlight } from 'react-native';
//import  UserItem  from '../explore/useritem.js'
import Container from '@app/components/container.js'
import SearchInput from '@app/components/input.js'
import { Header } from '@app/components/text.js';
import db from "../../firebase/firebase";
import User from "../../models/user";
import Follows from '../../models/follows';
import { useScrollToTop } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const DetailsScreen = props => {
    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                <Header style={styles.mainHeader}>
                   {props.user.full_name}'s Profile
                </Header>
            </Container>
            <Button title="<< Back" onPress={() => props.detailsBackHandler()} />
            <Header style={styles.mainHeader}>
                Some info.
            </Header>
        </SafeAreaView>
    );
};


const SearchUsersScreen = props => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [followedUserIds, setFollowedUserIds] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [displayedDetails, setDisplayedDetails] = useState(null);

    const current_user_id = useSelector(state => state.auth.currentUserId);
    const detailsBackHandler = () => {
        setDisplayedDetails(null);
    };

    // Get snapshot (dictionary : id -> Object) of all Users from db.
    useEffect(() => {
        var usersArray = [];
       db.collection(User.collection_name).get().then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.id !== current_user_id){ //ignore the current user
                usersArray.push({id: doc.id, ...doc.data()})
              }
            });
            setUsers(usersArray);
            setFilteredUsers(usersArray);
            console.log("snap: " + filteredUsers.length + " users grabbed.")
        });
    }, []);

    // Create a list of userIDs followed by current user.
   useEffect(() => {
       var userIds = [];
       db.collection(Follows.collection_name).where("follower_id", "==", current_user_id).get().then(function (snapshot) {
           snapshot.forEach(doc => {
               let id = doc.data()["followee_id"];
               console.log("followed by user: " + id)
               if (id !== current_user_id){
                userIds.push(id);
              }
           })

           setFollowedUserIds(userIds);
           console.log("length of followed: " + Object.entries(userIds).length)
       });
   }, []);

     const UserItem = ({ setDisplayedDetails, user, followed}) => {
           if (!followed) {
               console.log("UserItem id: " + user.id)
             //  console.log("user object: " + users[userID].full_name)
               return (
                 <TouchableHighlight
                 onPress={() => {
                     setDisplayedDetails(user);
                 }}>
                   <View>
                       <Text>
                   {user.full_name}
                       </Text>
                       <Button title="Follow" onPress={() =>  followUser(current_user_id, user.id)} />
                   </View>
                     </TouchableHighlight>
               )
           }
           else {
               return (
                 <TouchableHighlight
                 onPress={() => {
                     setDisplayedDetails(user);
                 }}>
                   <View>
                       <Text>
                       {user.full_name}
                       </Text>
                       <Button title="Unfollow" onPress={() =>  unfollowUser(current_user_id, user.id)} />
                   </View>
                     </TouchableHighlight>
               )
           }
       }

     const followUser = async(follower_user_id, followee_user_id) => {
         await db.collection(Follows.collection_name).doc().set({
             follower_id: follower_user_id,
             followee_id: followee_user_id
         }).then(() => {
             followedUserIds.push(followee_user_id);
             setFollowedUserIds([...followedUserIds]);
         });
     }

     const unfollowUser = async(follower_user_id, followee_user_id) => {
         await db.collection(Follows.collection_name).where("followee_id", "==", followee_user_id)
         .where("follower_id", "==", follower_user_id).get().then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
               doc.ref.delete();
             });
             followedUserIds.splice(followedUserIds.indexOf(followee_user_id, 1));
             setFollowedUserIds([...followedUserIds]);
         });
     }


    //update filteredUsers upon any change to the search field.
    const handleChange = async (e) => {
      console.log("e type:" + typeof e)
      console.log("e: " + e)
    //  console.log("e.target.value is: " + e.target.value)

      setSearchPhrase(e);

      if (e !== ""){
          console.log("search phrase: " + {e})
          // this works!
        let filtered = [];
        for (let user of users){
          let name = user.full_name;
          console.log("name: " + name)
          if (name.toLowerCase().includes(e.toLowerCase()))
            filtered.push(user);
        }
          setFilteredUsers(filtered);
      }
      else{
        setFilteredUsers(users);
      }
    }

    return (
      <SafeAreaView style={styles.searchContainer}>
              {displayedDetails ? (
                  <DetailsScreen
                      userID={displayedDetails[0]}
                      user={displayedDetails}
                      detailsBackHandler={detailsBackHandler}
                      changeScreenHandler={props.changeScreenHandler}
                  />
              ) : (
                <View style={styles.listView}>
                    <Button title="<< Back" onPress={() => props.changeScreenHandler("index")} />
                    <View style={styles.searchContainer}>
                      <SearchInput value={searchPhrase} onChangeText={e => handleChange(e)} />
                   </View>
                    <View style={styles.scrollView}>
                        <ScrollView>
                        {filteredUsers.map(user =>
                          <UserItem setDisplayedDetails={setDisplayedDetails}
                                    user={ user } followed={ followedUserIds.includes(user.id) }/>
                          )}
                        </ScrollView>
                      </View>
                </View>
              )}
      </SafeAreaView>

    )
    console.log(filteredUsers);
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 25,
        flexGrow:1,
    },
    mainHeader: {
        fontSize: 26,
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
