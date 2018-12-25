const moment = require('moment');
const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

var flushingStillRunning;

module.exports = {
    startBackflush: function () {
        if (machineStatus.getMachineStatus()){
            flushingStillRunning = true;
            startFlushing(10);
            stoppFlushing(30);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(10);
            startFlushing(10);
            stoppFlushing(1);
            flushingStillRunning = false;

        }
    },
    cancelBackflush: function () {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
        flushingStillRunning = false;
    }
};

async function startFlushing(time) {
    if (flushingStillRunning) {
        /*gpio23.writeSync(1);
        gpio24.writeSync(1);*/
        console.log(moment.now(), 'Write 1');
        await sleep(time * 1000);
    }
}

async function stoppFlushing(time) {
    if (flushingStillRunning) {
        /*gpio23.writeSync(0);
        gpio24.writeSync(0);*/
        console.log(moment.now(), 'Write 0');
        await sleep(time * 1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}