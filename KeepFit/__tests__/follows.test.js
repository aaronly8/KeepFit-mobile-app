import SearchUsersScreen from "../src/screens/explore/users"
import React, { useState } from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { rootReducer } from "../src/redux/store";
import RootStackNavigator from "../src/navigation/RootStackNavigator";

const { mockWhere, mockCollection } = require('firestore-jest-mock/mocks/firestore');


describe('Follow Events', () => {
  const initialState = {
      auth: {
          loggedIn: true,
          savedExercises: null,
          creatingUser: false,
          currentUserId: '3',
          currentUser: 'victorudobong',
          likedVideos: null,
          videoDatas: null
      }
  }

  const mockStore = configureStore({reducer: rootReducer})
  let store, wrapper

  it('Follow button should be SHOWN if user searched, found and unfollowed', async () => {
    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['5', '6']}/>
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    //The button should exist, else, fail the test
    expect(getByTestId('followUser'));
  });

  it('follow button calls followUser', async () => {
    const followMock = jest.fn();

    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['5', '6']} followUser={followMock} />
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    fireEvent(getByTestId('followUser'), 'onPress');
    expect(followMock).toHaveBeenCalled();
  });

  it('Unfollow button should be SHOWN if user searched, found and followed', async () => {
    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['4', '5', '6']} />
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    expect(getByTestId('unfollowUser'));
  });

  it('unfollow button calls unfollowUser', async () => {
    const unfollowMock = jest.fn();

    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['4', '5', '6']} unfollowUser={unfollowMock} />
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    fireEvent(getByTestId('unfollowUser'), 'onPress');
    expect(unfollowMock).toHaveBeenCalled();
  });

  it('followUser() should reflect in Firestore', async () => {
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();

    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['5', '6']} />
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    fireEvent(getByTestId('followUser'), 'onPress');
    let result

    db.collection('follows')
      .where("follower_id", "==", '3')
      .where("followee_id", "==", '4')
      .get()
      .then(querySnapshot => {
        result = querySnapshot.empty;
      });

    expect(result).toBe(false);
  });

  it('unfollowUser() should reflect in Firestore', async () => {
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();

    store = mockStore(initialState)
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchUsersScreen current_user_id={'3'} followedUserIds={['5', '6']} />
      </Provider>
    );

    //type in search term
    await fireEvent.change(getByTestId("searchBar"), { target: { value: 'aron' } })

    fireEvent(getByTestId('followUser'), 'onPress');
    fireEvent(getByTestId('unfollowUser'), 'onPress');
    let result

    db.collection('follows')
      .where("follower_id", "==", '3')
      .where("followee_id", "==", '4')
      .get()
      .then(querySnapshot => {
        result = querySnapshot.empty;
      });

    expect(result).toBe(true);
  });
});
