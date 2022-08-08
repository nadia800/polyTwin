/*Authentication:
    POST /api/auth/signup
    POST /api/auth/signin
    POST /api/auth/createWebMaster
*/

const { verifySignUpMR } = require("../middleware");
const controller = require("../controllers/auth");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            verifySignUpMR.checkDuplicateUsernameOrEmail,
            verifySignUpMR.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/createWebMaster", controller.createWebMaster);
};