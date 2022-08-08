import {
    GETCATEGORIE_SUCCESS,
    GETCATEGORIE_FAIL,
    GETCHART_SUCCESS,
    GETCHART_FAIL,
    GETATTRIBUTE_SUCCESS,
    GETATTRIBUTE_FAIL,
    GETSUBCATEGORIE_SUCCESS,
    GETSUBCATEGORIE_FAIL,
    GETTOKEN_SUCCESS,
    GETTOKEN_FAIL,
    GETASSET_SUCCESS,
    GETASSET_FAIL,
    GETREALM_SUCCESS,
    GETREALM_FAIL,
    GETALLREALMS_SUCCESS,
    GETALLREALMS_FAIL,
    GETALLCHART_SUCCESS,
    GETALLCHART_FAIL,
    SET_MESSAGE,
} from "./types";


import getService from "../../services/get.service";

export const getCategorie = (realmName) => (dispatch) => {
    return getService.getCategorie(realmName).then(
        (data) => {
            dispatch({
                type: GETCATEGORIE_SUCCESS,
                payload: { categories : data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETCATEGORIE_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getChart = (realmName, categorie) => (dispatch) => {
    return getService.getChart(realmName, categorie).then(
        (data) => {
            dispatch({
                type: GETCHART_SUCCESS,
                payload: { charts: data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETCHART_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getAllAttributes = (assetId) => (dispatch) => {
    return getService.getAllAttributes(assetId).then(
        (data) => {
            dispatch({
                type: GETATTRIBUTE_SUCCESS,
                payload: { attributes : data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETATTRIBUTE_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getToken = () => (dispatch) => {
    return getService.getToken().then(
        (data) => {
            dispatch({
                type: GETTOKEN_SUCCESS,
                payload: { token : data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETTOKEN_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getAllAssets = (realm) => (dispatch) => {
    return getService.getAllAssets(realm).then(
        (data) => {
            dispatch({
                type: GETASSET_SUCCESS,
                payload: { data : data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETASSET_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getRealm = (id) => (dispatch) => {
    return getService.getRealm(id).then(
        (data) => {
            dispatch({
                type: GETREALM_SUCCESS,
                payload: { data: data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETREALM_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getAllRealms = () => (dispatch) => {
    return getService.getAllRealms().then(
        (data) => {
            dispatch({
                type: GETALLREALMS_SUCCESS,
                payload: { data: data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETALLREALMS_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};


export const getAllCharts = (realmName) => (dispatch) => {
    return getService.getAllCharts(realmName).then(
        (data) => {
            dispatch({
                type: GETALLCHART_SUCCESS,
                payload: { charts: data },
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: GETALLCHART_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};