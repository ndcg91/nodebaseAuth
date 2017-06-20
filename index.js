var express = require("express");
var	app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/clin');
var auth = require("./helpers/auth.js");
var bcrypt = require("bcrypt");


var routes = require("./routes/index"),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	exphbs  = require('express-handlebars'),
	path = require("path")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash("Melany90", salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        console.log(hash,salt)
      });
    });

app.listen(3000, function () {
  console.log('clin app listening on port 3000!');
});
