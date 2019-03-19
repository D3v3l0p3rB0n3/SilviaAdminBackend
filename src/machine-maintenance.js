const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

var stillRunning;

module.exports = {
    startBackflush: function () {
        if (machineStatus.getMachineStatus() && !stillRunning){
            startFlushing();
        }
    },
    cancelMaintenance: function () {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
        stillRunning = false;
    },
    startAntiLiming: function (){
        if (machineStatus.getMachineStatus() && !stillRunning){
            _startAntiLiming();
        }
    }
};

async function startFlushing() {
    stillRunning = true;
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
    stillRunning = false;
}

async function _startAntiLiming() {
    stillRunning = true;
    startWater();
    await sleep(45 * 1000);
    stopWater(); // ca. 1,5l left
    await sleep(5 * 1000);
    machineStatus.setMachineStatus(); // now off
    await sleep(15 * 60 * 1000); // wait 15min
    machineStatus.setMachineStatus(); // now on
    await sleep(5 * 1000);
    startWater();
    await sleep(45 * 1000);
    stopWater(); // ca. 1l left
    await sleep(5 * 1000);
    machineStatus.setMachineStatus(); // now off
    await sleep(15 * 60 * 1000); // wait 15min
    machineStatus.setMachineStatus(); // now on
    await sleep(5 * 1000);
    startWater();
    await sleep(45 * 1000);
    stopWater(); // ca. 0,5l left
    await sleep(5 * 1000);
    machineStatus.setMachineStatus(); // now off
    await sleep(15 * 60 * 1000); // wait 15min
    machineStatus.setMachineStatus(); // now on
    await sleep(5 * 1000);
    startWater();
    await sleep(40 * 1000);
    stopWater(); // tank empty now
    await sleep(5 * 1000);
    machineStatus.setMachineStatus(); // now off
    stillRunning = false;
}

function startWater() {
    if (stillRunning) {
        gpio23.writeSync(1);
        gpio24.writeSync(1);
    }
}
function stopWater() {
    if (stillRunning) {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
