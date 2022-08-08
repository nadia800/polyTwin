/*Get Data:
    GET /api/get/masterRealms
    GET /api/get/categories
    GET /api/get/subcategories
*/


const controller = require("../controllers/get");
const { getHistoryLogs } = require("../controllers/getLogs")
const { getExportData, exportData } = require("../controllers/getExportData")


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/get/master_realms",
        controller.masterRealms
    );
    app.get("/api/get/allCategories", controller.allCategories);
    app.get("/api/get/allCharts", controller.allCharts);
    //app.get("/api/get/subcategories", controller.subcategories);
    app.post("/api/get/allAssets", controller.allAsset);
    app.post("/api/get/allAttributes", controller.allAttributes);
    app.post("/api/get/realm", controller.getRealm);
    app.get("/api/get/allRealms", controller.getAllRealms);
    app.post("/api/get/historyLogs", getHistoryLogs)
    app.get('/api/get/exportData', getExportData);
    app.get('/api/get/export', exportData);
    app.get("/api/getAllCharts", controller.getAllChart);
};