import axios from "axios";
import authHeader from "./auth-header";
import { URL } from './URL';
const API_URL = URL +"/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};
const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};
const getMasterBoard = () => {
    return axios.get(API_URL + "master", { headers: authHeader() });
};

export default {
    getPublicContent,
    getUserBoard,
    getMasterBoard,
};