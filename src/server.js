var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

//lokale skripte
var mongoDB = require('./mongoDB');
var restController = require('./restController');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// rest interfaces are implemented here
mongoDB.connectToMongoDB().then(function(db) {
    restController.initializeController(router);
    app.use('/coffeemachine', router);
    app.listen(port, function () {
        console.log('Server started on hostname ', hostname, ':', port);
    });
}, function(err) {
    console.error(err);
});