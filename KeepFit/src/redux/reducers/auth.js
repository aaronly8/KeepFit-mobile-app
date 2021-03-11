import { LOGIN_USER, LOGOUT_USER, CREATE_USER } from '../actions/auth.js';

const initialState = {
    loggedIn: false,
    creatingUser: false,
    currentUserId: null,
    currentUser: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loggedIn: true,
                creatingUser: false,
                currentUserId: action.userId,
                currentUser: action.userObject
            }
        case CREATE_USER:
            return {
                ...state,
                loggedIn: false,
                creatingUser: true,
                currentUserId: action.userId,
                currentUser: action.userObject
            }
        case LOGOUT_USER:
            return {
                ...state,
                loggedIn: false,
                creatingUser: false,
                currentUserId: null,
                currentUser: null
            }
        default:
            return state;
    }
}

export default authReducer;
