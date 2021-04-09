import { LOGIN_USER, LOGOUT_USER, CREATE_USER, UPDATE_SAVED_EXERCISES, 
    UPDATE_LIKED_VIDEOS, UPDATE_WATCHED_VIDEOS } from '../actions/auth.js';

const initialState = {
    loggedIn: false,
    savedExercises: null,
    creatingUser: false,
    currentUserId: null,
    currentUser: null,
    likedVideos: null,
    videoDatas: null,
    watchedVideos: null
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
                currentUser: null,
                savedExercises: null,
                likedVideos: null,
                videoDatas: null
            }
        case UPDATE_SAVED_EXERCISES:
            return {
                ...state,
                savedExercises: action.exercises
            }
        case UPDATE_LIKED_VIDEOS:
            return {
                ...state,
                likedVideos: action.videos,
                videoDatas: action.video_data
            }
        
        case UPDATE_WATCHED_VIDEOS:
            return {
                ...state,
                watchedVideos: action.w_videos,
                w_videoDatas: action.w_video_data
            }
        default:
            return state;
        
    }
}

export default authReducer;
