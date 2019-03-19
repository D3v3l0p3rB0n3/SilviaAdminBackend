const moment = require('moment');
const fs = require('fs');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out'); // Set GPIO_NR for relais to start and stop the machine
const gpio18 = new Gpio(18, 'in', 'both');
const machineStatusFile = '/sys/class/gpio/gpio18/value';

// var machineStatus = gpio18.readSync();
var machineStatus = false;
var timestamp;
var sockJSConnection = [];


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
        fs.watch(machineStatusFile, function (event, filename) {
            if (filename) {
                var value = fs.readFileSync(machineStatusFile, 'utf8');
                console.log('value', value, 'machineStatus', machineStatus);
                if(!machineStatus && value){ //<- machine was turned on
                    machineStatus = value;
                    setTimestamp(moment.now());
                    console.log('Machine turned on', value);
                    if(sockJSConnection && sockJSConnection.length > 0) {
                        for (let connection of sockJSConnection) {
                            connection.write(JSON.stringify({
                                machineEnabled: machineStatus,
                                timestamp: timestamp
                            }));
                        }
                    }
                }
                if(machineStatus && !value) { //<- machine was turned off
                    machineStatus = value;
                    setTimestamp(null);
                    console.log('Machine turned off', value);
                    if(sockJSConnection && sockJSConnection.length > 0) {
                        for (let connection of sockJSConnection) {
                            connection.write(JSON.stringify({
                                machineEnabled: machineStatus,
                                timestamp: timestamp
                            }));
                        }
                    }
                }
            } else {
                console.error('filename not provided');
            }
        });
    },
    setConnection: function (conn) {
        sockJSConnection.push(conn);
        console.log('connection opened', conn.id);
    },
    closeConnection: function (conn) {
        console.log('connection closed', conn.id);
        const newConnectionArray = [];
        for (let connIndex in sockJSConnection){
           if(sockJSConnection[connIndex].id !== conn.id) {
               newConnectionArray.push(sockJSConnection[connIndex]);
           }
        }
        sockJSConnection = newConnectionArray;
    }
};

function setTimestamp(_timestamp) {
    timestamp = _timestamp;
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
