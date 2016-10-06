var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Schema = require("../db/schema.js");
var User = Schema.User
var Movie = Schema.Movie


router.get('/login', function(req,res){
  res.redirect('/users');
});

// login
router.post('/login', passport.authenticate('local'),function(req,res) {
  req.session.save(function (err) {
    if(err) return next(err);
    res.redirect('/users');
  });
});

// ==============================
// USER INDEX ROUTE
// ==============================
router.get('/', (req, res) =>{
  console.log('This is the session >>>>>',req.session)
  console.log('This is req.user >>>>>',req.user)
  var query = User.find({});
  query.then(function(users) {
    res.render('users/index', {users: users, user: req.user})
  })
  .catch(function(err){
    console.log(err)
  });
});

// log out
router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/users');
});

// show all objects for testing purposes
router.get('/json', function(req, res){
  User.find(function(err, users){
    res.send(users);
  })
});

var authenticate = function(req, res, next) {
  if(!req.user || req.user._id != req.params.id) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
}

// ================================
// USER NEW ROUTE
// ================================
router.get('/new', function(req, res){
  res.render('users/new');
});

// ================================
// USER SHOW ROUTE
// ================================
router.get('/:id', authenticate,function(req, res) {
    var query = User.findById({_id: req.params.id})

    query.then(function(user) {
      res.render('users/show', {data: user, user: req.user})
    })
    .catch(function(err) {
      res.json({message: 'nope' + err});
    });
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


// export router
module.exports = router;
