//lets require/import the mongodb native drivers.
const DATA_BASE_NAME = "db"
var mongodb = require('mongodb');


function connect(callback) {
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://172.30.33.82:27017/' + DATA_BASE_NAME;

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);
            callback(err,db)
        }
    });
}



module.exports.connect = connect


