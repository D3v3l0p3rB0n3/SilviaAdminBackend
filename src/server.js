var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors = require('cors')
var bodyParser = require('body-parser');

//lokale skripte
var restController = require('./restController');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// set cors header
app.use(cors());
// rest interfaces are implemented here
restController.initializeController(router);
app.use('/coffeemachine', router);
app.listen(port, function () {
    console.log('Server started on port ', port);
});
