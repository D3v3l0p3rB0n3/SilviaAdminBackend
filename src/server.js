const express    = require('express');        // call express
const https = require('https')
const app        = express();                 // define our app using express
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const sockjs = require('sockjs');

const opts = {
    key: fs.readFileSync('certificates/server_key.pem'),
    cert: fs.readFileSync('certificates/server_cert.pem'),
    requestCert: true,
    rejectUnauthorized: true,
    ca: [fs.readFileSync('certificates/server_cert.pem')]
}

//lokale skripte
const restController = require('./restController');
const machineStatus = require('./machine-status');


//sockets:
const sockjs_opts = {
    prefix: '/machineStatusWebSocket'
};

const sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', conn => {
    conn.write(JSON.stringify({
        machineEnabled: machineStatus.getMachineStatus(),
        timestamp: machineStatus.getTimestamp()
    }));
    machineStatus.setConnection(conn);
    conn.on('close', function() {
        machineStatus.closeConnection(conn);
    });
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// set cors header
app.use(cors());
// rest interfaces are implemented here
restController.initializeController(router);
app.use('/', router);

const server = https.createServer(opts, app);
sockjs_echo.installHandlers(server);
machineStatus.setMachineWatch();
