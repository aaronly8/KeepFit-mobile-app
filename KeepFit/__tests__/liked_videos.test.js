import React from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';

import {
    WorkoutCategoryPicker,
    MuscleGroupPicker,
} from '../src/components/pickers';

import ProfileScreen from '../src/screens/profile/index';
import RootStackNavigator from "../src/navigation/RootStackNavigator";

import { render, fireEvent, waitFor } from '@testing-library/react-native';
const { mockWhere } = require('firestore-jest-mock/mocks/firestore');
import configureStore from 'redux-mock-store';

describe('Ensure Liked Videos are Displayed Based on Redux State', () => {
    const likedVideo = {
        id: "1",
        title: "liked vid 1",
        description: "sample description"
    }
    const initialState = {
        auth: {
            loggedIn: true,
            savedExercises: null,
            creatingUser: false,
            currentUserId: "1",
            currentUser: { "full_name": 'Sajan Gutta' },
            likedVideos: null,
            videoDatas: null
        }
    }
    const mockStore = configureStore()
    let store

    it('If video is liked, title is shown on users profile page', () => {
        const thisInitialState = {
            auth: {
                loggedIn: false,
                savedExercises: null,
                creatingUser: true,
                currentUserId: "1",
                currentUser: { "full_name": 'Sajan Gutta' },
                likedVideos: {"1": likedVideo},
                videoDatas: null
            }
        }

        store = mockStore(thisInitialState)

        expect(new_state.auth.likedVideos).toEqual(1);
    });

    it('If video is unliked, title is removed from users profile page', () => {
        const thisInitialState = {
            auth: {
                loggedIn: false,
                savedExercises: null,
                creatingUser: true,
                currentUserId: "1",
                currentUser: { "full_name": 'Sajan Gutta' },
                likedVideos: null,
                videoDatas: null
            }
        }

        store = mockStore(thisInitialState)
        
        expect(new_state.auth.likedVideos).toEqual(null);
    });
});