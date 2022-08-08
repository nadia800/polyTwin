const url = require("../config/URL.js"); //url Of OPEN REMOTE
const axios = require('axios');
const querystring = require('querystring');
const TOKEN_URL = `https://${url.URL}/auth/realms/master/protocol/openid-connect/token`; //API TOKEN OPEN REMOTE

exports.getAccessToken = () => {
    const body = {
        grant_type: 'password',
        username: 'admin',
        password: 'secret',
        client_id: 'openremote'
    }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic b3BlbnJlbW90ZTpzZWNyZXQ=',
            'Access-Control-Allow-Headers': '*'


        }
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const res = axios.post(TOKEN_URL, querystring.stringify(body), config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.message;
        });
    return res
}