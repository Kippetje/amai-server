var express = require('express');
var router = express.Router();


router.post('/open', function(req, res, next) {
    res.json("true");
});

module.exports = router;
