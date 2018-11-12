
var DAO = require('./DAO')
const DATA_BASE_NAME = "db"
const DATA_BASE_URL = "mongodb://localhost:27017/"

const COLLECTION_NAME = "FoodItem"
const COLLECTION_CATEGORY = "Category"


var mongodb = require('mongodb');

function addFoodItem(foodItem, callback) {

    let self = this

    if (foodItem.id == undefined || foodItem.id == null) {
        callback(false)
        return
    }

    var MongoClient = mongodb.MongoClient;

// Use connect method to connect to the Server
    MongoClient.connect(DATA_BASE_URL, { useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            db.close()
            callback(false)
            return
        }

        var dbase = db.db(DATA_BASE_NAME); //here

        var query = { id: foodItem.id };
        dbase.collection(COLLECTION_NAME).find(query).toArray(function(err, result) {
            if (err) {
                callback(false)
                db.close()
                return
            }

            if (result.length > 0) {
                callback(false)
                db.close();
            }  else {

                dbase.collection(COLLECTION_NAME).insertOne(foodItem, function(err, res) {
                    if (err) {
                        callback(false)
                        db.close()
                        return
                    }

                    console.log("food_item document inserted");
                    self.updateCategoryOfItem(foodItem, db, dbase, callback)

                });
            }

        });

    });

}

function removeItemOfCategory(foodItem, db, dbase, callback) {
    let categoryId = ""
    if (foodItem.category_id != undefined && foodItem.category_id != null) {
        categoryId = foodItem.category_id
    }

    let queryCategory = {id: categoryId}
    dbase.collection(COLLECTION_CATEGORY).find(queryCategory).toArray(function(errCategory, result) {
        if (errCategory) {
            console.log("--------------- Query error -----------")
            callback(false)
            db && db.close()
            return
        }

        if (result.length == 0) {
            console.log("--------------- no record-----------")
            callback(false)
            db && db.close()
            return
        }

        let categoryOld = result[0]

        if (categoryOld.list_item != undefined && categoryOld.list_item != null && categoryOld.list_item.length > 0) {

           let listItem = categoryOld.list_item.filter(function (item) {
               return item.id != foodItem.id
           })

            console.log("--------------- update records-----------")
            let dataUpdate = {$set:{"list_item": listItem}}
            dbase.collection(COLLECTION_CATEGORY).updateOne(queryCategory, dataUpdate, function(err, res) {
                if (err) {
                    console.log("err : ", err)
                    callback(false)
                    db && db.close();
                    return
                }

                callback(true)
                db && db.close();
            });

        } else {
            callback(true)
            db && db.close()
        }


    })


}

