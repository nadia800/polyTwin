const db = require("../models");
const user = db.realm_user;
const realm = db.realm;
const master_realm = db.master_realm;
const insight_link = db.insight_link;
const asset = db.asset;
const attribute = db.attribute;
const WebSocket = require('ws');
const axios = require('axios');
var bcrypt = require("bcryptjs");
const url = require("../config/URL.js");
const { insight } = require("../models");
const { getAccessToken } = require('./token.js');
const { getRealmId } = require('./realmId.js');
const GET_USER_URL = `https://${url.URL}/api/master/user/query`
const REALM_URL = `https://${url.URL}/api/master/realm`







const getUserAPI = async () => {
    const Token = await getAccessToken();
    const AccessToken = Token.access_token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params: {
            access_token: AccessToken
        }
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    return axios.post(GET_USER_URL, null , config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.message
        });
}


//Add user data base
exports.addUsers = async (req, res) => {
    const UserData = await getUserAPI();
    for (var i = 0; i < UserData.length; i++) {
        user.create({
            id: UserData[i].id,
            firstName: UserData[i].firstName,
            lastName: UserData[i].lastName,
            username: UserData[i].username,
            created_at: UserData[i].createdOn,
            realmId: UserData[i].realmId,
            realm: UserData[i].realm,
            //secret
        }).then(response => {
            res.status(200).send({ message:"User was added successfully!" });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
}

exports.getToken =  (req, res) => {
    getAccessToken()
        .then(response => {
            res.status(200).send({ Token: response });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });;
        });
}

//Get Assets
const getAssets = async (realm) => {
    const data = `REQUESTRESPONSE:{"event":{"eventType":"read-assets","assetQuery":{"realm":{"name":"${realm}"},"select":{"attributes":[]}}},"messageId":"1657834248130.7952"}`;
    const token = await getAccessToken();
    const ASSET_URL = `wss://${url.URL}/websocket/events?Realm=master&Authorization=Bearer ${token.access_token}`;
    return new Promise(function (resolve, reject) {
        const ws = new WebSocket(ASSET_URL);
        ws.onopen = function () {
            console.log("connected");
            ws.send(data)
           
        };
        ws.onmessage = (e) => {
            console.log(e.data)
            const data = e.data.substr(16)
            resolve(JSON.parse(data).event);
        }
        ws.onerror = function (err) {
            console.log(`WebSocket error: ${err}`)
            reject(err);
        };
        ws.onclose = () => {
            console.log('disconnected')
        }

    });
    
        
}
//Update Innovatwin dataBase with Assets
exports.addAssets = async (req, res) => {
    const realmId = await getRealmId(req.body.realm)
    getAssets(req.body.realm).then(response => {
                for (var i = 0; i < response.assets.length; i++) {
                    const { id, name, version, type, createdOn, realm, accessPublicRead } = response.assets[i]
                    asset.create({
                        id: id,
                        name: name,
                        version: version,
                        type: type,
                        createdOn: createdOn,
                        realmId: realmId,
                        accessPublicRead: accessPublicRead
                    }).then(asset => {
                        console.log("ok")
                    }).catch(err => {
                        console.log(err)
                    })
                }
        return res.status(200).send({ Message: response });
    }).catch((err) => {
         return res.status(400).send({ Message: err });
    });
    
}
//Get Attributes
const getAttributes = async (assetId) => {
    const token = await getAccessToken();
    const data = `REQUESTRESPONSE:{"messageId":"read-assets:${assetId}:AssetEvent1","event":{"eventType":"read-assets","assetQuery":{"ids":["${assetId}"]}}}`
    const ASSET_URL = `wss://${url.URL}/websocket/events?Realm=master&Authorization=Bearer ${token.access_token}`;
    return new Promise(function (resolve, reject) {
        const ws = new WebSocket(ASSET_URL);
        ws.onopen = function () {
            console.log("connected");
            ws.send(data)

        };
        ws.onmessage = (e) => {
            const data = e.data.substr(16)
            resolve(JSON.parse(data).event.assets);
        }
        ws.onerror = function (err) {
            console.log(`WebSocket error: ${error}`)
            reject(err);
        };
        ws.onclose = () => {
            console.log('disconnected')
        }

    });
}
//Add Attributes to Innovatwin database
exports.AddAttributes = async (req, res) => {
    const realmId = await getRealmId(req.body.realm)
    asset.findAll({
        realmId : realmId
    }).then(asset => {
        for (var i = 0; i < asset.length; i++) {
            const assetId = asset[i].id;
            getAttributes(assetId).then(async (response) => {
                const listAttribute = response[0].attributes
                for (var j in listAttribute) {
                    //attribute existe déja ou nn
                    let attributeDB = await attribute.findOne({
                        where: {
                            name: listAttribute[j].name,
                            assetId: assetId
                        }
                    });
                    if (!attributeDB) {
                            attribute.create({
                                name: listAttribute[j].name,
                                type: listAttribute[j].type,
                                created_at: listAttribute[j].timestamp,
                                value: listAttribute[j].value,
                                assetId: assetId
                            }).then(attribute => {
                                console.log(attribute)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    else {
                        console.log("attribute existe deja")
                    }
                }
            
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        return res.status(500).send({ Message: err });
    })
    return res.status(200).send({ Message: "Atributes added successfully" });
}

//Create Realm openRemote
const createRealm = async (id, realm, friendlyName) => {
    const token = await getAccessToken();
    const body = {
        id: id,
        name: realm,
        displayName: friendlyName,
        enabled: true,
        notBefore: 0,
        resetPasswordAllowed: true,
        duplicateEmailsAllowed: true,
        rememberMe: true,
        registrationAllowed: true,
        registrationEmailAsUsername: true,
        verifyEmail: true,
        loginWithEmail: true,
        loginTheme: "string",
        accountTheme: "string",
        adminTheme: "string",
        emailTheme: "string",
        accessTokenLifespan: 0,
        realmRoles: [
            {
                name: "string",
                description: "string"
            }
        ]
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            access_token: token.access_token
        }
    };
    console.log(REALM_URL)
   const res = axios.post(REALM_URL ,body, config)
        .then(response => {
            console.log(response)
            //res.status(200).send({ Message: response.data });
            return response.data
        })
        .catch(err => {
            console.log(err)
            //res.status(400).send({ Message: err.message });
            return err.message;
        });
   
   return res
}

//Add realm created to Innovatwin Data Base
exports.addRealm = async (req, res) => {
    realm.findOne({
        where: {
            id: req.body.id
        }
    }).then(realmDB => {
        if (!realmDB) {
            createRealm(req.body.id, req.body.nameProject, req.body.nameProject)
                .then(response => {
                    realm.create({
                        id: req.body.id,
                        realmName: req.body.nameProject,
                        friendlyName: req.body.nameProject,
                        categorie: req.body.categorie,
                        subcategorie: req.body.subcategorie
                    }).then(response => {
                        res.status(200).send({ Message: "Realm added successfully ! " });
                    }).catch(err => {
                        res.status(400).send({ Message: err.message });
                    })
                })
                .catch(err => {
                    res.status(400).send({ Message: err.message });
                })
        } else {
            res.status(200).send({ Message: "Realm id exist ! " , error: true});
        }
    }).catch(err => {
        res.status(400).send({ Message: err.message });
    })
    
    
}


//Create Master Realm in OpenRemote dataBase belong to Realm Created
const createMasterRealm = async (realm, email, firstName, lastName, userName, password) => {
    console.log(email)
    const USER_URL = `https://${url.URL}/api/master/user/${realm}/users`;
    const token = await getAccessToken();
    const body = {
        "email": `${email}`,
        "enabled": true,
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "loaded": true,
        "password": `${password}`,
        "previousRealmRoles": [],
        "previousRoles": [],
        "realm": realm,
        "realmRoles": [],
        "roles": [
            {
                "assigned": true,
                "composite": true,
                "compositeRoleIds": [
                    "08a3fd6d-11db-491d-8394-29e99ed1224a",
                    "e452abcd-d852-4d36-896a-abe5e641d2bd",
                    "153d154a-cc5d-4c88-8805-c7084c3f121d",
                    "8da245a3-60b7-43ef-be84-bdcb81a055ca",
                    "ca79047c-d8eb-42fb-bfb4-0ae9795a9e20",
                    "dbdd511e-bd28-4e32-ab54-b5d07ac78272"
                ],
                "description": "Read all data",
                "id": "cb2242cb - 87e7 - 4500 - 99ed- 891d48b6fbd8",
                "name": "read"
            },
            {
                "assigned": true,
                "composite": true,
                "compositeRoleIds": [
                    "08a3fd6d-11db-491d-8394-29e99ed1224a",
                    "b30f6907-82e7-4efc-ac41-002cf5525144",
                    "e452abcd-d852-4d36-896a-abe5e641d2bd",
                    "34549da2-26a7-4a32-a211-5031d84a24e1",
                    "153d154a-cc5d-4c88-8805-c7084c3f121d",
                    "8da245a3-60b7-43ef-be84-bdcb81a055ca",
                    "d09993d1-1c76-4dc7-8737-9c858abeb129",
                    "f960268b-e00d-486f-97a2-7fb6c6a3a421",
                    "03a161e1-ec2e-4ac5-9244-a3419d6eab59",
                    "ca79047c-d8eb-42fb-bfb4-0ae9795a9e20",
                    "e79d129f-5f2d-4a29-baa6-55b9330098b7",
                    "dbdd511e-bd28-4e32-ab54-b5d07ac78272"
                ],
                "description": "Write all data",
                "id": "666b41eb-545f-48f5-b94c-840f61681b7e",
                "name": "write"
            }
        ],
        "userAssetLinks": [],
        "serviceAccount": false,
        "username": `${userName}`
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }
    }
    const res = axios.post(USER_URL, body, config)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err.message;
        });
    return res;
}
//Add Master Realm to Innovatwin dataBase belong to Realm Created
exports.addMasterRealm = async (req, res) => {
    const realm = req.body.realm;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const userName = req.body.userName;
    console.log(realm)
    createMasterRealm(realm, email, firstName, lastName, userName, password)
        .then(response => {
            // Save Master_realm to Database
            console.log(response);
            var serviceAccount = "";
            if (response.serviceAccount) {
                serviceAccount = "Regular User"
            } else {
                serviceAccount = "Service User"
            }
            master_realm.create({
                id: response.id,
                realm: realm,
                username: userName,
                email: email,
                secret: bcrypt.hashSync(req.body.password, 8),
                firstname: firstName,
                lastname: lastName,
                phone: req.body.phone,
                jobtitle: req.body.jobTitle,
                company_name: req.body.nameCompany,
                country_name: req.body.country,
                city: req.body.city,
                state_province: req.body.state,
                postal_code: req.body.posteCode,
                roles_id: 1,
                serviceAccount: serviceAccount
            })
                .then(master_realm => {
                    res.status(200).send({ message: "Master Realm was registered successfully!" });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(400).send({ Message: err.message })
        })
}

//Create Service user and regular user in openRemote and added to innovatwin dataBase
const createUserRealm = async (realm, email, firstName, lastName, userName, password, roles, serviceAccount) => {
    const USER_URL = `https://${url.URL}/api/master/user/${realm}/users`;
    const token = await getAccessToken();
    const body = {
        email: email,
        enabled: true,
        firstName: firstName,
        lastName: lastName,
        loaded: true,
        password: password,
        previousRealmRoles: [],
        previousRoles: [],
        realm: realm,
        realmRoles: [],
        roles: roles,
        userAssetLinks: [],
        serviceAccount: serviceAccount,
        username: userName
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }
    }
    const res = axios.post(USER_URL, body, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.message;
        });
    return res
}
//Add Usser Realm to Innovatwin dataBase belong to Realm Created
exports.addUserRealm = async (req, res) => {
    const realm = req.body.realm;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const userName = req.body.userName;
    const roles = req.body.roles;
    //Edit table roles 
    //Add to table roles and return id 
    const serviceAccount = req.body.serviceAccount;
    createUserRealm(realm, email, firstName, lastName, userName, password, roles, serviceAccount)
        .then(response => {
            // Save User_realm to Database
            user.create({
                id: response.id,
                realm: realm,
                username: userName,
                email: email,
                secret: bcrypt.hashSync(req.body.password, 8),
                firstname: firstName,
                lastname: lastName,
                roleId: roles,
                serviceAccount: serviceAccount
            })
                .then(user => {
                    res.status(200).send({ message: "Realm User was registered successfully!" });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(400).send({ Message: err.message })
        })
}

const getAttributeDataOpenRemote = async (assetId, attributeName, interval, fromTime, toTime) => {
    const token = await getAccessToken();
    const ATTRIBUTE_URL = `https://${url.URL}/api/master/asset/datapoint/${assetId}/attribute/${attributeName}?interval=${interval}&fromTimestamp=${fromTime}&toTimestamp=${toTime}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }
    }

    const res = axios.get(ATTRIBUTE_URL, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.message;
        });
    return res

}

//get attributeName, assetId, interval , fromTime, toTime from insightId
//get attributesId List where insightId = id
const getAttributesId = (insightId) => {
    const attributesId = insight_link.findAll({
        where: {
            insightId: insightId
        }
    }).then(insightsLink => {
        const List = []
        for (var i in insightsLink) {
            List.push(insightsLink[i].attributeId)
        }
        return List
    }).catch(err => {
        return err.message
    })
    return attributesId;
}
//get assetId and attributeName for each attributeId
const getAttributeData = (attributeId) => {
    console.log(attributeId)
    const data = attribute.findOne({
        where: {
            id: attributeId
        }
    }).then(attribute => {
        return { assetId: attribute.assetId, attributeName: attribute.name }
    }).catch(err => {
        return { message: err.message }
    })
    return data
}

exports.getChartData = async (req, res) => {
    const insightId = req.body.insightId;
    const interval = req.body.time_frame;
    const fromTime = req.body.start_date;
    const toTime = req.body.final_date;
    const attributesValue = [];
    const attributesId = await getAttributesId(insightId);
    for (var i in attributesId) {
        const attributeData = await getAttributeData(attributesId[i]);
        const attributeValue = await getAttributeDataOpenRemote(attributeData.assetId,
            attributeData.attributeName,
            interval,
            fromTime,
            toTime
        )
        attributesValue.push({ attributeId: attributesId[i], attributeName: attributeData.attributeName, values: attributeValue })
    }
    return res.status(200).send({ data: attributesValue })
    
}


//delete asset from openRemote
const deleteAssetOR = async (assetId) => {
    const token = await getAccessToken();
    const DELETE_ASSET_URL = `https://${url.URL}/api/master/asset?assetId=${assetId}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }
    }

    const res = axios.delete(DELETE_ASSET_URL, config)
        .then(response => {
            return response
        })
        .catch(err => {
            return err.message;
        });
    return res
}

//delete asset and attributes from Innovatwin database
exports.deleteAsset = async (req, res) => {
    const response = deleteAssetOR(req.body.assetId);
    attribute.destroy({
        where: {
            assetId: req.body.assetId
        }
    });
    asset.destroy({
        where: {
            id: req.body.assetId
        }
    });
    res.status(200).send({ message : "asset and attribute deleted successfully !"})

}