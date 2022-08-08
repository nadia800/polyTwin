const db = require("../models");
const attribute = db.attribute;



// update attribute selected : true
exports.updateAttributeSelected = (req, res) => {
    let ids = req.body.ids
    attribute.update({ selected: true }, { where: { id: ids } })
        .then(response => {
            return res.status(200).send({ Message: "Attribute updated successfully" })
        })
        .catch(err => {
            return res.status(500).send({ Error: err.message })
        })
}