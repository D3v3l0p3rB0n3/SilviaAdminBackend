const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

var flushingStillRunning;

module.exports = {
    startBackflush: function () {
        if (machineStatus.getMachineStatus()){
            startFlushing();
        }
    },
    cancelBackflush: function () {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
        flushingStillRunning = false;
    }
};

async function startFlushing() {
    flushingStillRunning = true;
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(30 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    await sleep(10 * 1000);
    startWater();
    await sleep(10 * 1000);
    stopWater();
    flushingStillRunning = false;
}

function startWater() {
    if (flushingStillRunning) {
        gpio23.writeSync(1);
        gpio24.writeSync(1);
    }
}
function stopWater() {
    if (flushingStillRunning) {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}