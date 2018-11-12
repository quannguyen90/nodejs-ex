
var DAO = require('./DAO')
const DATA_BASE_NAME = "db"
const DATA_BASE_URL = "mongodb://172.30.33.82:27017/"

const COLLECTION_NAME = "Category"

var mongodb = require('mongodb');

function addCategory(category, callback) {

    var MongoClient = mongodb.MongoClient;

// Use connect method to connect to the Server
    MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            db && db.close()
            callback(false)
            return
        }

        var dbase = db.db(DATA_BASE_NAME); //here

        var query = { id: category.id };
        dbase.collection(COLLECTION_NAME).find(query).toArray(function(err, result) {
            if (err) {
                callback(false)
                db.close()
                return
            }

            if (result.length > 0) {
                callback(false)
                db && db.close();
            }  else {

                dbase.collection(COLLECTION_NAME).insertOne(category, function(err, res) {
                    if (err) {
                        callback(false)
                        db && db.close()
                        return
                    }
                    console.log("1 document inserted");
                    callback(true)
                    db && db.close();
                });
            }

        });

    });

}

function getAllCategory(callback) {

    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(err, undefined)
            db && db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME); //here

        dbase.collection(COLLECTION_NAME).find().toArray(function(err, result) {
            if (err) {
                db && db.close()
                callback(err, undefined)
                return
            }

            callback(err, result)
            db && db.close();
        });

    });

}

function getCategoryById(id, callback) {
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(err, undefined)
            db && db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME); //here
        var query = {id: id}
        dbase.collection(COLLECTION_NAME).find(query).toArray(function(err, result) {
            callback(err, result)
            db && db.close();
        });

    });
}

function updateCategory(id, dataUpdate, callback) {
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(false)
            db && db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME);

        var myquery = { id: id };
        var newvalues = { $set: dataUpdate };

        dbase.collection(COLLECTION_NAME).find(myquery).toArray(function(err, result) {
            if (result && result.length > 0) {
                dbase.collection(COLLECTION_NAME).updateOne(myquery, newvalues, function(err, res) {
                    if (err) {
                        callback(false)
                        db && db.close();
                        return
                    }

                    callback(true)
                    db && db.close();
                });

            } else {
                callback(false)
                db && db.close();
            }

        });

    });
}

function removeCategory(id, callback) {
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(false)
            db && db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME);

        var myquery = { id: id };
        console.log("collection name: ", COLLECTION_NAME)
        dbase.collection(COLLECTION_NAME).deleteOne(myquery, function(err, obj) {
            if (err) {
                callback(false)
                db && db.close()
                return
            }

            callback(true)
            db && db.close();
        });

    });
}


module.exports.addCategory = addCategory
module.exports.getAllCategory = getAllCategory
module.exports.getCategoryById = getCategoryById
module.exports.updateCategory = updateCategory
module.exports.removeCategory = removeCategory

