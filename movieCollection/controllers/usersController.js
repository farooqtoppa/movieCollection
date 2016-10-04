var express = require('express');

// allows us to put our routes in seperate files
var router = express.Router();

var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie

// =====================================================
// USERS INDEX ROUTE (Shows all instances of a resource)
// =====================================================
router.get('/', function(req, res){
    User.find({}, function(err, users){
        res.render('users/index', {users: users});
    });
});


// export router
module.exports = router;
