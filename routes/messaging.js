var express = require('express');
var router = express.Router();
var messages = require('../private/messages.json');
let audio = require('../common/play-audio');
let logger = require('../common/logger');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(messages);
});


router.post('/', function (req, res, next) {
    logger.info('Received new audio file ');
    res.json({'success':'true','message':'Saved a new audio file'});
});

router.get('/read', function(req, res, next) {
    // let user = req.query.user || "all";
    if(req.query.room) {
        const room = req.query.room;
        let result = [];
        messages.forEach(function (message) {
            if (message.room === room) {
                result.push(message);
            }
        });
        console.log(`Found following messages for room ${room}:`);
        console.log(JSON.stringify(result, null, 4));
    }
    else{ // return all messages if no user
        result = messages;
    }
    res.json(result);
});

router.post('/play', function(req, res, next) {
    let receiverId = req.body.receiverId;
    let beaconId = req.body.beaconId;
    audio.play(receiverId,beaconId);
    console.log();
    let mockResult = {
        "success":"true",
        "messages": [
            {
                "from": "Marijn",
                "message":"We need more milk!"
            },
            {
                "from": "Jeroen",
                "message":"Welcome home!"
            },
        ]
    };
    res.json({});
});


module.exports = router;
