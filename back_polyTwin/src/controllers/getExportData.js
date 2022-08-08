const url = require("../config/URL.js"); //url Of OPEN REMOTE
var DATAPOINT_URL = `https://${url.URL}/api/master/asset/datapoint/periods`;//API OPEN REMOTE TO GET PERIODS OF EXPORT ATTRIBUTE

const { getAccessToken } = require('./token.js');
const axios = require('axios');


exports.getExportData = async (req, res) => {
    const token = await getAccessToken();
  
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        },
        params: {
            assetId: req.query.assetId,
            attributeName: req.query.attributeName
        }
    }
    axios.get(DATAPOINT_URL, config)
        .then(response => {
            return res.status(200).send({ data: response.data })
        })
        .catch(err => {
            return res.status(400).send({ message: err.message })
        });
}

exports.exportData = async (req, res) => {
    const token = await getAccessToken();
    var EXPORT_URL = `https://${url.URL}/api/master/asset/datapoint/export?attributeRefs=[{"id":"${req.query.id}","name":"${req.query.name}"}]`;//API OPEN REMOTE TO EXPORT DATA
    const config = {
        headers: {
            'Accept': 'application / json, text/ plain, */*',
            'Authorization': `Bearer ${token.access_token}`
        },
        params: {
            fromTimestamp: req.query.fromTimestamp,
            toTimestamp: req.query.toTimestamp
        }
    }
    axios.get(EXPORT_URL, config)
        .then(response => {
            return res.status(200).send({ data:response.data })
        })
        .catch(err => {
            return res.status(400).send({ message: err.message })
        });
}