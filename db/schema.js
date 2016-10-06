var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt-nodejs');

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
  email: String,
  password: String,
  movies: [MovieSchema]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// Models
var UserModel = mongoose.model("User", UserSchema);
var MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = {
  User: UserModel,
  Movie: MovieModel
}
