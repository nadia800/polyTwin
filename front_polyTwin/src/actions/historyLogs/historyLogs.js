import {
    GETLOGS_SUCCESS,
    GETLOGS_FAIL,
    SET_MESSAGE,
} from "./types";


import getLogsService from "../../services/getLogs.service";

export const getHistoryLogs = (level, perPage, page, startTime, finalTime, categories) => (dispatch) => {
    return getLogsService.getHistoryLogs(level, perPage, page, startTime, finalTime, categories).then(
        (data) => {
            dispatch({
                type: GETLOGS_SUCCESS,
                payload: { historyLogs : data },
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
                type: GETLOGS_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};