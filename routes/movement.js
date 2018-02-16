var express = require('express');
var router = express.Router();

var movement = false;

router.get('/on', function (req, res, next) {
    movement = true;
    res.close();
});

router.get('/off', function (req, res, next) {
    movement = false;
    res.close();
});

router.get('/status', function (req, res, next) {
    res.json(movement);
});

module.exports = router;
