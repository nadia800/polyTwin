const db = require("../models");
const realm = db.realm;



exports.getRealmId = (realmName) => {
    const realmId = realm.findOne({
        where: {
            realmName: realmName
        }
    }).then(realm => {
        return realm.id
    }).catch(err => {
        return err.message
    })
    return realmId;
}
