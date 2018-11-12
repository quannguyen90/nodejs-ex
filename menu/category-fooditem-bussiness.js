
var DAO = require('../DAO')


function addCategory(id, name, sort, posId, callback) {

     let category = {
         "id": id,
         "name": name,
         "sort": sort,
         "pos_id": posId,
     }

    DAO.CategoryDAO.addCategory(category, callback)
}

function getAllCategory(callback) {
    DAO.CategoryDAO.getAllCategory(callback)
}

function getCategoryById(id, callback) {
    DAO.CategoryDAO.getCategoryById(id, function (err, result) {
        if (result.length > 0) {
            callback(undefined, result[0])
        } else {
            callback(err, undefined)
        }
    })
}

function editCategory(id, dataUpdate, callback) {
    DAO.CategoryDAO.updateCategory(id, dataUpdate, callback)
}

function getListItemOfCategory(id) {
    return [
        {
            id: "AAAA",
            name: "mon A",
            price: 10000,
            sort: 1,
            pod_id: 100,
            category_id: id,
        },
        {
            id: "BBBB",
            name: "mon B",
            price: 15000,
            sort: 1,
            pod_id: 100,
            category_id: id,
        },
        {
            id: "CCCC",
            name: "mon C",
            price: 30000,
            sort: 1,
            pod_id: 100,
            category_id: id,
        }

    ]
}

function removeCategory(id, callback) {
    DAO.CategoryDAO.removeCategory(id, callback)
}

module.exports.getAllCategory = getAllCategory
module.exports.addCategory = addCategory
module.exports.getCategoryById = getCategoryById
module.exports.editCategory = editCategory
module.exports.removeCategory = removeCategory
module.exports.getListItemOfCategory = getListItemOfCategory