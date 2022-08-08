/*Add data to data base:
    POST /api/add/insight
*/

const controller = require("../controllers/add");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/addInsight", controller.addInsight);
    app.post("/api/addInsightLink", controller.addInsightLink);
};