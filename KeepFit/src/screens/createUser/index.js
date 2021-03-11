import React from 'react';
import { SafeAreaView, Button, StyleSheet } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';

import { createUser, loginUser } from "../../redux/actions/auth.js";
import { useSelector, useDispatch } from 'react-redux';

import User from '../../models/user.js';
import db from "../../firebase/firebase";
import * as firebase from 'firebase';



const CreateUserScreen = props => {
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);

    const finishCreateHandler = (user_id, user_object) => {
        db.collection(User.collection_name).doc(user_id).update({
            isNew: firebase.firestore.FieldValue.delete(),
        }).then(function (result) {
            dispatch(loginUser(user_id, user_object));
        });
    }

    return (
        <SafeAreaView>
            <Container>
                <Header style={styles.mainHeader}>
                    Welcome to the Create User Screen!
                </Header>
                <Button title="Create" onPress={() => {finishCreateHandler(currentUserId, currentUser)}} />
            </Container>
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

export default CreateUserScreen;
