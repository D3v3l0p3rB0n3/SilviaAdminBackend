const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
const gpio17 = new Gpio(17, 'out'); // Set GPIO_NR for relais to start and stop the machine
const gpio18 = new Gpio(18, 'in');

var autoKeepOn = false;
var autoKeepIntervallID;
var timestamp;


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
    getAutoKeepOn: function () {
        return autoKeepOn;
    },
    setAutoKeepOn: function () {
        setAutoKeepOn();
    },
};

function setTimestamp() {
    timestamp = moment.now();
}
function setMachineStatus() {
    gpio17.writeSync(1);
    setTimeout(()=> {
        gpio17.writeSync(0);
    }, 500);
    if (getMachineStatus()) {
        timestamp = null;
    } else {
        setTimestamp();
    }
}

function setAutoKeepOn() {
    if (!autoKeepOn) {
        var autoKeepOnCounter = 0;
        autoKeepIntervallID = setInterval(()=> {
            restartMachine();
            if (autoKeepOnCounter === 3) {
                clearInterval(autoKeepIntervallID);
            }
            autoKeepOnCounter += 1;
        }, 1 * 60 * 1000)
    } else {
        clearInterval(autoKeepIntervallID);
    }
    autoKeepOn = !autoKeepOn;
}
function getMachineStatus() {
    return gpio18.readSync();
}
async function restartMachine() {
    if(getMachineStatus()) {
        setMachineStatus();
        await sleep(7000);
        setMachineStatus();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}