//====================================
// REQUIRE MODULES
//====================================
var express         = require('express');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var hbs             = require('hbs');
var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;
var methodOverride = require('method-override');
var session         = require('express-session');
var morgan = require('morgan');
var flash = require('connect-flash');
var User = require('./db/schema.js').User
// Instantiate new Express app:
var app             = express();

//Specify Mongo database
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/moviecollection';
mongoose.connect(mongoURI);


//====================================
// MIDDLE WARE
//====================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "hbs");

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUnintialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public')); // for css


// create a usersController
var usersController = require("./controllers/usersController.js");
app.use('/users', usersController);

// route route
app.get('/', function(req, res){
  res.redirect('/users');
});

// save connection to data base
var db = mongoose.connection;

// log error if db cant connect
db.on('error', function(err){
  console.log(err);
});

// log "db has been connected" if it connects
db.once('open', function(){
  console.log("database has been connected!");
});

// listening port
app.listen(process.env.PORT || 3000, function(){
  console.log("app listening on port 3000");
});

