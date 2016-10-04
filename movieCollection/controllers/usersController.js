var express = require('express');

// allows us to put our routes in seperate files
var router = express.Router();

var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie

// ==============================
// USER INDEX ROUTE
// ==============================
router.get('/', function(req, res){
    User.find({}, function(err, users){
        res.render('users/index', {users: users});
    });
});

// ================================
// USER NEW ROUTE
// ================================
router.get('/new', function(req, res){
    res.render('users/new');
});

// ================================
// USER CREATE ROUTE
// ================================
router.post('/', function(req, res){
  var user = new User({
    username: req.body.name,
    movies: req.body.movies
  });
  user.save(function(err, user){
    res.redirect('/users');
  });
});




// export router
module.exports = router;
