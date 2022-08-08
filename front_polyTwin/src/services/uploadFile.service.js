/* Upload File service
    uploadfile(): POST {nameProject(id), categorie, subcategorie, pathWebGL, }
    importfile(): POST {username, password} & save JWT to Local Storage
    getMasterRealms(): GET 
*/
import axios from "axios";
import { URL } from './URL';
const API_URL = URL;

const uploadfile = (nameProject, currentPath) => {
    return axios.post(API_URL + "/api/file/upload", {
        nameProject,
        currentPath
    });
};

const importfile = (realm_id) => {
    return axios.post(API_URL + "/file/import", {
        realm_id
    })
        .then(response => {
            return response.data

        })
};

const getMasterRealms = () => {
    return axios.get(API_URL + "/get/master_realms")
        .then(response => {
            return response.data
        })
}

export default {
    uploadfile,
    importfile,
    getMasterRealms
};