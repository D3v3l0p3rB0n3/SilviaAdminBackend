//lokale skripte
var machineStatus = require('./machine-status');
var brewCoffee = require('./brew-coffee');
var machineMaintenance = require('./machine-maintenance');


module.exports = {
    initializeController: function (app) {

        app.get('/authenticate', (req, res) => {
            const cert = req.connection.getPeerCertificate();
            if (req.client.authorized) {
                res.status(200).send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
            } else {
                res.status(401)
                    .send(`Sorry, but you need to provide a client certificate to continue.`)
            }
        });

        app.get('/authenticateiPhone', (req, res) => {
            const cert = req.connection.getPeerCertificate();
            if (req.client.authorized) {
                res.redirect(301, 'http://adminconsole.felix-grabscheit.de')
            } else if (cert.subject) {
                res.status(403)
                    .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
            } else {
                res.status(401)
                    .send(`Sorry, but you need to provide a client certificate to continue.`)
            }
        });

        /**
         * Service to switch the status of the machine
         * returns a timestamp when the machine was started
         */
        app.put('/machineStatus', function (req, res) {
            if (req.client.authorized) {
                machineStatus.setMachineStatus();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });

        /**
         * Service to switch the status of the machine
         * returns a timestamp when the machine was started
         */
        app.get('/machineStatus/siri', function (req, res) {
            if (req.client.authorized) {
                machineStatus.setMachineStatus();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });
        app.put('/startBrewing', function (req, res) {
            if (req.client.authorized) {
                brewCoffee.startBrewing(req.body.brewTime);
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });

        app.put('/cancelBrewing', function (req, res) {
            if (req.client.authorized) {
                brewCoffee.cancelBrewing();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }

        });

        app.put('/backFlush', function (req, res) {
            if (req.client.authorized) {
                machineMaintenance.startBackflush();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });

        app.put('/cancelMaintenance', function (req, res) {
            if (req.client.authorized) {
                machineMaintenance.cancelMaintenance();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });

        app.put('/antiLiming', function (req, res) {
            if (req.client.authorized) {
                machineMaintenance.startAntiLiming();
                res.send();
            } else if (cert.subject) {
                res.status(403)
                    .send(`Not permitted`)
            } else {
                res.status(401)
                    .send(`No client-certificate passed`)
            }
        });
    }
};
