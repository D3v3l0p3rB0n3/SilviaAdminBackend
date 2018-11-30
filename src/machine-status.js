const fs = require('fs');
const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out');


var machineEnabled = false;
var timestamp;


module.exports = {
    getMachineStatus: function () {
        return machineEnabled;
    },
    getTimestamp: function () {
        return timestamp;
    },
    setMachineStatus: function () {
        gpio17.writeSync(1);
        machineEnabled = !machineEnabled;
        setTimestamp();
    }
};

function setTimestamp() {
    timestamp = moment.now();
}