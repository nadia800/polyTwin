import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    GETMASTER_SUCCESS,
    GETMASTER_FAIL,
    SET_MESSAGE,
} from "./types";
import UploadFileService from "../../services/uploadFile.service";

export const uploadfile = (nameProject,
    friendlyNameProject,
    categorie,
    subcategorie,
    pathWebGl,
    userName
) => (dispatch) => {
    return UploadFileService.uploadfile(nameProject,
            friendlyNameProject,
            categorie,
            subcategorie,
            pathWebGl,
            userName).then(
                (response) => {
                    dispatch({
                        type: UPLOAD_SUCCESS,
                    });
                    dispatch({
                        type: SET_MESSAGE,
                        payload: response.data.message,
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
                        type: UPLOAD_FAIL,
                    });
                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject();
                }
            );
};

export const importfile = (realm_id) => (dispatch) => {
    return UploadFileService.importfile(realm_id).then(
        (data) => {
            dispatch({
                type: IMPORT_SUCCESS,
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
                type: IMPORT_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const getmaster_realms = () => (dispatch) => {
    return UploadFileService.getMasterRealms().then(
        (data) => {
            dispatch({
                type: GETMASTER_SUCCESS,
                payload: { usernames : data },
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
                type: GETMASTER_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};