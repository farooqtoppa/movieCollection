var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;


// constructor function for mongoose
var Schema = mongoose.Schema

//Schemas
var MovieSchema = new Schema({
  title: String,
  stars: String,
  genre: String,
  year: Number,
  duration: Number,
  rated: String
});

var UserSchema = new Schema({
  username: String,
  password: String,
  movies: [MovieSchema]
});

UserSchema.plugin(passportLocalMongoose)

// Models
var UserModel = mongoose.model("User", UserSchema);
var MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = {
  User: UserModel,
  Movie: MovieModel
}
