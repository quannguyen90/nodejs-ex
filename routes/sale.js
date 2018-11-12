var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    let result = {
        "a": "aaaa",
        "b": 1
    }
    res.send(result);
});
