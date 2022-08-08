//Express framwork
var express = require("express");

/* Middleware module that extracts the entire body portion of an incoming request stream
and exposes it on req.body*/
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");


// Start express app
const app = express();
console.log("index");

// Implement CORS
app.use(cors());
// parse json
app.use(bodyParser.json());
// Set security HTTP headers
app.use(helmet());

// Routes
require('./src/routes/auth')(app);
require('./src/routes/user')(app);
require('./src/routes/upload')(app);
require('./src/routes/getData')(app);
require('./src/routes/addData')(app);
require('./src/routes/API')(app);
require('./src/routes/update')(app);
require('./src/routes/delete')(app);

module.exports = app;