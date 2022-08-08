/* Upload File service
    getCategorie(): GET {realm_id}
    getSubCategorie(): GET {realm_id}
*/
import axios from "axios";
import { URL } from './URL';
const API_URL = URL + "/api";

const getCategorie = (realmName) => {
    return axios.get(API_URL + "/get/allCategories", { params: { realmName : realmName } })
        .then(response => {
            return response.data
        })
}

const getSubCategorie = (realm_id) => {
    return axios.get(API_URL + "/get/subcategorie", { params: { realm_id: realm_id } })
        .then(response => {
            return response.data
        })
}

const getChart = (realmName, categorie) => {
    return axios.get(API_URL + "/get/allCharts", { params: { realmName: realmName, categorie: categorie } })
        .then(response => {
            return response.data
        })
}

const getAllAttributes = (assetId) => {
    return axios.post(API_URL + "/get/allAttributes", { assetId })
        .then(response => {
            return response.data
        })
}

const getAllAssets = (realm) => {
    return axios.post(API_URL + "/get/allAssets", { realm})
        .then(response => {
            return response.data
        })
}

const getToken = () => {
    return axios.get(API_URL + "/token")
        .then(response => {
            return response.data
        })
}

const getRealm = (username) => {
    return axios.post(API_URL + "/get/realm", { username })
        .then(response => {
            return response.data
        })
}

const getAllRealms = () => {
    return axios.get(API_URL + "/get/allRealms")
        .then(response => {
            return response.data
        })
}

const getAllCharts = (realmName) => {
    return axios.get(API_URL + "/getAllCharts", { params: { realmName: realmName } })
        .then(response => {
            return response.data
        })
}


export default {
    getCategorie,
    getSubCategorie,
    getChart,
    getAllAttributes,
    getToken,
    getAllAssets,
    getRealm,
    getAllRealms,
    getAllCharts
};