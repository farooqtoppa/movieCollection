var express = require('express');
var passport = require('passport');

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

router.get('/logout', function(req, res){
  req.logout();
  console.log(req.user);
  res.redirect('/users');

});

// login
router.post('/login', passport.authenticate('local-login', {
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
     //console.log(user);
    //res.send(user);
    res.render('users/show', {user: user});
  });
}
  else{
    res.redirect('/users')
  }

  //req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;

});

// ================================
// USER CREATE ROUTE
// ================================

// user create -- signup
router.post('/', passport.authenticate('local-signup', {
    failureRedirect: '/users' }), function(req, res) {
    //success redirect goes to show page
    console.log(req.user);
    res.redirect('/users/' + req.user.id);
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

// REMOVE A MOVIE
router.delete('/:userId/movies/:id', function (req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull: {
      movies: {_id: req.params.id}
    }
  }, function(err) {
    res.redirect(`/users/${req.params.userId}`);
  });
});

// middleware to check login status
// used in show route
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
