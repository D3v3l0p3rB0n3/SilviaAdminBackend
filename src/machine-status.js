const moment = require('moment');
const fs = require('fs');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out'); // Set GPIO_NR for relais to start and stop the machine
const gpio18 = new Gpio(18, 'in', 'both');

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
    setMachineStatusOn: function () {
        setMachineStatusOn();
    },
    setMachineWatch: function () {
        gpio18.watch((err, value) => {
            if(!machineStatus && value){ //<- machine was turned on
                machineStatus = true;
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
                machineStatus = false;
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
function setMachineStatusOn() {
    if(!machineStatus){
        setMachineStatus()
    }
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
