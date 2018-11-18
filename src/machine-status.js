const fs = require('fs');
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
    setMachineStatus: function () {
        writeGPIO17(1).then(() => {
            setTimestamp();
        })
    },
};

function writeGPIO17(value) {
    return fs.writeFile("/sys/class/gpio/gpio17/value", value);
}

function setTimestamp() {
    timestamp = moment.now();
}
