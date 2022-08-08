/* Authentication service
    register(): POST {username, email, password}
    login(): POST {username, password} & save JWT to Local Storage
    logout(): remove JWT from Local Storage
*/
import axios from "axios";
import { URL } from './URL';
const API_URL = URL +"/api";

const register = (userName,
    realm,
    email,
    password,
    firstName,
    lastName,
    phone,
    jobTitle,
    nameCompany,
    country,
    city,
    state,
    posteCode
) => {
    return axios.post(API_URL + "/addMasterRealm", {
        userName,
        realm,
        email,
        password,
        firstName,
        lastName,
        phone,
        jobTitle,
        nameCompany,
        country,
        city,
        state,
        posteCode
    });
};

const login = async (username, password) => {
    return axios
        .post(API_URL + "/auth/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};