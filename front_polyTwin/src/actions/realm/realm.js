import {
    ADDREALM_SUCCESS,
    ADDREALM_FAIL,
    SET_MESSAGE,
} from "./types";

import realmService from "../../services/realm.service";

export const addRealm = (id,
    nameProject,
    categorie,
    subcategorie,
) => (dispatch) => {
    return realmService.addRealm(id,
        nameProject,
        categorie,
        subcategorie).then(
            (data) => {
                dispatch({
                    type: ADDREALM_SUCCESS,
                    payload: { realm : data },
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
                    type: ADDREALM_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject();
            }
        );
};