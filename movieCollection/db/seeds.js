// this file is ran seperately

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moviecollection');
var Schema = require("./schema.js");

var User = Schema.User
var Movie = Schema.Movie

// remove so same people arent added
User.remove({}, function(err){
    console.log(err)
});

Movie.remove({}, function(err){
    console.log(err)
});

// create users
var farooq = new User({username: "Farooq",});
var marc = new User({username: "Marc",});

// create movies
var movie1 = new Movie({
  title: "Toy Story",
  year: 1995,
  stars: "Tom Hanks, Tim Allen, Don Rickles",
  genre: "Animation, Adventure, Comedy",
  duration: 81,
  rated: "G"

});

var movie2 = new Movie({
  title: "The Sandlot",
  year: 1993,
  stars: "Tom Guiry, Mike Vitar, Art LaFleur ",
  genre: "Comedy, Drama, Family",
  duration: 101,
  rated: "PG"
});

var movie3 = new Movie({
  title: "The Gooines",
  year: 1985,
  stars: "Sean Astin, Josh Brolin, Jeff Cohen",
  genre: "Adventure, Comedy, Family",
  duration: 114,
  rated: "PG"
});


// add movies to both users
farooq.movies.push(movie1);
farooq.movies.push(movie3);
marc.movies.push(movie2);

// save to db
farooq.save(function(err){
  if(err){
    console.log(err)
  }
  else{
   console.log("user was saved successfully");
  }
});

marc.save(function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log("user was saved successfully");
  }
});


