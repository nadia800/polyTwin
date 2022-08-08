import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";
import AuthService from "../../services/auth.service";

//Sign Up a Master Realm
export const register = (userName,
    realm,
    email,
    password,
    firstName,
    lastName,
    phone,
    jobTitle,
    nameCompany,
    country,
    city,
    state,
    posteCode) => (dispatch) => {
        return AuthService.register(userName,
            realm,
            email,
            password,
            firstName,
            lastName,
            phone,
            jobTitle,
            nameCompany,
            country,
            city,
            state,
            posteCode).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};