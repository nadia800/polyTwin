/* Realm Service :
 * Add Realm to openRemote and innovatwin dataBase
*/
import axios from "axios";
import { URL } from './URL';
const API_URL = URL +"/api";

const addRealm = (id,
    nameProject,
    categorie,
    subcategorie) => {
    return axios.post(API_URL + "/addRealm", {
        id,
        nameProject,
        categorie,
        subcategorie
    }).then(response => {
        return response.data
    });
};

const pathWebGL = async (realm_id) => {
    return axios
        .post(API_URL + "path", {
            realm_id
        })
        .then((response) => {
            return response.data;
        });
}


export default {
    addRealm,
    pathWebGL
};