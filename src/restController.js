module.exports = {
    initializeController: function (router) {
        router.get('/machineStatus', function(req, res) {
            res.json({ message: 'hooray! welcome to our api!' });
        });
    }
};