//Managing Environment Variables in Node.js 
const dotenv = require("dotenv");
const http = require("http");


dotenv.config({ path: "./config.env" });
const app = require("./index");
const server = http.createServer(app);

const db = require("./src/models/index");
const Role = db.role;

//force = true => to drop the oldest table
db.sequelize.sync({ force: false }).then(() => {
    console.log('Resync Db');
});

function initial() {
    Role.create({
        id: 0,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: true,
        add_User: true
    });

    Role.create({
        id: 1,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: false,
        add_User: true
    });

    Role.create({
        id: 2,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: false,
        add_User: false,
    });

    Role.create({
        id: 3,
        add_insights: false,
        modify_insights: false,
        access_backend: true,
        add_project: false,
        add_User: false,
    });
}


const port = process.env.PORT;

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
 });