import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import Container from '@app/components/container.js'
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/actions/auth.js";
import Text, { Header, SubHeader } from '@app/components/text.js';
import User from "../../models/user";
import firebase from "firebase";
import db from "../../firebase/firebase";
import Workout from './workout';


import styles from './styles';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Notifications from 'expo-notifications';


const UserCalendarScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState(new Date());
    const [markedDates, setMarkedDates] = useState(null);

    let filteredWorkoutHistory = useSelector(
        (state) => state.auth.savedExercises
    );

    const selectDayString = day.toLocaleDateString();
    filteredWorkoutHistory = filteredWorkoutHistory.filter(workout => workout.completed_on == selectDayString);

    const scheduleWorkout = async (date) => {
        date.setDate(day.getDate());
        date.setMonth(day.getMonth());
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "You've got mail! 📬",
                    body: 'Use Keep Fit to stay active!',
                    data: { data: 'goes here' },
                },
                trigger: date,
            });
            return 1;
        } catch (e) {
            return 0;
        }
    };

    let conditionalCompletedWorkoutContent;
    if (filteredWorkoutHistory.length != 0) {
        conditionalCompletedWorkoutContent = <>
            <Text style={styles.calendarHeader}>Workouts Completed on {selectDayString}</Text>
            <View style={styles.savedContentContainer}>
                <FlatList
                    style={styles.addFlex}
                    data={filteredWorkoutHistory}
                    renderItem={({ item }) => (
                        <TouchableHighlight>
                            <Workout deleteSavedExerciseHandler={props.deleteSavedExerciseHandler} CompletedWorkout={item} />
                        </TouchableHighlight>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>;
    } else {
        conditionalCompletedWorkoutContent = <>
            <Text style={styles.calendarHeader}>No Workouts Completed on {selectDayString}</Text>
        </>;
    }

    return (
        <SafeAreaView>
            <Container>
                <Button title="<< Back" onPress={() => props.cancelCalendar()} />
                <View style={styles.calendarContainer}>
                    <Calendar
                        markedDates={markedDates}
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 350
                        }}
                        onDayPress={(day) => {
                            setDay(
                                new Date(
                                    day.timestamp +
                                    new Date().getTimezoneOffset() * 60 * 1000
                                )
                            );
                            let date_string = day.dateString;
                            let newMarkedDates = {};
                            newMarkedDates[date_string] = {selected: true, marked: true, selectedColor: 'blue'};
                            setMarkedDates(
                                newMarkedDates
                            );
                        }}
                    />
                </View>
                <Button
                    title="Create reminder"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                />
                <DateTimePickerModal
                    isVisible={modalVisible}
                    mode="time"
                    onConfirm={async (date) => {
                        if (!(await scheduleWorkout(date)))
                            return Alert.alert(
                                'Pick a time not in the past'
                            );
                        Alert.alert(
                            'Created reminder',
                            "You'll get a notification from us soon",
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        setModalVisible(false);
                                    },
                                },
                            ]
                        );
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
                <View style={styles.conditionalCalendarContentContainer}>
                    {conditionalCompletedWorkoutContent}
                </View>
            </Container>
        </SafeAreaView>
    )
};

export default UserCalendarScreen;
