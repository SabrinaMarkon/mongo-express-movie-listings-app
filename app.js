// requirements.
const express = require('express'),
        app = express(),
        engines = require('consolidate'),
        bodyParser = require('bodyparser'),
        assert = require('assert'),
        MongoClient = require('mongodb').MongoClient;

// templating.
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

// error handling.
function errorHandler(err, req, res, next) {
    console.log(err.message);
    console.log(err.stack);
    res.status(500).render('error_template', {error: err});
}

// connect to mongodb video database.
MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {






});

