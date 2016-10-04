var express = require('express');

// allows us to put our routes in seperate files
var router = express.Router();

var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie

// ==============================
// INDEX ROUTE
// ==============================
router.get('/', function(req, res){
    User.find({}, function(err, users){
        res.render('users/index', {users: users});
    });
});

// ================================
// NEW ROUTE
// ================================
router.get('/new', function(req, res){
    res.render('users/new');
});

// ================================
// CREATE ROUTE
// ================================




// export router
module.exports = router;
