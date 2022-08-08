import {
    SET_MESSAGE,
    CHARTDELETE_SUCCESS,
    CHARTDELETE_FAIL
} from "./types";

import deleteService from "../../services/delete.service";


export const deleteChart = (chartId) => (dispatch) => {
    return deleteService.deleteChart(chartId).then(
        (data) => {
            dispatch({
                type: CHARTDELETE_SUCCESS,
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
                type: CHARTDELETE_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};