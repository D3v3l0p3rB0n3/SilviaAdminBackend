var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');

module.exports = {
    connectToMongoDB: function () {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    console.error('mongo connection error: ', err.message);
                    reject(err);
                } else {
                    console.info("connected to mongodb");
                    resolve(db);
                }
            });
        });
    }
};