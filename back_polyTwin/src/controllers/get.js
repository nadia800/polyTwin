const db = require("../models");
const master_realm = db.master_realm;
const insight = db.insight;
const asset = db.asset;
const attribute = db.attribute;
const realm = db.realm;

//GET all master realms 
exports.masterRealms = (req, res) => {
    master_realm.findAll({}).then(masterRealms => {
        if (!masterRealms) {
            return res.status(404).send({ message: "Table Master realms is empty!" })
        } else {
            var masterR_username = [];
            for (var i = 0; i < masterRealms.length; i++) {
                masterR_username.push(masterRealms[i].username)
            }
            res.status(200).send({ data: masterR_username })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

const getRealmId = (realmName) => {
    const realmId = realm.findOne({
        where: {
            realmName : realmName
        }
    }).then(realm => {
        return realm.id
    }).catch(err => {
        return err.message
    })
    return realmId;
}

//GET allcategories from insights table where realm_id 
exports.allCategories = async (req, res) => {
    const realmId = await getRealmId(req.query.realmName)
    insight.findAll({
        where: {
            realmId: realmId
        }
    }).then(insights => {
        if (!insights) {
            return res.status(200).send({ message: "Table insights is empty" })
        } else {
            console.log(insights)
            var categorieList = [];
            for (var i = 0; i < insights.length; i++) {
                categorieList.push(insights[i].categorie)
            }
            res.status(200).send({ data: categorieList })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

//GET allchart from insights table where realm_id and categorie
exports.allCharts = async (req, res) => {
    const realmId = await getRealmId(req.query.realmName)
    insight.findAll({
        where: {
            realmId: realmId,
            categorie: req.query.categorie
        }
    }).then(insights => {
        if (!insights) {
            return res.status(200).send({ message: "No charts existing" })
        } else {
            res.status(200).send({ data: insights })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

//Get All Assets from dataBase where realmId = "realm"

exports.allAsset = async (req, res) => {
    if (req.body.realm === "master") {
        asset.findAll().then(asset => {
            if (!asset) {
                return res.status(200).send({ Message: "No assets existing" })
            } else {
                return res.status(200).send({ data: asset })
            }
        }).catch(err => {
            return res.status(500).send({ Error: err.message })
        })
    } else {
        const realmId = await getRealmId(req.body.realm)
        asset.findAll({
            where: {
                realmId: realmId
            }
        }).then(asset => {
            if (!asset) {
                return res.status(200).send({ Message: "No assets existing" })
            } else {
                return res.status(200).send({ data: asset })
            }
        }).catch(err => {
            return res.status(500).send({ Error: err.message })
        })
    }
    
}

//Get All Attributes from dataBase where realmId = "realm"

exports.allAttributes = (req, res) => {
    attribute.findAll({
        where: {
            assetId: req.body.assetId
        }
    }).then(attribute => {
        if (!attribute) {
            return res.status(200).send({ Message: "No attribute existing" })
        } else {
            return res.status(200).send({ data: attribute })
        }
    }).catch(err => {
        return res.status(500).send({ Error: err.message })
    })

}

//Get realm from master_realms where id 
exports.getRealm = (req, res) => {
    master_realm.findAll({
        where: {
            username: req.body.username
        }
    }).then(masterRealm => {
        realm.findAll({
            where: {
                realmName: masterRealm[0].realm
            }
        }).then(realm => {
            return res.status(200).send({ data: realm })
        }).catch(err => {
            return res.status(500).send({ Error: err.message })
        })
    }).catch(err => {
        return res.status(500).send({ Error: err.message })
    })    
}

//Get all realm 
exports.getAllRealms = (req, res) => {
    realm.findAll()
        .then(realms => {
            return res.status(200).send({ data: realms })
        })
        .catch(err => {
            return res.status(500).send({ Error: err.message })
        })
}


//Get all charts where realm = realmName
exports.getAllChart = async (req, res) => {
    const realmId = await getRealmId(req.query.realmName)
    insight.findAll({
        where: {
            realmId: realmId
        }
    }).then(insights => {
        return res.status(200).send({ data: insights })
    }).catch(err => {
        return res.status(500).send({ Error: err.message })
    })
}