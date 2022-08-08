const url = require("../config/URL.js"); //url Of OPEN REMOTE
const LOGS_URL = `https://${url.URL}/api/master/syslog/event`;//API HISTORY LOGS OPEN REMOTE
const { getAccessToken } = require('./token.js');
const axios = require('axios');


exports.getHistoryLogs = async (req, res) => {
    const token = await getAccessToken();
    const level = req.body.level; 
    const perPage = req.body.perPage;
    const page = req.body.page;
    const startTime = req.body.startTime;
    const finalTime = req.body.finalTime;
    const categories = req.body.categories;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token.access_token}`
        },
        params: {
            level: level,
            per_page: perPage,
            page: page,
            from: startTime,
            to: finalTime,
            category: categories
        }
    }
    axios.get(LOGS_URL, config)
        .then(response => {
            return res.status(200).send({ data : response.data})
        })
        .catch(err => {
            return res.status(400).send({ message: err.message })
        });
}

