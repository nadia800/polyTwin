const db = require("../models");
const { getRealm } = require("./get");
const insight = db.insight;
const realm = db.realm;
const insightLink = db.insight_link


const getRealmId = (realmName) => {
    const realmId = realm.findOne({
        where: {
            realmName: realmName
        }
    }).then(realm => {
        return realm.id
    }).catch(err => {
        return err.message
    })
    console.log(realmId)
    return realmId;
}

exports.addInsight = async (req, res) => {
    const realmId = await getRealmId(req.body.realm)
    insight.create({
        name: req.body.name,
        type: req.body.type,
        categorie: req.body.categorie,
        time_frame: req.body.time_frame,
        start_date: req.body.start_date,
        number_day: req.body.numberDay,
        realmId: realmId
    }).then(insight => {
        res.status(200).send({ data: insight });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.addInsightLink = (req, res) => {
    insightLink.create({
        insightId: req.body.insightId,
        assetId: req.body.assetId,
        attributeId: req.body.attributeId
        
    }).then(insightLink => {
        res.status(200).send({ message: "Insight_link was added successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}