/* OPENREMOTE API:
    POST /api/user/token
*/

const controller = require("../controllers/openRemoteAPI.js");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/userRealm", controller.addUsers);
    app.get("/api/token", controller.getToken);
    //app.post("/api/assets", controller.getAssets);
    app.post("/api/addAssets", controller.addAssets);
    //app.post("/api/createRealm", controller.createRealm)
    app.post("/api/addRealm", controller.addRealm);
    app.post("/api/addAttributes", controller.AddAttributes)
    //app.post("/api/createMasterRealm", controller.createMasterRealm)
    app.post("/api/addMasterRealm", controller.addMasterRealm);
    app.post("/api/addUserRealm", controller.addUserRealm);
    app.post("/api/getChartData", controller.getChartData);
    app.post("/api/deleteAsset", controller.deleteAsset);

};