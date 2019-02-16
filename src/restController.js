//lokale skripte
var machineStatus = require('./machine-status');
var brewCoffee = require('./brew-coffee');
var machineMaintenance = require('./machine-maintenance');


module.exports = {
    initializeController: function (router) {
        /**
         * Service to switch the status of the machine
         * returns a timestamp when the machine was started
         */
        router.put('/machineStatus', function(req, res) {
            machineStatus.setMachineStatus();
            res.send();
        });

        router.put('/startBrewing', function(req, res) {
            brewCoffee.startBrewing(req.body.brewTime);
            res.send();
        });

        router.put('/cancelBrewing', function(req, res) {
            brewCoffee.cancelBrewing();
            res.send();
        });

        router.put('/backFlush', function(req, res) {
            machineMaintenance.startBackflush();
            res.send();
        });

        router.put('/cancelBackFlush', function(req, res) {
            machineMaintenance.cancelBackflush();
            res.send();
        });

    }
};
