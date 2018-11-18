//lokale skripte
var machineStatus = require('./machine-status');


module.exports = {
    initializeController: function (router) {

        /**
         * Service to get status if the machine in on or off
         * returns a timestamp when the machine was started
         */
        router.get('/machineStatus', function(req, res) {
            res.json({ message: 'hooray! welcome to our get api!' });
        });
        /**
         * Service to switch the status of the machine
         * returns a timestamp when the machine was started
         */
        router.post('/machineStatus', function(req, res) {
            machineStatus.setMachineStatus();
            res.json({ timestamp: machineStatus.getTimestamp()});
        });
    }
};