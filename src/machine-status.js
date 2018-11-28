const fs = require('fs');
var gpio = require('rpi-gpio');
var gpiop = gpio.promise;
const moment = require('moment');


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
        writeGpioTrue(17).then(() => {
            machineEnabled = !machineEnabled;
            setTimestamp();
            _callback();
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
    },
    getValue : function () {
        gpio.setup(17, gpio.DIR_IN, readInput);
    }
};

function setTimestamp() {
    timestamp = moment.now();
}

function writeGpioTrue(gpioNr) {
    gpiop.setup(gpioNr, gpio.DIR_OUT)
        .then(() => {
            return gpiop.write(gpioNr, true)
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
}

function readInput(err) {
    if (err) throw err;
    gpio.read(17, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
    });
}