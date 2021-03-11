import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Input from '../../components/input';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';

import { createUser, loginUser } from "../../redux/actions/auth.js";
import { useSelector, useDispatch } from 'react-redux';

import User from '../../models/user.js';
import db from "../../firebase/firebase";
import * as firebase from 'firebase';



const CreateUserScreen = props => {
    const [enteredUsername, setUsername] = useState('');
    const [enteredHeight, setHeight] = useState('');
    const [enteredWeight, setWeight] = useState('');
    const [enteredGender, setGender] = useState('');
    const [enteredFitnessLevel, setFitnessLevel] = useState('');

    const usernameInputHandler = inputText => {
        setUsername(inputText);
    };

    const heightInputHandler = inputText => {
        setHeight(inputText.replace(/[^0-9]/g, ''));
    };

    const weightInputHandler = inputText => {
        setWeight(inputText.replace(/[^0-9]/g, ''));
    };

    const genderInputHandler = inputText => {
        setGender(inputText);
    };

    const fitnessLevelInputHandler = inputText => {
        setFitnessLevel(inputText);
    };

    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.auth.currentUserId);
    const currentUser = useSelector(state => state.auth.currentUser);

    const finishCreateHandler = (user_id, user_object) => {
        console.log(enteredWeight);
        console.log(enteredHeight);
        db.collection(User.collection_name).doc(user_id).update({
            isNew: firebase.firestore.FieldValue.delete(),
        }).then(function (result) {
            dispatch(loginUser(user_id, user_object));
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <SafeAreaView>
                <Container>
                    <Header style={styles.mainHeader}>
                        Welcome to KeepFit!
                    </Header>
                    <Text>Username:</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitlize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={2}
                        onChangeText={usernameInputHandler}
                        value={enteredUsername}
                    />
                    <Text>Height (Inches):</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitlize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={heightInputHandler}
                        value={enteredHeight}
                    />
                    <Text>Weight (pounds):</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitlize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={3}
                        onChangeText={weightInputHandler}
                        value={enteredWeight}
                    />
                    <Text>Gender:</Text>

                    <Button title="Create" onPress={() => { finishCreateHandler(currentUserId, currentUser) }} />
                </Container>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 40,
        marginTop: "55%",
        textAlign: "center"
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});

export default CreateUserScreen;
