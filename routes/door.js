var express = require('express');
var router = express.Router();

router.post('/open', function(req, res, next) {
    res.json({open:true});
});

module.exports = router;
