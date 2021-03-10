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
