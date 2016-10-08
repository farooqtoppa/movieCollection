var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie

// ==============================
// USER INDEX ROUTE
// ==============================
router.get('/', function(req, res){
  User.find({}, function(err, users){
  console.log('This is the session >>>>>',req.session)
  console.log('This is req.user >>>>>',req.user)
    res.render('users/index', {users: users});
  });
});

// ===============================
// LOG OUT ROUTE
// ===============================
router.get('/logout', function(req, res){
  req.logout();
  console.log(req.user);
  res.redirect('/users');

});

// ===============================
// LOG IN ROUTE
// ===============================
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users' }), function(req, res) {
      console.log("logged in user ",req.user);
    // success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});

// show all objects for testing purposes
router.get('/json', function(req, res){
  User.find(function(err, users){
    res.send(users);
  })
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
router.get('/:id',isLoggedIn, function(req, res){
if(req.params.id == req.user.id){
  User.findById(req.params.id, function(err, user){
    res.render('users/show', {user: user});
  });
}
  else{
    res.redirect('/users')
  }
});

// ================================
// USER CREATE ROUTE
// ================================
router.post('/', function(req, res){
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    function(err, user) {
      if(err) return res.json({user: user});
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
// USER DELETE ROUTE
// ==================================
router.get('/:id/delete', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/users');
  });
});

// ==================================
// MOVIE CREATE ROUTE
// ==================================
router.post('/:id/movies', function(req, res){
  User.findById(req.params.id, function(err, user){
    user.movies.push(new Movie({
      title: req.body.title,
      stars: req.body.stars,
      genre: req.body.genre,
      year: req.body.year,
      duration: req.body.duration,
      rated: req.body.rated
    }))
    user.save(function(err){
      res.redirect(`/users/${user.id}`);
    });
  });
});

// ===============================
// REMOVE A MOVIE
// ===============================
router.delete('/:userId/movies/:id', function (req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull: {
      movies: {_id: req.params.id}
    }
  }, function(err) {
    res.redirect(`/users/${req.params.userId}`);
  });
});

// =============================
// CHECKS LOG IN STATUS
// =============================
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
      return next();
  } else {
      res.redirect('/users');
  }
}

// export router
module.exports = router;
