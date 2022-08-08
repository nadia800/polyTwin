import {
    GETEXPORT_SUCCESS,
    GETEXPORT_FAIL,
    EXPORT_SUCCESS,
    EXPORT_FAIL,
    SET_MESSAGE,
} from "./types";


import getExportService from "../../services/getExport.service";

export const getExportData = (assetId, name) => (dispatch) => {
    return getExportService.getExportData(assetId, name).then(
        (data) => {
            dispatch({
                type: GETEXPORT_SUCCESS,
                payload: { exportData : data },
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
                type: GETEXPORT_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const exportData = (id ,name , fromTimestamp, toTimestamp) => (dispatch) => {
    return getExportService.exportData(id, name, fromTimestamp, toTimestamp).then(
        (data) => {
            dispatch({
                type: EXPORT_SUCCESS,
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
                type: EXPORT_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};