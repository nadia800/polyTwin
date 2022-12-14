/* Authorization:
    GET /api/test/all
    GET /api/test/user for loggedin users 
    GET /api/test/master for master
*/


const { authJwt } = require("../middleware");
const controller = require("../controllers/user.js");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );
    app.get(
        "/api/test/master",
        [authJwt.verifyToken, authJwt.isMaster],
        controller.masterBoard
    );
};