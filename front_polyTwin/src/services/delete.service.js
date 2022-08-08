import axios from "axios";
import { URL } from './URL';
const API_URL = URL + "/api";




const deleteChart = (chartId) => {
    return axios.post(API_URL + "/delete/chart", { chartId })
        .then(response => {
            return response.data
        })
}

export default {
    deleteChart,
    

};