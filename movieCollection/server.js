//====================================
// REQUIRE MODULES
//====================================
var express         = require('express');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var hbs             = require('hbs');

// Instantiate new Express app:
var app             = express();

//====================================
// MIDDLE WARE
//====================================
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public')); // for css

// create a usersController
var usersController = require("./controllers/usersController.js");
app.use('/users', usersController);

// route route
app.get('/', function(req, res){
  res.send("<h1>Welcome</h1>");
});

//Specify Mongo database
mongoose.connect('mongodb://localhost/moviecollection');

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
app.listen(3000, function(){
  console.log("app listening on port 3000");
});

