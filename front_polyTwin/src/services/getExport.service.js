import axios from "axios";
import { URL } from './URL';
const API_URL = URL+ "/api"; 


const getExportData = (assetId, name) => {
    return axios.get(API_URL + "/get/exportData", { params: { assetId: assetId, attributeName : name }})
        .then(response => {
            return response.data
        })
}

const exportData = (id, name, fromTimestamp, toTimestamp) => {
    return axios.get(API_URL + "/get/export", { params: { id: id, name: name, fromTimestamp: fromTimestamp, toTimestamp: toTimestamp, responseType: 'blob' } })
        .then(response => {
            console.log(response)
            return response.blob()
        })
}

export default {
    getExportData,
    exportData
}