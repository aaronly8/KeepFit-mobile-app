export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (user_id, user_object) => {
    return {
        type: LOGIN_USER,
        userId: user_id,
        userObject: user_object
    }
};

export const LOGOUT_USER = "LOGOUT_USER";

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};

export const CREATE_USER = "CREATE_USER";

export const createUser = (user_id, user_object) => {
    return {
        type: CREATE_USER,
        userId: user_id,
        userObject: user_object
    }
}

export const UPDATE_SAVED_EXERCISES = "UPDATE SAVED EXERCISES";

export const updateSavedExercises = (saved_exercises) => {
    return {
        type: UPDATE_SAVED_EXERCISES,
        exercises: saved_exercises
    }
}
