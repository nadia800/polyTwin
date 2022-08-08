const db = require("../models");
const config = require("../config/auth.js");
const web_master = db.web_master;
const master_realm = db.master_realm;
const realm_user = db.realm_user;
const Role = db.Role
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { masterRealms } = require("./get");
const { realm } = require("../models");



exports.signup = (req, res) => {
    // Save Master_realm to Database
    master_realm.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(masterRealm => {
        if (!masterRealm) {
            master_realm.create({
                username: req.body.userName,
                email: req.body.email,
                secret: bcrypt.hashSync(req.body.password, 8),
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                phone: req.body.phone,
                jobtitle: req.body.jobTitle,
                company_name: req.body.name,
                country_name: req.body.country,
                city: req.body.city,
                state_province: req.body.state,
                postal_code: req.body.codePoste,
                roles_id: 1,
                webMasterUsername: req.body.webMasterUsername
            })
                .then(master_realm => {
                    res.status(200).send({ message: "Master Realm was registered successfully!", error: false });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        } else {
            res.status(200).send({ message: "UserName exist !", error: true });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
   
};


exports.signin = (req, res) => {
    web_master.findOne({
        where: {
            username: req.body.username
        }
    }).then(webMaster => {
            if (!webMaster) {
                master_realm.findOne({
                    where: {
                        username: req.body.username 
                    }
                }).then(masterRealm => {
                    if (!masterRealm) {
                            realm_user.findOne({
                                where: {
                                    username: req.body.username 
                                }
                            }).then(realmUser => {
                                console.log(realmUser)
                                console.log(req.body.password)
                                    if (!realmUser) {
                                        return res.status(404).send({ message: "User not found !" });
                                    } else {
                                        var passwordIsValid = bcrypt.compareSync(
                                            req.body.password,
                                            realmUser.secret
                                        );
                                        console.log(passwordIsValid)
                                        if (!passwordIsValid) {
                                            return res.status(401).send({
                                                accessToken: null,
                                                message: "Invalid Password!"
                                            });
                                        } else {
                                            var token = jwt.sign({ id: realmUser.id }, config.secret, {
                                                expiresIn: 86400 //Day 
                                            })
                                            res.status(200).send({
                                                username: realmUser.id,
                                                role_id: 2,
                                                realmName: realmUser.realm,
                                                accessToken: token
                                            });
                                        }
                                    }
                                }).catch(err => {
                                    res.status(500).send({ message: err.message })
                                })
                        } else {
                            var passwordIsValid = bcrypt.compareSync(
                                req.body.password,
                                masterRealm.secret
                            );
                            if (!passwordIsValid) {
                                return res.status(401).send({
                                    accessToken: null,
                                    message: "Invalid Password!"
                                });
                            } else {
                                var token = jwt.sign({ id: masterRealm.id }, config.secret, {
                                    expiresIn: 86400 //DAY 
                                })
                                res.status(200).send({
                                    username: masterRealm.username,
                                    role_id: masterRealm.roles_id,
                                    realmName: masterRealm.realm,
                                    accessToken: token
                                });
                            }
                        }
                    }).catch(err => {
                        res.status(500).send({ message: err.message })
                    })
                
            } else {
                
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    webMaster.secret
                );
                console.log(passwordIsValid)
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                } else {
                    var token = jwt.sign({ id: webMaster.id }, config.secret, {
                        expiresIn: 86400 //Day
                    })
                    res.status(200).send({
                        username: webMaster.username,
                        role_id: webMaster.roles_id,
                        accessToken: token
                    });
                }    
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



//create web_master
exports.createWebMaster = (req, res) => {
    web_master.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(webMaster => {
            if (!webMaster) {
                web_master.create({
                    username: req.body.username,
                    secret: bcrypt.hashSync(req.body.secret, 8),
                    roles_id: 0
                })
                    .then(webMaster => {
                        res.status(200).send({ Message: "Web Master was registered successfully!" })
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    })
            } else {
                res.status(400).send({ Message: "UserName exist deja!" })
            }
        })
   
}


