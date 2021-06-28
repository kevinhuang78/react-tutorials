import API from "../utils/API";

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function tryLogin(data)
{
    return dispatch => {
        dispatch({type: LOGIN_REQUESTED});
        const request = API.post(
            '/login',
            {
                email: data.email,
                password: data.password
            }
        );
        request
            .then(response => {
                dispatch({type: LOGIN_SUCCESS, data: response.data});
                localStorage.setItem('userToken', response.data.token); // When login, store the userToken in localStorage to access it
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('lastLogin', response.data.lastLogin); // and last time it logged in to check if it's it first time (this data isn't stocked in the token)
            })
            .catch(error => dispatch({type: LOGIN_FAILURE, data: error}))
        ;
        return request;
    };
}

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function tryLogout()
{
    return dispatch => {
        dispatch({type: LOGOUT_REQUESTED});
        localStorage.clear();
        dispatch({type: LOGOUT_SUCCESS});
    };
}

export const SIGN_UP_REQUESTED = 'SIGN_UP_REQUESTED';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export function trySignUp(data)
{
    return dispatch => {
        dispatch({type: SIGN_UP_REQUESTED});
        const request = API.post('/users', data);
        request
            .then(response => dispatch({type: SIGN_UP_SUCCESS, data: response.data}))
            .catch(error => dispatch({type: SIGN_UP_FAILURE, data: error}))
        ;
        return request;
    };
}

export const CONFIRM_USER_REQUESTED = 'CONFIRM_USER_REQUESTED';
export const CONFIRM_USER_SUCCESS = 'CONFIRM_USER_SUCCESS';
export const CONFIRM_USER_FAILURE = 'CONFIRM_USER_FAILURE';
// Confirm the user and enable it
export function tryConfirmUser(id)
{
    return dispatch => {
        dispatch({type: CONFIRM_USER_REQUESTED});
        // Because I use the ID from the token, that's why I'm not using @id from API Platform
        const request = API.get('/users/' + id + "/confirm");
        request
            .then(response => dispatch({type: CONFIRM_USER_SUCCESS, data: response.data}))
            .catch(error => dispatch({type: CONFIRM_USER_FAILURE, data: error}))
        ;
        return request;
    };
}

export const RESEND_CONFIRM_REQUESTED = 'RESEND_CONFIRM_REQUESTED';
export const RESEND_CONFIRM_SUCCESS = 'RESEND_CONFIRM_SUCCESS';
export const RESEND_CONFIRM_FAILURE = 'RESEND_CONFIRM_FAILURE';
// If you need to resend a confirmation email
export function tryResendConfirm(id)
{
    return dispatch => {
        dispatch({type: RESEND_CONFIRM_REQUESTED});
        // Because I use the ID only from URL, that's why I'm not using @id from API Platform
        const request = API.get('/users/' + id + "/resend-confirm");
        request
            .then(response => dispatch({type: RESEND_CONFIRM_SUCCESS, data: response.data}))
            .catch(error => dispatch({type: RESEND_CONFIRM_FAILURE, data: error}))
        ;
        return request;
    };
}