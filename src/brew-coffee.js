const Gpio = require('onoff').Gpio; // Gpio class
var machineStatus = require('./machine-status');
const gpio23 = new Gpio(23, 'out'); // Set GPIO_NR for relais to start and stop the brewing
const gpio24 = new Gpio(24, 'out'); // Set GPIO_NR for relais to start and stop the brewing

module.exports = {
    startBrewing: function (brewTime, callback) {
        if (machineStatus.getMachineStatus()){
            // gpio23.writeSync(1);
            // gpio24.writeSync(1);
            setTimeout(()=> {
                // gpio23.writeSync(0);
                // gpio24.writeSync(0);
                callback();
            }, brewTime);
        }
    }
};