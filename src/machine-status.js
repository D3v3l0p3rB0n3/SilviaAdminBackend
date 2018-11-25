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
        var gpioFile = fs.createWriteStream("/sys/class/gpio/gpio17/value");
        gpioFile.write("1");
        gpioFile.end("0");
        machineEnabled = !machineEnabled;
        setTimestamp();
    },
};

function setTimestamp() {
    timestamp = moment.now();
}
