var express = require('express');

// allows us to put our routes in seperate files
var router = express.Router();

var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie






// export router
module.exports = router;
