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

router.post('/', function(req, res, next) {

    console.log('POST /');

    console.dir(req.body);
    console.dir(req.headers);

    let result = {
        "a": "aaaa",
        "b": 1
    }
    res.send(result);
});


let succesResponse = {
   data: true
}


module.exports = router;
