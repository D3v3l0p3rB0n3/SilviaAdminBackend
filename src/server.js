const express    = require('express');        // call express
const http = require('http');
const app        = express();                 // define our app using express
const cors = require('cors');
const bodyParser = require('body-parser');
const sockjs = require('sockjs');

//lokale skripte
const restController = require('./restController');
const machineStatus = require('./machine-status');

const sockjs_opts = {
    prefix: '/machineStatusWebSocket'
};

const sockjs_echo = sockjs.createServer(sockjs_opts);

sockjs_echo.on('connection', conn => {
    conn.write(JSON.stringify({
        machineEnabled: machineStatus.getMachineStatus(),
        timestamp: machineStatus.getTimestamp()
    }));
    console.log('Connection was opened', conn);
    machineStatus.setConnection(conn);
    conn.on('close', function() {
        console.log('Connection was closed', conn);
        machineStatus.setConnection(null);
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

const server = http.createServer(app);
sockjs_echo.installHandlers(server);
machineStatus.setMachineWatch();

server.listen(port, '0.0.0.0', () => {
    console.log(' [*] Listening on 0.0.0.0:' + port);
});
