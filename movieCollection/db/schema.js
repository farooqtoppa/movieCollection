var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// constructor function for mongoose
var Scehma = mongoose.Schema

//Schemas
var MovieSchema = new Schema({
  title: String,
  actors: String,
  genre: String,
  released: String
});

var UserSchema = new Schema({
  username: String,
  password: String,
  movies: [MovieSchema]
});

// Models
var UserModel = mongoose.model("User", UserSchema);
var MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = {
  User: UserModel,
  Movie: MovieModel
}
