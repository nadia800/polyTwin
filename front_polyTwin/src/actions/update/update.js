import {
    SET_MESSAGE,
    UPDATE_SUCCESS,
    UPDATE_FAIL
} from "./types";


import updateService from "../../services/update.service";


export const updateAttributes = (ids) => (dispatch) => {
    return updateService.updateAttributeSelected(ids).then(
        (data) => {
            dispatch({
                type: UPDATE_SUCCESS,
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
                type: UPDATE_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};