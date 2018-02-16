var express = require('express');
var router = express.Router();

var doorOpen = false;
var doorBell = false;

router.post('/open', function (req, res, next) {
    doorOpen = true;
    setTimeout(function () {
        doorOpen = false;
    }, 15000);
    res.json({open: true});
});

router.post('/close', function (req, res, next) {
    doorOpen = false;
    res.json({open: false});
});

router.get('/status', (req, res) => {
    res.json(doorOpen);
});

router.get('/ring', (req, res) => {
    if (doorBell) {
        doorBell = false;
        res.json(true);
    }
});

router.post('/ring', (req, res) => {
    doorBell = true;
});

module.exports = router;
