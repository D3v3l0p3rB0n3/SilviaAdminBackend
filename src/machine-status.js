const fs = require('fs');
const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class


var machineEnabled = false;
var timestamp;


module.exports = {
    getMachineStatus: function () {
        return machineEnabled;
    },
    getTimestamp: function () {
        return timestamp;
    },
    setMachineStatus: function (_callback) {
        console.log('Gpio functionality accessible on this computer?', Gpio.accessible);
    }
};

function setTimestamp() {
    timestamp = moment.now();
}