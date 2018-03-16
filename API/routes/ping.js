var express = require('express');
var router = express.Router();

/* GET ping page, heartbeat */
router.get('/',function(req,res,next){
    res.status(200).send("pong!");
});

module.exports = router;