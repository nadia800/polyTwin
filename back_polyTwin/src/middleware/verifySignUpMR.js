const db = require("../models");
const ROLES = db.ROLES;
const master_realm = db.master_realm;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    master_realm.findOne({
        where: {
            username: req.body.userName
        }
    }).then(masterRealm => {
        if (masterRealm) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
    // Email
    master_realm.findOne({
            where: {
                email: req.body.email
        }
    }).then(masterRealm => {
            if (masterRealm) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
        next();
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
};
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;