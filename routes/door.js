var express = require('express');
var router = express.Router();

var doorOpen = false;

router.post('/open', function(req, res, next) {
    doorOpen = true;
    res.json({open:true});
});
router.post('/close', function(req, res, next) {
    doorOpen = false;
    res.json({open:false});
});

router.get('/status', (req, res)=>{
    res.json(doorOpen);
});

module.exports = router;
