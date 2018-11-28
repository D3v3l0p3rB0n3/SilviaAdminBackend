const fs = require('fs');
var gpio = require('rpi-gpio');
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
        gpio.setup(17, gpio.DIR_OUT, function (err) {
            if (err) throw err;
            gpio.write(17, true, function(err) {
                if (err) throw err;
                console.log('Written to pin');
                _callback()
            });
        });
    },
};

function setTimestamp() {
    timestamp = moment.now();
}