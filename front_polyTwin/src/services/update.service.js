


import axios from "axios";
import { URL } from './URL';
const UPDATE_URL = URL + '/api/update'



const updateAttributeSelected = (ids) => {
    return axios.post(UPDATE_URL + "/attributeSelected", { ids })
}

export default {
    updateAttributeSelected
}