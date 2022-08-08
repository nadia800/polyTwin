/* Upload File service
    getUserAPI(): POST {access_token}
*/
import axios from "axios";
import { URL } from './URL';
const API_URL = URL + "/api";




const addAssets = (realm) => {
    return axios.post(API_URL + "/addAssets", { realm })
        .then(response => {
            return response.data
        })
}

const addAttributes = (realm) => {
    return axios.post(API_URL + "/addAttributes", { realm })
        .then(response => {
            return response.data
        })
}

const addInsight = (name, type, categorie, time_frame, start_date,numberDay, realm) => {
    return axios.post(API_URL + "/addInsight", { name, type, categorie, time_frame, start_date, numberDay, realm })
        .then(response => {
            return response.data
        })
}

const addInsightLink = (insightId, assetId, attributeId) => {
    return axios.post(API_URL + "/addInsightLink", { insightId, assetId, attributeId })
        .then(response => {
            return response.data
        })
}

const getChartData = (insightId, time_frame, start_date, final_date) => {
    return axios.post(API_URL + "/getChartData", { insightId, time_frame, start_date, final_date })
        .then(response => {
            return response.data
        })
}

const addUser = (realm, email, firstName, lastName, password, userName, roles, serviceAccount) => {
    return axios.post(API_URL + "/addUserRealm", { realm, email, firstName, lastName, password, userName, roles, serviceAccount })
        .then(response => {
            return response.data
        })
}

const deleteAsset = (assetId) => {
    return axios.post(API_URL + "/deleteAsset", { assetId })
        .then(response => {
            return response.data
        })
}
export default {
    addAssets,
    addAttributes,
    addInsight,
    addInsightLink,
    getChartData,
    addUser,
    deleteAsset
    
};