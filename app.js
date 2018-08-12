// requirements.
const express = require('express'),
        app = express(),
        engines = require('consolidate'),
        bodyParser = require('body-parser'),
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

// connect to mongodb movie_listing_app database.
MongoClient.connect('mongodb://localhost:27017/movie_listing_app', function(err, db) {
    
    // make sure no error.
    assert.equal(null, err);

    console.log("Successfully connected to MongoDB.");

    //////////////////////// route to main url listing the movies.
    app.get('/', function(req, res) {
        
        // get the movies from the database.
        db.collection('movies').find({}).toArray(function(err, docs) {

            // check for problems.
            if (err) { throw err; }
            
            // are there any movies at all?
            if (docs.length < 1) {
                return res.send('There are no movies here yet');
            }

            // there are movies, so send them to the movies.html template.
            res.render('movies', {movies: docs});

        });
    });

    //////////////////////// route to get to form to add a new movie.
    app.get('/add', function(req, res) {

        // load the add.html template. Don't need to pass variables now (simple version currently).
        res.render('add', '');

    });

    //////////////////////// route to submit the form to add a new movie.
    app.post('/add', function(req, res) {

        //

    });

    //////////////////////// route not found.
    app.use(function(req, res) {
        res.sendStatus('404');
    });


    // Start up Express server.
    const server = app.listen(3000, function() {
        
        // post
        const port = server.address().port;
        console.log('Express server listening on port %s.', port);

    });

});

