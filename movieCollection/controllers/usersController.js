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
// USER SHOW ROUTE
// ================================
router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
     //console.log(user);
    //res.send(user);
    res.render('users/show', {user: user});
  });
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

// =================================
// USER EDIT ROUTE
//==================================
router.get('/:id/edit', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.render('users/edit', {user: user});
  });
});

// =================================
// USER UPDATE ROUTE
//==================================
router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.name
    }, {new: true}, function(err, user){
        res.render('users/show', {user: user});
    });
});

// ==================================
// AUTHOR DELETE ROUTE
// ==================================
router.get('/:id/delete', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, user){
        res.redirect('/users');
    });
});

// export router
module.exports = router;
