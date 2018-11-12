
var DAO = require('../DAO')


function addFoodItemWithData(id, name, sort, posId, price, categoryId, callback) {

    let foodItem = {
        "id": id,
        "name": name,
        "sort": sort,
        "pos_id": posId,
        "category_id": categoryId,
        "price": price
    }
    this.addFoodItem(foodItem, callback)
}

function addFoodItem(foodItem, callback) {

    DAO.FoodItemDAO.addFoodItem(foodItem, callback)
}

function getAllFoodItem(callback) {
    DAO.FoodItemDAO.getAllFoodItem(callback)
}

function getFoodItemById(id, callback) {
    DAO.FoodItemDAO.getFoodItemById(id, function (err, result) {
        if (result.length > 0) {
            callback(undefined, result[0])
        } else {
            callback(err, undefined)
        }
    })
}

function updateFoodItem(id, categoryId, dataUpdate, callback) {
    DAO.FoodItemDAO.updateFoodItem(id, categoryId, dataUpdate, callback)
}


function removeFoodItem(id, categoryId,callback) {
    DAO.FoodItemDAO.removeFoodItem(id, categoryId, callback)
}


module.exports.addFoodItem= addFoodItem
module.exports.getAllFoodItem = getAllFoodItem
module.exports.getFoodItemById = getFoodItemById
module.exports.updateFoodItem = updateFoodItem
module.exports.removeFoodItem = removeFoodItem
