const db = require("../models");
const insight = db.insight;
const insight_link = db.insight_link;

//delete insight and insight link where insightId = ID
exports.deleteChart = (req, res) => {
    console.log(req.body.chartId)
    insight_link.destroy({
        where: {
            insightId: req.body.chartId
        }
    });
    insight.destroy({
        where: {
            id: req.body.chartId
        }
    });
    res.status(200).send({ message: "Chart deleted successfully !" })
}
