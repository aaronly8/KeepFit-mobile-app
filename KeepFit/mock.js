import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './src/firebase/config';

firebase.initializeApp(firebaseConfig);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const { mockFirebase } = require('firestore-jest-mock');

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
  database: {
    users: [
      { id: 'abc123', name: 'Homer Simpson' },
      { id: 'abc456', name: 'Lisa Simpson' },
    ],
    posts: [{ id: '123abc', title: 'Really cool title' }],
  },
});

jest.mock('@expo/vector-icons');
