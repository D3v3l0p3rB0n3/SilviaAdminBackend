const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out');


var machineEnabled = false;
var timestamp;


module.exports = {
    getMachineStatus: function () {
        return getMachineStatus();
    },
    getTimestamp: function () {
        return timestamp;
    },
    setMachineStatus: function () {
        gpio17.writeSync(1);
        setInterval(()=> {
            gpio17.writeSync(0);
        }, 100);
        if (getMachineStatus()) {
            setMachineStatus(false);
            timestamp = null;
        } else {
            setMachineStatus(true);
            setTimestamp();
        }
    }
};

function setTimestamp() {
    timestamp = moment.now();
}

function setMachineStatus(value) {
    machineEnabled = value;
}
function getMachineStatus() {
    return machineEnabled;
}