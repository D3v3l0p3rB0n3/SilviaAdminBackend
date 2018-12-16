//lokale skripte
var machineStatus = require('./machine-status');
var brewCoffee = require('./brew-coffee');


module.exports = {
    initializeController: function (router) {

        /**
         * Service to get status if the machine in on or off
         * returns a timestamp when the machine was started
         */
        router.get('/machineStatus', function(req, res) {
            res.json({
                machineEnabled: machineStatus.getMachineStatus(),
                timestamp: machineStatus.getTimestamp()
            });
        });
        /**
         * Service to switch the status of the machine
         * returns a timestamp when the machine was started
         */
        router.post('/machineStatus', function(req, res) {
            machineStatus.setMachineStatus();
            res.json({
                machineEnabled: machineStatus.getMachineStatus(),
                timestamp: machineStatus.getTimestamp()
            });
        });

        router.post('/startBrewing', function(req, res) {
            brewCoffee.startBrewing(req.body.brewTime);
            res.send();
        });
    }
};