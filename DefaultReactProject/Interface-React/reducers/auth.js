import Base64 from 'base-64';
import * as types from "../actions/auth";

const initialState = {
    loginError: null,
    loginLoading: false,
    user: parseJwt(localStorage.getItem('userToken')),
    userLastLogin: localStorage.getItem('lastLogin') === "null" ? null : localStorage.getItem('lastLogin'),
    userId: localStorage.getItem('userId'),
    logoutLoading: false,
    signUpLoading: false,
    signUpSuccess: null,
    signUpError: null,
    resendConfirmLoading: false,
    resendConfirmError: null,
    resendConfirmSuccess: null,
    confirmUserLoading: false,
    confirmUserError: null,
    confirmUserSuccess: false
};

// Parse Jwt to get data from token
export function parseJwt(token){
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const user = JSON.parse(Base64.decode(base64));

        // Check if token expired
        if (Math.floor(new Date().getTime()/1000) > user.exp) return null;

        return user;
    } catch(error) {
        return null
    }
}

// Check if user has allowed role to get in a route
export function userHasAllowedRole(userRoles, allowedRoles) {
    return userRoles.some(userRole => allowedRoles.includes(userRole));
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Login
        case types.LOGIN_REQUESTED: {
            return {
                ...state,
                loginLoading: true,
                loginError: null
            };
        }
        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                loginLoading: false,
                user: parseJwt(action.data.token),
                userLastLogin: action.data.lastLogin,
                userId: action.data.userId,
                confirmUserSuccess: false // We already know that the user account is enabled
            };
        }
        case types.LOGIN_FAILURE: {
            return {
                ...state,
                loginLoading: false,
                user: null,
                userLastLogin: null,
                userId: null,
                loginError: action.data.response.data.error ? action.data.response.data.error.message : action.data.response.data.message.message
            };
        }
        // Logout
        case types.LOGOUT_REQUESTED: {
            return {
                ...state,
                logoutLoading: true
            }
        }
        case types.LOGOUT_SUCCESS: {
            return {
                ...state,
                user: null,
                logoutLoading: false
            }
        }
        // Sign up
        case types.SIGN_UP_REQUESTED:
            return {
                ...state,
                signUpLoading: true
            };
        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpSuccess: action.data.email
            };
        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.data.response.data,
                signUpSuccess: null
            };
        // Confirm User
        case types.CONFIRM_USER_REQUESTED:
            return {
                ...state,
                confirmUserLoading: true
            };
        case types.CONFIRM_USER_SUCCESS:
            return {
                ...state,
                confirmUserLoading: false,
                confirmUserError: false,
                confirmUserSuccess: action.data.email
            };
        case types.CONFIRM_USER_FAILURE:
            return {
                ...state,
                confirmUserLoading: false,
                confirmUserError: action.data.message,
                confirmUserSuccess: false
            };
        // Resend Confirm
        case types.RESEND_CONFIRM_REQUESTED:
            return {
                ...state,
                resendConfirmLoading: true
            };
        case types.RESEND_CONFIRM_SUCCESS:
            return {
                ...state,
                resendConfirmLoading: false,
                resendConfirmError: false,
                resendConfirmSuccess: action.data.email
            };
        case types.RESEND_CONFIRM_FAILURE:
            return {
                ...state,
                resendConfirmLoading: false,
                resendConfirmError: action.data.response.data['hydra:description'],
                resendConfirmSuccess: false
            };
        default :
            return state;
    }
}