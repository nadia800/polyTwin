import axios from "axios";
import { URL } from './URL';
const API_URL = URL + "/api";


const getHistoryLogs = (level, perPage, page, startTime, finalTime, categories) => {
    return axios.post(API_URL + "/get/historyLogs", { level, perPage, page, startTime, finalTime, categories })
        .then(response => {
            return response.data
        })
}

export default {
    getHistoryLogs
}