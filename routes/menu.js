var express = require('express');
var router = express.Router();
var menu = require('../menu');
var createError = require('http-errors');



const PATH_MENU = "/"
const PATH_FOOD_ITEM = "/food_item"
const PATH_ALL_FOOD_ITEM = "/food_item/all"

const PATH_CATEGORY_FOOD_ITEM = "/category"
const PATH_ALL_CATEGORY_FOOD_ITEM = "/category/all"
const PATH_FOOD_ITEM_OF_CATEGORY = "/category/food_items"

router.get(PATH_MENU, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let menuItem = menu.menu.getMenu()
    console.dir(menuItem);

    let result = {
        "data": menuItem
    }
    res.send(result);
});

// FOOD ITEM
router.get(PATH_ALL_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")

    menu.foodItem.getAllFoodItem(function (err, result) {
        if (err) {
            let error = createError(520,"missing parameters")
            res.send(error);
            return
        } else {
            let json = {
                "data": result
            }
            res.send(json);
        }

    })
});

router.get(PATH_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let id = req.query.id
    console.log("---------------------", id, "----------------------")

    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }
    menu.foodItem.getFoodItemById(id,function (err, result) {
        if (err) {
            let error = createError(520,"missing parameters")
            res.send(error);
            return
        } else {

            if (result) {
                let json = {
                    "data": result
                }
                res.send(json);
            } else {
                let error = createError(520,"Prameter error")
                res.send(error);
                return
            }

        }

    })
});

router.post(PATH_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let id = req.body.id
    console.log("---------------------", id, "----------------------")

    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }


    let data = menu.foodItem.addFoodItem(req.body, function (result) {
        console.log("--->> ", result)
        let json = {
            "data": result
        }
        res.send(json);

    })

});


router.put(PATH_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let id = req.body.id
    let categoryId = req.body.category_id
    console.log("---------------------", id, "----------------------")

    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }



    let data = menu.foodItem.updateFoodItem(id, categoryId, req.body, function (result) {
        let json = {
            "data": result
        }
        res.send(json);
    })
});

router.delete(PATH_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let id = req.body.id
    let categoryId = req.body.category_id
    console.log("---------------------", id, "----------------------")

    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }


    let data = menu.foodItem.removeFoodItem(id, categoryId,  function (result) {
        let json = {
            "data": result
        }
        res.send(json);
    })
});


// CATEGORY FOOD ITEM
// get all category
router.get(PATH_ALL_CATEGORY_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    menu.catergory.getAllCategory(function (err, result) {
        if (err) {
            let error = createError(520,"missing parameters")
            res.send(error);
            return
        } else {
            let json = {
                "data": result
            }
            res.send(json);
        }

    })
});

// get category by id
router.get(PATH_CATEGORY_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    let id = req.query.id
    console.log("---------------------", id, "----------------------")

    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }


     menu.catergory.getCategoryById(id, function (err, result) {
        if (err) {
            let error = createError(520,"missing parameters")
            res.send(error);
            return
        } else {

            if (result) {
                let json = {
                    "data": result
                }
                res.send(json);
            } else {
                let error = createError(520,"Prameter error")
                res.send(error);
                return
            }

        }
    })
});

// create category
router.post(PATH_CATEGORY_FOOD_ITEM, function(req, res, next) {

    console.log("---------------------", req.url, "----------------------")
    console.log(req.body)
    let id = req.body.id
    if (!id) {
        let error = createError(520,"missing parameters")
        res.send(error);
        return
    }

    let name = req.body.name
    let posId = req.body.pos_id
    let sort = req.body.sort

    let data = menu.catergory.addCategory(id,name,sort,posId, function (result) {
        console.log("--->> ", result)
        let json = {
            "data": result
        }
        res.send(json);

    })

});


// edit category
router.put(PATH_CATEGORY_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    console.log(req.body)
    let id = req.body.id
    if (!id) {
        let error = createError(520)
        res.send(error);
        return
    }

    let name = req.body.name
    let posId = req.body.pos_id
    let sort = req.body.sort

    let dataUpdate = {
        "name": name,
        "sort": sort,
        "pos_id": posId,
    }

    menu.catergory.editCategory(id,dataUpdate, function (result) {
        let json = {
            "data": result
        }
        res.send(json);
    })

});

// edit category
router.delete(PATH_CATEGORY_FOOD_ITEM, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    console.log(req.body)
    let id = req.body.id
    if (!id) {
        let error = createError(520)
        res.send(error);
        return
    }


    let data = menu.catergory.removeCategory(id, function (result) {
        let json = {
            "data": result
        }
        res.send(json);
    })

});

// Get list food item of category
// TODO: - NONE HANDLE
router.get(PATH_FOOD_ITEM_OF_CATEGORY, function(req, res, next) {
    console.log("---------------------", req.url, "----------------------")
    console.log(req.body)
    let id = req.body.id
    if (!id) {
        let error = createError(520)
        res.send(error);
        return
    }

    let data = menu.catergory.getListItemOfCategory(id)
    let result = {
        "data": data
    }
    res.send(result);
});


module.exports = router;

