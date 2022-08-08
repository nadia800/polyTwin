/*Authentication:
    POST /api/file/upload
    POST /api/file/import
*/


const controller = require("../controllers/upload");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/file/upload",
        controller.realmUpload
    );
    app.post("/api/file/import", controller.realmImport);
};