function updateCategoryOfItem(foodItem, db, dbase, callback) {

    let categoryId = ""
    if (foodItem.category_id != undefined && foodItem.category_id != null) {
        categoryId = foodItem.category_id
    }

    let queryCategory = {id: categoryId}


    dbase.collection(COLLECTION_CATEGORY).find(queryCategory).toArray(function(errCategory, result) {

        let posId = foodItem.pos_id == undefined ? 0 : foodItem.pos_id
        let category = {
            "id": categoryId,
            "name": "Khác",
            "sort": 1000,
            "pos_id": posId,
            "list_item": [
                foodItem
            ]
        }

        if (errCategory) {
            console.log("--------------- Query error -----------")
            dbase.collection(COLLECTION_CATEGORY).insertOne(category, function(err, res) {
                if (err) {
                    callback(false)
                    db && db.close()
                    return
                }

                callback(true)
                db && db.close()
            })
            return
        }

        if (result.length == 0) {
            console.log("--------------- no record-----------")
            dbase.collection(COLLECTION_CATEGORY).insertOne(category, function(err, res) {
                if (err) {
                    callback(false)
                    db && db.close()
                    return
                }

                callback(true)
                db && db.close()
            })
            return
        }

        let categoryOld = result[0]
        if (categoryOld.list_item != undefined && categoryOld.list_item != null && categoryOld.list_item.length > 0) {

            let isExist = false
            for (i = 0; i < categoryOld.list_item.length; i++) {
                if (categoryOld.list_item[i].id == foodItem.id) {
                    isExist = true

                    if (foodItem.name != undefined && foodItem.name != null) {
                        categoryOld.list_item[i].name  = foodItem.name
                    }

                    if (foodItem.price != undefined && foodItem.price != null) {
                        categoryOld.list_item[i].price  = foodItem.price
                    }

                    if (foodItem.sort != undefined && foodItem.sort != null) {
                        categoryOld.list_item[i].sort  = foodItem.sort
                    }

                    if (foodItem.pos_id != undefined && foodItem.name != null) {
                        categoryOld.list_item[i].pos_id  = foodItem.pos_id
                    }

                    if (foodItem.category_id != undefined && foodItem.category_id != null) {
                        categoryOld.list_item[i].category_id  = foodItem.category_id
                    }

                    break
                }
            }

            if (!isExist) {
                categoryOld.list_item.push(foodItem)
            }


        } else {
            categoryOld.list_item = [foodItem]
        }

        console.log("--------------- update records-----------")
        let dataUpdate = {$set:{"list_item": categoryOld.list_item}}
        dbase.collection(COLLECTION_CATEGORY).updateOne(queryCategory, dataUpdate, function(err, res) {
            if (err) {
                console.log("err : ", err)
                callback(false)
                db && db.close();
                return
            }

            callback(true)
            db && db.close();
        });
    })

}



function getAllFoodItem(callback) {

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

function getFoodItemById(id, callback) {
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(err, undefined)
            db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME); //here
        var query = {id: id}
        dbase.collection(COLLECTION_NAME).find(query).toArray(function(err, result) {
            callback(err, result)
            db.close();
        });

    });
}


function updateFoodItem(id, categoryId, dataUpdate, callback) {
    let self = this
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(false)
            db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME);

        var myquery = { id: id };
        var newvalues = { $set: dataUpdate };
        dbase.collection(COLLECTION_NAME).updateOne(myquery, newvalues, function(err, res) {
            if (err) {
                callback(false)
                db.close()
                return
            }


            let foodItem = {
                id: id,
                category_id: categoryId,
            }

            if (dataUpdate.name != undefined && dataUpdate.name != null) {
                foodItem.name = dataUpdate.name
            }

            if (dataUpdate.price != undefined && dataUpdate.price != null) {
                foodItem.price = dataUpdate.price
            }

            if (dataUpdate.sort != undefined && dataUpdate.sort != null) {
                foodItem.sort = dataUpdate.sort
            }

            if (dataUpdate.pos_id != undefined && dataUpdate.pos_id != null) {
                foodItem.pos_id = dataUpdate.pos_id
            }

            self.updateCategoryOfItem(foodItem, db, dbase, callback)
        });

    });
}

function removeFoodItem(id, categoryId, callback) {

    let self = this
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(DATA_BASE_URL,{ useNewUrlParser: true }, function(err, db) {   //here db is the client obj
        if (err) {
            callback(false)
            db.close()
            return
        }

        var dbase = db.db(DATA_BASE_NAME);

        var myquery = { id: id };
        dbase.collection(COLLECTION_NAME).deleteOne(myquery, function(err, obj) {
            if (err) {
                callback(false)
                db.close()
                return
            }

            let foodItem = {
                id: id,
                category_id: categoryId
            }
            self.removeItemOfCategory(foodItem, db, dbase, callback)

        });

    });
}


module.exports.addFoodItem = addFoodItem
module.exports.getAllFoodItem = getAllFoodItem
module.exports.getFoodItemById = getFoodItemById
module.exports.updateFoodItem = updateFoodItem
module.exports.removeFoodItem = removeFoodItem
module.exports.updateCategoryOfItem = updateCategoryOfItem
module.exports.removeItemOfCategory = removeItemOfCategory



