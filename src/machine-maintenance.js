const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

var flushingStillRunning;

module.exports = {
    startBackflush: function () {
        if (machineStatus.getMachineStatus()){
            flushingStillRunning = true;
            startFlushing();
            setTimeout(() => {
                stoppFlushing();
                setTimeout(() => {
                    startFlushing();
                    setTimeout(() => {
                        stoppFlushing();
                        setTimeout(() => {
                            startFlushing();
                            setTimeout(() => {
                                stoppFlushing();
                                setTimeout(() => {
                                    startFlushing();
                                    setTimeout(() => {
                                        stoppFlushing();
                                        setTimeout(() => {
                                            startFlushing();
                                            setTimeout(() => {
                                                stoppFlushing();
                                                setTimeout(() => {
                                                    startFlushing();
                                                    setTimeout(() => {
                                                        stoppFlushing();
                                                        setTimeout(() => {
                                                            startFlushing();
                                                            setTimeout(() => {
                                                                stoppFlushing();
                                                                setTimeout(() => {
                                                                    startFlushing();
                                                                    setTimeout(() => {
                                                                        stoppFlushing();
                                                                    }, 10 * 1000);
                                                                }, 10 * 1000);
                                                            }, 10 * 1000);
                                                        }, 10 * 1000);
                                                    }, 10 * 1000);
                                                }, 10 * 1000);
                                            }, 10 * 1000);
                                        }, 10 * 1000);
                                    }, 10 * 1000);
                                }, 10 * 1000);
                            }, 10 * 1000);
                        }, 10 * 1000);
                    }, 10 * 1000);
                }, 30 * 1000);
            }, 10 * 1000);
            flushingStillRunning = false;
        }
    },
    cancelBackflush: function () {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
        flushingStillRunning = false;
    }
};

function startFlushing() {
    if (flushingStillRunning) {
        gpio23.writeSync(1);
        gpio24.writeSync(1);
    }
}

function stoppFlushing() {
    if (flushingStillRunning) {
        gpio23.writeSync(0);
        gpio24.writeSync(0);
    }
}