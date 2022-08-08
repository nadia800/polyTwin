import {
    SET_MESSAGE,
    ADDASSETS_SUCCESS,
    ADDASSETS_FAIL,
    ADDATTRIBUTES_SUCCESS,
    ADDATTRIBUTES_FAIL,
    ADDINSIGHT_SUCCESS,
    ADDINSIGHT_FAIL,
    ADDINSIGHTLINK_SUCCESS,
    ADDINSIGHTLINK_FAIL,
    GETCHARTDATA_SUCCESS,
    GETCHARTDATA_FAIL,
    ADDUSER_SUCCESS,
    ADDUSER_FAIL,
    ASSETDELETE_SUCCESS,
    ASSETDELETE_FAIL
} from "./types";

import getService from "../../services/api.service";


export const addAssets = (realm) => (dispatch) => {
    return getService.addAssets(realm).then(
        (data) => {
            dispatch({
                type: ADDASSETS_SUCCESS,
                payload: { assets : data },
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
                type: ADDASSETS_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const addAttributes = (realm) => (dispatch) => {
    return getService.addAttributes(realm).then(
        (data) => {
            dispatch({
                type: ADDATTRIBUTES_SUCCESS,
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
                type: ADDATTRIBUTES_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const addInsight = (name, type, categorie, time_frame, start_date, numberDay, realm) => (dispatch) => {
    return getService.addInsight(name, type, categorie, time_frame, start_date, numberDay, realm).then(
        (data) => {
            dispatch({
                type: ADDINSIGHT_SUCCESS,
                payload: { insight : data },
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
                type: ADDINSIGHT_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const addInsightLink = (insightId, assetId, attributeId) => (dispatch) => {
    return getService.addInsightLink(insightId, assetId, attributeId).then(
        (data) => {
            dispatch({
                type: ADDINSIGHTLINK_SUCCESS,
                payload: { insightLink : data },
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
                type: ADDINSIGHTLINK_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getChartData = (insightId, time_frame, start_date, final_date) => (dispatch) => {
    return getService.getChartData(insightId, time_frame, start_date, final_date).then(
        (data) => {
            dispatch({
                type: GETCHARTDATA_SUCCESS,
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
                type: GETCHARTDATA_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const addUser = (realm, email, firstName, lastName, password, userName, roles, serviceAccount) => (dispatch) => {
    return getService.addUser(realm, email, firstName, lastName, password, userName, roles, serviceAccount).then(
        (data) => {
            dispatch({
                type: ADDUSER_SUCCESS,
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
                type: ADDUSER_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};


export const deleteAsset = (assetId) => (dispatch) => {
    return getService.deleteAsset(assetId).then(
        (data) => {
            dispatch({
                type: ASSETDELETE_SUCCESS,
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
                type: ASSETDELETE_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};