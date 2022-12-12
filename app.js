var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var neo4j = require('neo4j-driver');

var graphRouter = require('./routes/graph');
var nodeRouter= require('./routes/node');
var relationshipRouter = require('./routes/relationship');

var app = express();

//Set up connection with neo4j

// const driver = neo4j.driver('neo4j+s://553c3e44.databases.neo4j.io',
//   neo4j.auth.basic(
//     neo4j, 
//     'MurOG8QvcH1ZpzMK_qObnwiG7cIohuFSOjYnMXH7D1s'
//   )
// )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/node', nodeRouter);
app.use('/relationship', relationshipRouter);
app.use('/graph', graphRouter);
app.get('/',  (req,res) => {
  res.send('world')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
