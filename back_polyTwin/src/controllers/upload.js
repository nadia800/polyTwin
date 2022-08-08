const db = require("../models");
const realm = db.realm;
const master_realm = db.master_realm;
var fs = require("fs-extra");
const path = require('path');
const file = import('move-file');


//Upload d'un realm(Project) 
exports.realmUpload = (req, res) => {
    //Move file from currentpath to public 
    // directory path
    const destination = `../front_openremote/public/${req.body.nameProject}`;
    var source = `../../${req.body.currentPath}`

    // copy source folder to destination
    fs.copy(source, destination, function (err) {
        if (err) {
            console.log('An error occured while copying the folder.')
            return res.status(400).send({ message: err })
        }
        return res.status(200).send({ message: "copied" })
    });

}

//Import d'un realm(project)
exports.realmImport = (req, res) => {
    realm.findOne({
        where: {
            id: req.body.realm_id
        }
    }).then(realm => {
        if (!realm) {
            return res.status(404).send({ message: "realm not found!" })
        } else {
            res.status(200).send({ pathWebGL: realm.pathWebGL })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message })
    })
}