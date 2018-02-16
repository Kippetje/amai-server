var express = require('express');
var router = express.Router();
var messages = require('../private/messages.json');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(messages);
});

router.get('/read', function(req, res, next) {
    // let user = req.query.user || "all";

    if(room) {
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

module.exports = router;
