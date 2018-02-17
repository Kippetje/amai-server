var express = require('express');
var router = express.Router();
var audio = require('../common/play-audio');

var movement = false;

router.get('/on', function (req, res, next) {
    movement = true;
    // audio.playFile('../private/sound/hello.wav');
    audio.playFile('../private/sound/imperial_march.wav');
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
