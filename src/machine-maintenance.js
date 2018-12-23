const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

module.exports = {
    startBackflush: function () {
        if (machineStatus.getMachineStatus()){
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

        }
    }
};

async function startFlushing(time) {
    gpio23.writeSync(1);
    gpio24.writeSync(1);
    await sleep(time * 1000);
}

async function stoppFlushing(time) {
    gpio23.writeSync(0);
    gpio24.writeSync(0);
    await sleep(time * 1000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}