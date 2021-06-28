import axios from 'axios';
import { parseJwt } from "../reducers/auth";
import { store } from '../index';
import { tryLogout } from "../actions/auth";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(
    config => {
        // Check if it had a userToken, the partialUserToken is a token from a user which isn't enabled who clicked on the email link
        const token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : localStorage.getItem('partialUserToken');
        const user = parseJwt(token);

        // If no user, then disconnect
        user || store.dispatch(tryLogout());

        // Check token
        config.headers['Authorization'] = token ? `Bearer ${token}` : null;
        return config;
    },
    error => (Promise.reject(error))
);
instance.defaults.headers['Content-Type'] = 'application/ld+json';
instance.defaults.timeout = 10000; // TODO: Put value lower later, upload picture take too long

export default instance;