const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out'); // Set GPIO_NR for relais to start and stop the machine
const gpio18 = new Gpio(18, 'in', 'both');

var machineStatus = gpio18.readSync();
var timestamp;
var sockJSConnection;


module.exports = {
    getMachineStatus: function () {
        return getMachineStatus();
    },
    getTimestamp: function () {
        return timestamp;
    },
    setMachineStatus: function () {
        setMachineStatus();
    },
    setMachineWatch: function () {
            gpio18.watch((err, value) => {
                if(!machineStatus && value){ //<- machine was turned on
                    machineStatus = value;
                    setTimestamp();
                    if(sockJSConnection) {
                        sockJSConnection.write(JSON.stringify({
                            machineEnabled: machineStatus,
                            timestamp: timestamp
                        }));
                    }
                }
                if(machineStatus && !value) { //<- machine was turned off
                    machineStatus = value;
                    timestamp = null;
                    if(sockJSConnection) {
                        sockJSConnection.write(JSON.stringify({
                            machineEnabled: machineStatus,
                            timestamp: timestamp
                        }));
                    }
                }
            });
    },
    setConnection: function (conn) {
        sockJSConnection = conn;
    }
};

function setTimestamp() {
    timestamp = moment.now();
}
function setMachineStatus() {
    gpio17.writeSync(1);
    setTimeout(()=> {
        gpio17.writeSync(0);
    }, 500);
}

function getMachineStatus() {
    return machineStatus;
}
